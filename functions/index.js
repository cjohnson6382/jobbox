const functions = require('firebase-functions');

const admin = require('firebase-admin')

// admin.initializeApp(functions.config().firebase)

let serviceAccount = require('./jobbox-520defb9417b.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "jobbox-cd46c.appspot.com"
})

const bucket = admin.storage().bucket()
const db = admin.firestore()

exports.upload = functions.https.onRequest((req, res) => {
	let { name } = req.query
	let pdf = req.body

	let file = bucket.file(name)
	return file.save(pdf)
		.then(() => {
			return file.getSignedUrl({ expires: Date.now() + 3 * 1000 * 60 * 60 * 24 * 365 * 20, action: "read" })
				.then(([url]) => {
					return db.collection("pdfs").doc().set({ name, url })
						.then(() => res.send({ status: "success", message: "pdf saved to firestore" }))
						.catch(e => res.send({ status: "error", message: e }))
				})
				.catch(e => res.send({ status: "error", message: e }))
		})
		.catch(e => res.send({ status: "error", message: e }))
})

/*

	import requests
	import pathlib
	
	#	get path
	
	f = pdf.open(mode="rb").read()

	data = { file: f }
	url = pdf.parts[0]
	
	requests.post(url, files=data)

*/



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

