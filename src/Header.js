import React from 'react'

import PropTypes from 'prop-types'

import styles from './styles'

const logo = './logo.png'


const Header = () => (
	<div style={ styles.columnContainer }>
		<img style={ { width: "30%", background: "white" } } alt="Website Logo" src={ logo } />
		<h2 style={ { flex: 1 } } >Welcome to Job Box!</h2>
	</div>
)

// Header.propTypes = {}

export default Header

// export default class Header extends React.Component {
// 	static propTypes = {
// 		auth: PropTypes.object
// 	}

// 	constructor (props) {
// 		super(props)

// 		this.setUser = this.setUser.bind(this)
// 		this.submit = this.submit.bind(this)
// 	}

// 	state = {
// 		currentUser: null
// 	}

// 	componentWillMount () {
// 		let { auth } = this.props
// 		if (auth.currentUser) {
// 			console.log("auth thinks we're authenticated...", auth.currentUser)
// 			this.setState({ user: auth.currentUser })
// 		}
// 		else {
// 			auth.subscribeToInitNotification(this.setUser)
// 		}
// 	}

// 	setUser (user) { this.setState({ user }) }

// 	submit (e) {
// 		e.preventDefault()
// 		console.log("this is the searchbar result: ", e.target)
// 	}
	
// 	render () {
// 		let { user } = this.state

// 					// <img style={ { width: "40%", borderRight: "1px solid grey", background: "white" } } alt="Website Logo" src={ logo } />
// 		return (
// 			<div style={ styles.header } >
// 				<div style={ { display: "flex", width: "15%", alignItems: "center", justifyContent: "center" } } >

// 				</div>
// 				<div style={ { display: "flex", width: "70%" } } >
// 					<span style={ styles.panelInner } >
// 						<form onSubmit={ this.submit } style={ styles.form } >
// 							<input style={ styles.search } type="text" placeholder="Search" />
// 							<input type="submit" style={ { display: "none" } } />
// 						</form>
// 					</span>
// 				</div>
// 				<div style={ { display: "flex", width: "15%" } } >
// 					<span style={ styles.panelInner } >
// 						{ user ? <UserInfo user={ user } /> : <div>No User Yet</div> }
// 					</span>
// 				</div>
// 			</div>
// 		)
// 	}
// }