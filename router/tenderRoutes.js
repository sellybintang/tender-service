const {
  hubungiAgen,
  daftarSemuaTender,
  daftarAgenTender,
  agenda,
  auctionIsTimeup,
  getAuctionFromId,
  DeleteHubungiAgenId,
  tenderChoice,
  pilihAgenTender,
  aturJadwalSurvei,
  hubungiAgenDenganQR,
  checkUserHAsAuction,
  daftarTender,
  getAuctionFromCollectionByIdFollower,
  tenderAgenTersedia,
} = require("../controller/hubungiAgenController");
const { isUser } = require("../middleware/permissionUser");

const router = require("express").Router();

// Membuat
// membuat tender dengan limit wakti 24 jam, statusnya pending
router.post("/hubungiAgen", isUser, hubungiAgen);
router.delete("/DeleteHubungiAgenId/:id", DeleteHubungiAgenId);

router.post("/tenderChoice/", isUser, tenderChoice);

// memilih agen sebagai agen tender
router.post("/pilihAgenTender", isUser, pilihAgenTender);

// mengubah jadwal ketemuan
router.post("/aturJadwalSurvei", isUser, aturJadwalSurvei);

// tender bypass langsung ada agen yang terpilih
router.post("/hubungiAgenDenganQR", isUser, hubungiAgenDenganQR);

// Tampilan
// tampilkan semua tender
router.get("/daftarSemuaTender", isUser, daftarSemuaTender);

// tampilkan daftar tender yang tersedia yang statusnya pending
router.get("/daftarAgenTender", isUser, daftarAgenTender);

// tender berdasarkan tender yang dia buat sebelumnya
router.get("/daftarTender", isUser, daftarTender);

// tampilkan tender dengan urut berdasarkan waktu pembuatan tender
router.get("/agenda", isUser, agenda);

// cek user tersebut pernah tender di properti yang sama atau tidak dalam
// kurun waktu 24 jam
router.get("/checkUserHasAuction", isUser, checkUserHAsAuction);

// tampilkan tender yang sudah kadaluwarsa
router.get("/auctionIsTimeup", isUser, auctionIsTimeup);

// ambil tender dari daftar id follower yang diikuti
router.get(
  "/getAuctionFromCollectionByIdFollower",
  isUser,
  getAuctionFromCollectionByIdFollower
);

// ambil tender dari _id
router.get("/getAuctionFromId/:id", isUser, getAuctionFromId);

// ambil tender yang masih pending/tersedia
router.get("/tenderAgenTersedia", isUser, tenderAgenTersedia);

module.exports = router;
