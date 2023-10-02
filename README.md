# Service Tender Intern

## - `Models`

```javascript
Schema({
  // uid user sebagai agen
  agen_id: String,
  // nama user sebagai agen
  agen_name: String,
  // id properti
  property_id: String,
  // nama properti
  property_name: String,
  // alamat properti
  property_address: String,
  confirmation_purchase: {
    type: Boolean,
    default: false,
  },
  has_schedule: {
    type: Boolean,
    default: false,
  },
  is_show: {
    type: Boolean,
    default: true,
  },
  // id kavling yang dipilih
  kavling_id: String,
  // uid pembuatan tender
  created_by: String,
  // alasan membatalan tender
  reason_cancel: String,
  // program referral
  referral: String,
  // qr code yang digunakan untuk tender
  qr_code: String,
  // tipe survey yang dilakukan user
  type_survey: {
    type: String,
    enum: ["percakapan", "penawaran", "chat", "survey", "co_in", "co_ex"],
    default: "percakapan",
  },
  // ini berisi user sebagai agen yang join tender
  participants_follow: Array,
  // ini berisi user sebagai agen yang menolak tender
  participants_reject: Array,
  // status tender
  status: {
    type: String,
    enum: [
      "pending",
      "agen",
      "survey",
      "kavling",
      "transaksi",
      "selesai",
      "expired",
    ],
    default: "pending",
  },
  meet_up_at: Number,
  created_at: Number,
  expired_at: Number,
});
```

## - `Functions`

```javascript
// tampilkan semua tender
router.get("/daftarSemuaTender");
// membuat tender dengan limit wakti 24 jam, statusnya pending
router.post("/hubungiAgen", tendersCtl.hubungiAgen);
// tender bypass langsung ada agen yang terpilih
router.post("/hubungiAgenDenganQR", tendersCtl.hubungiAgenDenganQR);
// tampilkan daftar tender yang tersedia yang statusnya pending yang follow
router.get("/daftarAgenTender", tendersCtl.daftarAgenTender);
// memilih agen sebagai agen tender
router.post("/pilihAgenTender", tendersCtl.pilihAgenTender);
// mengubah jadwal ketemuan
router.post("/aturJadwalSurvei", tendersCtl.aturJadwalSurvei);
// tender berdasarkan tender yang dia buat sebelumnya
router.get("/daftarTender", tendersCtl.daftarTender);
// tampilkan tender dengan urut berdasarkan waktu pembuatan tender
router.get("/agenda", tendersCtl.agenda);
// cek user tersebut pernah tender di properti yang sama atau tidak dalam
// kurun waktu 24 jam
router.get("/checkUserHasAuction", tendersCtl.checkUserHasAuction);
// tampilkan tender yang sudah kadaluwarsa
router.get("/auctionIsTimeup", tendersCtl.auctionIsTimeup);
// ambil tender dari daftar id follower yang diikuti
router.get("/getAuctionFromCollectionByIdFollower");
// ambil tender dari _id
router.get("/getAuctionFromId/:id", tendersCtl.getAuctionFromId);
// ambil tender yang masih pending/tersedia
router.get("/tenderAgenTersedia", tendersCtl.tenderAgenTersedia);
```

buat fitur baru memasukkan follow atau reject

route kavling sama pembayaran,
