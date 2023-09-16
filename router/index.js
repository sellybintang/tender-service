const router = require("express").Router();
const tenderRoutes = require("./tenderRoutes");
const authRoutes = require("./authRoutes");

router.use("/", tenderRoutes);
router.use("/", authRoutes);

module.exports = router;
