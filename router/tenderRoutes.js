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
  DeleteHubungiAgenIdPermanent,
  daftarSemuaTenderByAdmin,
  buatKavling,
  confirmationPurchase,
} = require("../controller/hubungiAgenController");
const {
  permission,
  isAgen,
  isUser,
  isAdmin,
  isUser_Agen,
} = require("../middleware/permissionUser");

const router = require("express").Router();

// Membuat
// membuat tender dengan limit wakti 24 jam, statusnya pending
router.post("/hubungiAgen", permission, isUser_Agen, hubungiAgen);
router.delete(
  "/DeleteHubungiAgenId/:id",
  permission,
  isUser_Agen,
  DeleteHubungiAgenId
);
router.delete(
  "/DeleteHubungiAgenIdPermanen/:id",
  permission,
  isAdmin,
  DeleteHubungiAgenIdPermanent
);
router.post("/tenderChoice/", permission, isAgen, tenderChoice);

// memilih agen sebagai agen tender
router.post("/pilihAgenTender", permission, pilihAgenTender);

// mengubah jadwal ketemuan
router.post("/aturJadwalSurvei", permission, isUser, aturJadwalSurvei);

// tender bypass langsung ada agen yang terpilih
router.post("/hubungiAgenDenganQR", permission, hubungiAgenDenganQR);

// updateKavling
router.post("/buatKavling/:id", permission, isUser_Agen, buatKavling);

// updateConfirmationPurchase
router.post(
  "/confirmationPurchase/:id",
  permission,
  isAdmin,
  confirmationPurchase
);

// Tampilan
// tampilkan semua tender
router.get("/daftarSemuaTender", permission, daftarSemuaTender);
router.get(
  "/daftarSemuaTenderByAdmin",
  permission,
  isAdmin,
  daftarSemuaTenderByAdmin
);
// tampilkan daftar tender yang tersedia yang statusnya pending
router.get("/daftarAgenTender", permission, daftarAgenTender);

// tender berdasarkan tender yang dia buat sebelumnya
router.get("/daftarTender", permission, daftarTender);

// tampilkan tender dengan urut berdasarkan waktu pembuatan tender
router.get("/agenda", permission, agenda);

// cek user tersebut pernah tender di properti yang sama atau tidak dalam
// kurun waktu 24 jam
router.get("/checkUserHasAuction", permission, checkUserHAsAuction);

// tampilkan tender yang sudah kadaluwarsa
router.get("/auctionIsTimeup", permission, auctionIsTimeup);

// ambil tender dari daftar id follower yang diikuti
router.get(
  "/getAuctionFromCollectionByIdFollower",
  permission,
  getAuctionFromCollectionByIdFollower
);

// ambil tender dari _id
router.get("/getAuctionFromId/:id", permission, getAuctionFromId);

// ambil tender yang masih pending/tersedia
router.get("/tenderAgenTersedia", permission, tenderAgenTersedia);

module.exports = router;
