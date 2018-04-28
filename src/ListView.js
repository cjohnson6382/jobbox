import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Glyphicon } from 'react-bootstrap'

import styles from './styles'

// import Searchbar from './Searchbar'
// <Searchbar resourceProperties={ resourceProperties } />

const localStyles = {
	glyph: {
		padding: "0 0.3em 0 0",
		margin: 0
	},
	listContainer: {
		display: "flex",
		flexDirection: "column"
	},
	listItem: {
		display: "flex",
		flexDirection: "row"
	},
	header: {
		display: "flex",
		flexDirection: "row",
		background: "rgba(240, 240, 240, 1)",
		border: "1px solid rgba(212, 212, 212, 1)",
		fontWeight: "bold",
		padding: "0.5em"
	},
	headerLabel: {
		flex: 1
	},
	name: {
		display: "flex",
		flexDirection: "row"
	},
	actions: {
		display: "flex",
		flexDirection: "row"
	},
	del: {
		background: "rgba(224, 224, 224, 1)"
	},
	root: {
		display: "flex",
		flexDirection: "column",
		padding: "0 3em 0 3em"
	}
}

const BriefPdf = ({ pdf, select, del }) => (
	<div style={ localStyles.listItem } >
		<div style={ localStyles.name } >
			<Glyphicon glyph="file" style={ localStyles.glyph } />
			{ pdf.name }
		</div>
		<div style={ localStyles.actions } >
			<div style={ styles.button } onClick={ () => select(pdf) } >Open</div>
			<div style={ { ...styles.button, ...localStyles.del } } onClick={ () => del(pdf.id) } >
				Delete
				<Glyphicon glyph="remove" style={ { padding: "0 0 0 0.3em" } } />
			</div>
		</div>
	</div>
)

const Header = () => (
	<div style={ localStyles.header } >
		<div style={ localStyles.headerLabel } >Name</div>
		<div style={ localStyles.headerLabel } >Actions</div>
	</div>
)

const ListView = ({ select, pdfs, del }) => (
	<div style={ localStyles.root } >
		<Header />
		<div style={ localStyles.listContainer } >
			{ pdfs.map(pdf => {
				<BriefPdf { ...{ select, pdfs, del } } />
			}) }
		</div>
	</div>
)

export default ListView