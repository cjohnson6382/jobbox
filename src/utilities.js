import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export { firebase }


// export const curry = (f, p) => p.reduce((g, h) => g(h), f)
// export const compose = (...fs) => fs.reduce((f, g) => (...args) => f(g(...args)))

