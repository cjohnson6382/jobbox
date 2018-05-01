import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

// how to use this library:
//	http://mozilla.github.io/pdf.js/examples/index.html#interactive-examples
import pdfjsLib from 'pdfjs-dist'

import { Glyphicon } from 'react-bootstrap'

import styles from './styles'

const localStyles = {
	pager: {
		backgroundColor: "rgba(91, 189, 114, 1)",
		boxShadow: "inset 0 0 0 0 rgba(39,41,43,.15)",
		borderRadius: "0.3em",
		fontWeight: "bold",
		cursor: "pointer",
		color: "black",
		background: "rgba(224, 224, 224, 1)",
		margin: "0.5em",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: "2.5em",
		width: "6em",
		justifyContent: "center",
		alignItems: "stretch"
	},
	pagerArrow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: 2,
		margin: 0,
		background: "rgba(214, 214, 214, 1)",
		borderRadius: "0.3em"
	},
	pagerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	pagerLabel: {
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		flex: 5
	},
	done: {
		...styles.button,
		...{
			background: "rgba(224, 224, 224, 1)",
			margin: "0 0 0 1em"
		}
	}
}

export default class DetailedView extends React.Component {
	static propTypes = {
		selected: PropTypes.object,
		done: PropTypes.func
	}
	
	constructor (props) {
		super(props)
		
		this.changePage = this.changePage.bind(this)
		this.renderPage = this.renderPage.bind(this)

		this.canvas = React.createRef()
		this.wrapper = React.createRef()
	}
	
	state = {
		pp: 1,
		total: null,
		rendering: false
	}
	
	async componentWillMount () {
		this.setState({ rendering: true })
		const pdf = await pdfjsLib.getDocument(this.props.selected.url)
		const page = await pdf.getPage(1)
		const total = pdf.numPages
		
		this.setState({ pdf, page, total })
		
		this.renderPage()
	}
	
	async changePage (pageNum) {
		let { pdf, pp, total, rendering } = this.state
		if (!rendering && pageNum <= total && pp !== pageNum) {
			const page = await pdf.getPage(pageNum)
			this.setState({ page, pp: pageNum })
			this.renderPage()
		}
		else {
			console.log(`rendering: ${rendering} pageNum: ${pageNum} total: ${total} pp: ${pp}`)
		}
	}

	async renderPage () {
		let { page, pp, total } = this.state
		await this.setState({ rendering: true })

		if (page) {
			let viewport = page.getViewport(1)
			
			this.canvas.current.width = viewport.width
			this.canvas.current.height = viewport.height
			
			let canvasContext = this.canvas.current.getContext('2d')
			
			const renderContext = { canvasContext, viewport }
			
			page.render(renderContext)
			this.setState({ rendering: false })
		}
	}
	
	render () {
		let { selected } = this.props
		let { pp, total, rendering } = this.state
		
		return (
			<div style={ { display: "flex", flex: 1, flexDirection: "column", width: "100%", height: "100%" } } >
				<div style={ localStyles.pagerContainer } >
					<div style={ localStyles.pager } onClick={ () => this.changePage(--pp) } >
						<div style={ localStyles.pagerArrow } ><Glyphicon glyph="chevron-left" /></div>
						<div style={ localStyles.pagerLabel } >Prev</div>
					</div>
					<div style={ localStyles.pager } onClick={ () => this.changePage(++pp) } >
						<div style={ localStyles.pagerLabel } >Next</div>
						<div style={ localStyles.pagerArrow } ><Glyphicon glyph="chevron-right" style={ localStyles.pagerArrow } /></div>
					</div>
					<div>Page { pp } of { total }</div>
					<div style={ localStyles.done } onClick={ this.props.done } >Done</div>
				</div>
				{ rendering && <div style={ { fontWeight: "bold", fontSize: "250%", padding: "1em" } } >Loading...</div> }
				<a href={ selected.url } >
					<canvas ref={ this.canvas } style={ { width: "100%" } } ></canvas>
				</a>
			</div>
		)
	}
}