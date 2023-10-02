const jwt = require("jsonwebtoken");
const firebase = require("../db/firebase_admin");

const permission = async (req, res, next) => {
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
      role: usersCollection.data().role,
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

const isUser = (req, res, next) => {
  try {
    if (req.user.role === 1) {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "is not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isAgen = (req, res, next) => {
  try {
    if (req.user.role === 2) {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "have to agen role",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === 3) {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "only be accessed by admin ",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isUser_Agen = (req, res, next) => {
  try {
    if (req.user.role === 1 || req.user.role === 2) {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "only be accessed by user and agen",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};
module.exports = {
  permission,
  isUser,
  isAgen,
  isAdmin,
  isUser_Agen,
};
