import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { firebase } from './utilities'

import styles from './styles'

import Auth from './Auth'

import Login from './Login'
import PdfView from './PdfView'

const auth = new Auth()

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div style={ styles.app } >
					<Route exact path="/login" render={ routeProps => <Login auth={ auth } { ...routeProps } /> } />
					<Route exact path="/" render={ routeProps => <PdfView auth={ auth } { ...routeProps } /> } />
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
