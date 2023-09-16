// Firebase Admin
const admin = require("firebase-admin");
const firebaseConf = require("../firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConf),
  storageBucket: "gs://causal-calculus-371108.appspot.com",
});

const getAuth = admin.auth();
const db = admin.firestore();
// const storage = admin.storage();
// const bucket = storage.bucket();

module.exports = { db, getAuth };
