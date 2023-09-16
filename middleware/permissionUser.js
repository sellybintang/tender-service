const jwt = require("jsonwebtoken");
const firebase = require("../db/firebase_admin");

const isUser = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthotized",
      });
    }
    const token = await bearer.split("Bearer ")[1];

    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenPayload.exp && tokenPayload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({
        status: "Error",
        message: "Token Expired, please login again",
      });
    }

    const user = await firebase.getAuth.getUser(tokenPayload.uid);

    const usersCollection = await firebase.db
      .collection("Users")
      .doc(tokenPayload.uid)
      .get();
    const newData = {
      uid: user.uid,
      email: user.email,
      nama: usersCollection.data().nama,
      address: usersCollection.data().address,
      no_telp: usersCollection.data().no_telp,
    };

    req.user = newData;

    next();
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = {
  isUser,
};
