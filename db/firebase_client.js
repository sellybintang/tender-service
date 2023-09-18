const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const firebaseConfig = require("../firebaseConfigClient");

const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
const auth = getAuth(app);

module.exports = {
  auth,
};
