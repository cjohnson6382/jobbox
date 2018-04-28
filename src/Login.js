import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles'

const googleSignInBadge = './google.png'

const localStyles = {
	button: {
		textDecoration: "none",
		fontWeight: "bold",
		fontSize: "125%",
		marginTop: "0.3em",
		padding: "0.2em",
		width: "50%",
		color: "white",
		backgroundColor: "cornflowerblue"
	},
	textInput: {
		padding: "0.3em",
		borderRadius: "0.2em",
		boxShadow: "none",
		border: "1px solid rgba(39, 41, 43, 0.15)",
		backgroundColor: "rgba(250, 255, 189, 1)"
	},
	label: {
		fontSize: "105%",
		paddingRight: "0.4em"
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		position: "absolute",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "85%",
		height: "40%"
	},
	modal: {
		padding: "1em",
		width: "50%",
		margin: "1em",
		border: "0.1em solid darkgrey",
		boxShadow: "0.1em 0.1em 0.1em 0.1em darkgrey",
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	link: {
		textDecoration: "none",
		color: "cornflowerblue",
		cursor: "pointer"
	},
	display: bool => ({ display: bool ? "flex" : "none" })
}

export default class Login extends React.Component {
	static propTypes = { auth: PropTypes.object }

	constructor (props) {
		super(props)

		this.unPwSubmit = this.unPwSubmit.bind(this)
		this.register = this.register.bind(this)
	}

	state = { show: false }

	unPwSubmit (e) {
		e.preventDefault()
		let { email, password } = e.target
		// console.log(username.value, password.value)
		this.props.auth.usernamePasswordLogin(email.value, password.value)
	}

	register (e) {
		this.setState({ show: true })
	}

	submitRegister (e) {
		e.preventDefault()
		let { email, password } = e.target
		this.props.auth.register(email.value, password.value)
		this.setState({ show: false })
		this.props.history.push("/register")
	}

	render () {
		return (
			<div style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" } } >
				<h3>Please Login</h3>
				<form style={ { padding: "0.3em", display: "flex", flexDirection: "column", alignItems: "center" } } onSubmit={ e => this.unPwSubmit(e) } >
					<div style={ { display: "flex", flexDirection: "row", alignItems: "center" } } >
						<div style={ { padding: "0 1em 0 0" } } >
							<div style={ localStyles.label } >Email</div>
							<input style={ localStyles.textInput } name="email" type="text" />
						</div>
						<div
							><div style={ localStyles.label } >Password</div>
							<input style={ localStyles.textInput } name="password" type="text" />
						</div>
					</div>
					<div style={ { padding: "1em 0 0 0" } } ><button style={ styles.button } >Log in</button></div>
				</form>
				<div style={ { padding: "0.3em 0 1em 0" } } >
					<span style={ { padding: "0 0.2em 0.2em 0" } } >Don't have an account?</span>
					<span style={ localStyles.link } onClick={ this.register } >
						Register
					</span>
				</div>
				<div onClick={ this.props.auth.googleLogin } ><img alt="Google Login" src={ googleSignInBadge } /></div>
				<div style={ { ...localStyles.overlay, ...localStyles.display(this.state.show) } } >
					<div style={ localStyles.modal } >
						<div>
							<div><span style={ localStyles.label } >Username:</span><input name="email" type="text" /></div>
							<div><span style={ localStyles.label } >Password:</span><input name="password" type="text" /></div>
						</div>
						<div style={ localStyles.button } onClick={ this.submitRegister } >Register</div>
						<div style={ localStyles.button } onClick={ e => this.setState({ show: false }) } >Cancel</div>
					</div>
				</div>
			</div>
		)
	}
}