const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.helloWorld = functions
    .region("asia-east2")
    .https.onCall((payload, context) => {
      return {data: "Hello from Firebase"};
    });
