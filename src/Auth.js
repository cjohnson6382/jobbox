import createHistory from 'history/createBrowserHistory'

import { firebase } from './utilities'

const history = createHistory({ forceRefresh: true })

export default class Auth {
	constructor () {
		this.googleLogin = this.googleLogin.bind(this)
		this.usernamePasswordLogin = this.usernamePasswordLogin.bind(this)
		this.logout = this.logout.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)

		firebase.auth().onAuthStateChanged(user => {
			this.notificationList.map(f => f(user))
			this.currentUser = user
		})
	}

	currentUser = firebase.auth().currentUser
	notificationList = []

	async register (email, password) {
		try {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			history.replace('/')
		}
		catch (e) { console.log(e.code, e.message) }
		
	}

	async usernamePasswordLogin (email, password) {
		try {
			let r = await firebase.auth().signInWithEmailAndPassword(email, password)
			console.log(r)
			history.replace("/")
		}
		catch (e) { console.log(e.code, e.message) }
	}

	async googleLogin () {
		let provider = new firebase.auth.GoogleAuthProvider()
		provider.addScope("https://www.googleapis.com/auth/firebase")
		provider.addScope("profile")

		try {
			let r = await firebase.auth().signInWithPopup(provider)
			console.log(r)

			history.replace('/')
		}
		catch (e) {
			console.log("error signing in", e)
		}
	}

	isAuthenticated () {
		let status = localStorage.getItem("solarfit_logged_in")
		return status === 'true'
	}

	subscribeToInitNotification (f) { this.notificationList.push(f) }

	logout () {
		firebase.auth().signOut()
		history.replace('/login')
	}
	
}


