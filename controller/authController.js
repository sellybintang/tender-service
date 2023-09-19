// Import register
const { signInWithEmailAndPassword } = require("firebase/auth");
const firebase = require("../db/firebase_admin");
const { auth } = require("../db/firebase_client");
// import login
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { email, password, nama, address, no_telp } = req.body;

    const userCredential = await firebase.getAuth.createUser({
      email,
      password,
    });

    const user = userCredential.uid;
    console.log(user.uid);
    const usersCollection = await firebase.db.collection("Users").doc(user);

    await usersCollection.set({
      nama,
      address,
      no_telp,
    });

    console.log(usersCollection);
    res.status(200).json({
      status: "Succes",
      message: "Succesfully to register",
      data: {
        email,
        password,
        nama,
        address,
        no_telp,
        userCredential,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // const isPassword = await firebase.getAuth.getUser(password);
    // const userCredential = await firebase.getAuth.getUserByEmail(email);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // console.log(password)y
    if (!userCredential) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "User not found",
      });
    }

    if (userCredential.password) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid Password",
      });
    }
    const tokenPayload = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
    console.log(userCredential.user.uid);
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    // const user =  userCredential.user
    res.status(200).json({
      status: "Succes",
      message: "Succesfully to login",
      data: {
        data: userCredential.uid,
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "Failed",
        message: "Unauthorized",
      });
    }
    idToken = authHeader.split(" ")[1];
    await new Set().add(idToken);

    // const decodedToken = await admin.auth().signOut(getAuth);

    res.status(200).json({
      status: "Succes",
      message: "Succesfully to logout",
      idToken,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Firebase Client
// exports.register = async(req, res)=>{
//     try{
//         const {email, password, nama, address, no_telp} = req.body

//         const userCredential = await createUserWithEmailAndPassword(getAuth, email, password);

//         const user = userCredential.user;
//         console.log(user.uid)
//         const usersCollection =doc(db,'Users', user.uid)

//         await setDoc(usersCollection,{
//             nama,
//             address,
//             no_telp,
//         });
//         console.log(usersCollection)
//         res.status(200).json({
//             status:'Succes',
//             message:'Succesfully to register',
//             data:{
//                 email,
//                 password,
//                 nama,
//                 address,
//                 no_telp,
//                 userCredential

//             }
//         })

//     }catch(err){
//         res.status(500).json({
//             status:'Error',
//             message: err.message
//         })
//     }
// }
