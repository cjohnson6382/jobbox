import React from 'react'
import PropTypes from 'prop-types'

import { Glyphicon } from 'react-bootstrap'


import { db } from './utilities'

import styles from './styles'

import ListView from './ListView'

const localStyles = {
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	title: {
		padding: "3em",
		display: "flex",
		flexDirection: "row",
	},
	titleButtons: {
		alignItems: "center",
		justifyContent: "space-around",
		display: "flex",
		flexDrection: "row",
		flex: 2
	},
	titleText: {
		display: "flex",
		justifyContent: "center",
		flex: 7
	},
	upload: {
		background: "rgba(91, 189, 114, 1)",
		color: "white"
	},
	logout: {
		background: "rgba(224, 123, 83, 1)",
		color: "white"
	},
	glyph: {
		padding: "0 0.3em 0 0",
		margin: 0
	}
}


export default class PdfView extends React.Component {
	static propTypes = {
		auth: PropTypes.object
	}

	constructor (props) {
		super(props)

		this.getPdfs = this.getPdfs.bind(this)
		this.del = this.del.bind(this),
		this.select = this.select.bind(this)
	}

	state = { pdfs: {}, loading: true }

	componentWillMount () {
		db.collection("pdfs").onSnapshot(this.getPdfs)
	}

	async getPdfs (snapshot) {
		
		console.log("getPdfs: ", snapshot)
		this.setState({ loading: true })
		const pdfs = {}

		snapshot.forEach(pdf => pdfs[pdf.id] = Object.assign({}, pdf.data(), { id: pdf.id }))

		this.setState({ pdfs, loading: false })
	}

	async del (id) {
		let { pdfs } = this.state

		try {
			await db.collection("pdfs").doc(id).delete()
			console.log(`successfully deleted ${id}`)

			delete pdfs[id]
			this.setState({ pdfs })
		}
		catch (e) {
			console.log(`failed to delete ${id}`)
		}

	}
	
	select (pdf) {
		this.setState({ selected: pdf })
		// console.log("selected a PDF: ", pdf)
	}
	
	done () { this.setState({ selected: null }) }

	render () {
		let { del, select } = this
		let { pdfs, selected } = this.state
		let { auth } = this.props

		pdfs = Object.values(pdfs)
		
		return (
			<div style={ localStyles.root } >
				<div style={ localStyles.title } >
					<h3 style={ localStyles.titleText } >Saved PDFS</h3>
					<div style={ localStyles.titleButtons } >
						<div style={ { ...styles.button, ...localStyles.upload } } >
							<Glyphicon style={ localStyles.glyph } glyph="cloud-upload" />
							Upload a PDF
						</div>
						<div onClick={ auth.logout } style={ { ...styles.button, ...localStyles.logout } } >
							<Glyphicon style={ localStyles.glyph } glyph="log-out" />
							Logout
						</div>
					</div>
				</div>
				<ListView { ...{ select, pdfs, del } } />
				{/* <DetailView { ...{ selected, done } } /> */}
			</div>
		)
	}
}