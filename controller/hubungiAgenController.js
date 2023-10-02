const Tender = require("../models/tenderSchema");
const randomstring = require("randomstring");
// BUAT TENDER
const hubungiAgen = async (req, res) => {
  try {
    const expired_at = Date.now() + 60 * 60 * 1000;
    console.log(expired_at);
    const created_at = Date.now();
    console.log(created_at);
    const { uid } = req.user;
    const hubungi = await Tender.create({
      created_by: uid,
      created_at: created_at,
      expired_at: expired_at,
      agen_id: null,
      agen_name: null,
      meet_up_at: null,
      qr_code: null,
      kavling_id: null,
      property_id: null,
      property_name: null,
      property_address: null,
      participants_follow: [],
      participants_reject: [],
    });

    res.status(200).json({
      message: "Hubungi Agen Berhasil",
      hubungi,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubungi Agen Gagal",
      message: error,
    });
  }
};

const DeleteHubungiAgenId = async (req, res) => {
  try {
    const { id } = req.params;
    // const { uid } = req.user;
    const hubungi = await Tender.findByIdAndUpdate(id, { is_show: true });
    const { uid } = req.user;

    if (hubungi.created_by !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }

    res.status(200).json({
      message: "Delete Hubungi Agen Berhasil",
      hubungi,
    });
  } catch (err) {
    res.status(500).json({
      message: "Hubungi Agen Gagal",
      message: err.message,
    });
  }
};

const DeleteHubungiAgenIdPermanent = async (req, res) => {
  try {
    const { id } = req.params;
    // const { uid } = req.user;
    const hubungi = await Tender.findByIdAndDelete({ _id: id });
    const { uid } = req.user;

    if (hubungi.created_by !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }

    res.status(200).json({
      message: "Delete Hubungi Agen Berhasil",
      hubungi,
    });
  } catch (err) {
    res.status(500).json({
      message: "Hubungi Agen Gagal",
      message: err.message,
    });
  }
};

// Kurang validasi follor or reject
// BUAT TENDER FOLLOW OR REJECT

const tenderChoice = async (req, res) => {
  try {
    const { id } = req.body;
    const { uid } = req.user;
    const select = await Tender.findById(id);

    if (select.created_by !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    let updateFields = { ...select._doc }; // Salin data dari dokumen Tender
    if (!select) {
      return res.status(404).json({
        status: "Failed",
        message: "Id Tender tidak ditemukan.",
      });
    }

    if (req.body.participants_follow) {
      // Tambahkan UID ke participants_follow jika ada permintaan
      updateFields.participants_follow = [uid];
      // Hapus UID dari participants_reject
      updateFields.participants_reject = [];
    } else if (req.body.participants_reject) {
      // Tambahkan UID ke participants_reject jika ada permintaan
      updateFields.participants_reject = [uid];
      // Hapus UID dari participants_follow
      updateFields.participants_follow = [];
    }
    // Perbarui dokumen Tender dengan data yang diperbarui
    const updateTender = await Tender.findByIdAndUpdate(id, updateFields, {
      new: true, // Mengembalikan dokumen yang telah diperbarui
    });

    if (updateTender) {
      res.status(200).json({
        status: "200",
        message: "Tender Berhasil",
        updateTender,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "500",
      message: err.message,
    });
  }
};

// PILIH AGEN DARI PEMBELI AGEN
const pilihAgenTender = async (req, res) => {
  try {
    const {
      agen_name,
      id,
      agen_id,
      property_id,
      property_name,
      property_address,
    } = req.body;
    const { uid } = req.user;

    const tender = await Tender.findById(id);
    console.log(tender.created_by);
    if (tender.created_by !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    if (!tender) {
      return res.status(404).json({
        status: "404",
        message: "Id Tender tidak ditemukan",
      });
    }

    if (!tender.participants_follow.includes(agen_id)) {
      return res.status(404).json({
        status: "tidak ada agen yang terpilih",
      });
    }

    const pilihAgen = await Tender.findByIdAndUpdate(id, {
      status: "agen",
      agen_id: agen_id,
      agen_name: agen_name,
      property_id: property_id,
      property_name: property_name,
      property_address: property_address,
    });

    return res.status(200).json({
      message: "Pilih Agen Tender Berhasil ditambahakan",
      pilihAgen,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error,
    });
  }
};

// JADWAL PERTEMUAN PENJUAL TERHADAP PEMBELI
const aturJadwalSurvei = async (req, res) => {
  try {
    const { id, has_schedule, meet_up_at } = req.body;
    const { uid } = req.user;
    const idTender = await Tender.findById(id);

    if (!idTender) {
      return res.status(404).json({
        status: "Not Found",
        message: "Not Found Id Tender",
      });
    }

    if (!idTender.created_by == uid) {
      return res.status(404).json({
        status: "Not Found",
        message: "Not Found Id User",
      });
    }

    const aturJadwalPembeli = await Tender.findByIdAndUpdate(id, {
      status: "survey",
      meet_up_at: meet_up_at,
      has_schedule: true,
    });

    res.status(200).json({
      status: "200",
      message: "Berhasil mengatur jadwal",
      aturJadwalPembeli,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const buatKavling = async (req, res) => {
  try {
    const id = req.params.id;
    // let kavlingID = randomstring.generate({
    //   length: 12,
    //   charset: "alphabetic",
    // });
    const { kavling_id } = req.body;

    const Semuakavling = await Tender.findOne({
      kavling_id: kavling_id,
    });
    console.log(Semuakavling);

    if (Semuakavling !== null) {
      return res.status(401).json({
        status: "401",
        message: "Kavling not available",
      });
    }
    const kavling = await Tender.findByIdAndUpdate(id, {
      status: "kavling",
      type_survey: "survey",
      kavling_id: kavling_id,
    });

    res.status(200).json({
      status: 200,
      message: "Berhasil mengatur jadwal",
      kavling,
    });
  } catch (error) {
    res.status(500).json({
      status: "Atur kavling gagal",
      message: error.message,
    });
  }
};

const confirmationPurchase = async (req, res) => {
  try {
    const id = req.params.id;
    const confirmation_purchase = await Tender.updateOne(
      { _id: id },
      { confirmation_purchase: true }
    );
    res.status(200).json({
      status: 200,
      message: "Berhasil mengatur jadwal",
      confirmation_purchase,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// HUBUNGI AGEN DENGAN CODE QR
const hubungiAgenDenganQR = async (req, res) => {
  try {
    const {
      agen_id,
      agen_name,
      property_id,
      property_name,
      property_address,
      meet_up_at,
      qr_code,
      confirmation_purchase,
    } = req.body;

    const created_at = Date.now();
    const { uid, nama } = req.user;
    console.log(nama);
    console.log(uid);
    const hubungi = await Tender.create({
      created_by: uid,
      created_at: created_at,
      expired_at: null,
      agen_id: agen_id,
      agen_name: nama,
      meet_up_at: meet_up_at,
      reason_cancel: null,
      referral: null,
      qr_code: qr_code,
      kavling_id: null,
      property_id: property_id,
      property_name: property_name,
      property_address: property_address,
      type_survey: "chat",
      status: "agen",
      confirmation_purchase: confirmation_purchase,
      participants_follow: [],
      participants_reject: [],
    });

    res.status(200).json({
      status: "200",
      message: "success add new Tender with QR",
      hubungi,
    });
  } catch (error) {
    res.status(500).json({
      status: "Hubungi Agen dengan QR gagal",
      message: error.message,
    });
  }
};

// bisa
const daftarSemuaTender = async (req, res) => {
  try {
    const daftarSemua = await Tender.find({ is_show: false });
    res.status(200).json({
      status: "Succes",
      message: "Succes show all tender",
      daftarSemua,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

const daftarSemuaTenderByAdmin = async (req, res) => {
  try {
    const daftarSemua = await Tender.find();
    res.status(200).json({
      status: "Succes",
      message: "Succes show all tender",
      daftarSemua,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

// bisa
const daftarAgenTender = async (req, res) => {
  try {
    const { uid } = req.user;

    const daftarAgen = await Tender.find({
      status: "pending",
      participants_follow: uid,
      is_show: false,
    });

    res.status(200).json({
      status: "Succes",
      message: "Daftar Agen Tender",
      daftarAgen,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

// tender berdasarkan tender yang dia buat sebelumnya

const daftarTender = async (req, res) => {
  try {
    const { uid } = req.user;
    const daftarTender = await Tender.find({ created_by: uid, is_show: false });
    res.status(200).json({
      status: "Succes",
      message: "Daftar Tender",
      daftarTender,
    });
  } catch {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

// bisa
const agenda = async (req, res) => {
  try {
    const waktuAgenda = await Tender.find({ is_show: false })
      .sort({
        createdAd: -1,
      })
      .limit(5);

    const agenda = waktuAgenda.reverse();
    res.status(200).json({
      status: "Succes",
      message: "daftar urut agenda",
      agenda,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "gagal menampilkan daftar urut agenda",
    });
  }
};

// cek user di properti yang sama atau tidak dalam kurun 24 jam
const checkUserHAsAuction = async (req, res) => {
  try {
    const property = req.query.property;

    if (!property) {
      return res.status(400).json({
        status: "failed",
        message: "property is required",
      });
    }
    const cekUserPropertiGanda = await Tender.find({
      created_at: Date.now() - 24 * 60 * 60 * 1000,
      property_id: property,
      is_show: false,
    });
    res.status(200).json({
      status: "Succes",
      message: "cek user properti ganda",
      cekUserPropertiGanda,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// bisa
const auctionIsTimeup = async (req, res) => {
  try {
    const auctionIsTimeup = await Tender.find({
      status: "expired",
      is_show: false,
    });

    res.status(200).json({
      status: "Succes",
      message: "list Auction is Time Up",
      auctionIsTimeup,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

// // ambil tender dari daftar id follower yang diikuti
// router.get("/getAuctionFromCollectionByIdFollower");

const getAuctionFromCollectionByIdFollower = async (req, res) => {
  try {
    const { uid } = req.user;
    const getFromCollectionByIdFollower = await Tender.find({
      participants_follow: uid,
      is_show: false,
    });
    res.status(200).json({
      status: "Succes",
      message: "get auction from id",
      getFromCollectionByIdFollower,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// bisa
const getAuctionFromId = async (req, res) => {
  try {
    const id = req.params.id;
    const getAuctionFromId = await Tender.findById(id);

    if (getAuctionFromId.is_show === true) {
      return res.status(400).json({
        status: "400",
        message: "Tender is not found",
      });
    }
    res.status(200).json({
      status: "Succes",
      message: "get auction from id",
      getAuctionFromId,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// // ambil tender yang masih pending/tersedia
// router.get("/tenderAgenTersedia", tenderAgenTersedia);

const tenderAgenTersedia = async (req, res) => {
  try {
    const tenderAgenTersedia = await Tender.find({
      status: "pending",
      is_show: false,
    });

    res.status(200).json({
      status: "Succes",
      message: "get auction from id",
      tenderAgenTersedia,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

module.exports = {
  hubungiAgen,
  DeleteHubungiAgenId,
  DeleteHubungiAgenIdPermanent,
  tenderChoice,

  hubungiAgenDenganQR,
  pilihAgenTender,
  aturJadwalSurvei,

  buatKavling,
  confirmationPurchase,

  daftarSemuaTender,

  daftarSemuaTenderByAdmin,
  daftarAgenTender,
  daftarTender,
  agenda,
  checkUserHAsAuction,
  auctionIsTimeup,
  getAuctionFromCollectionByIdFollower,
  getAuctionFromId,
  tenderAgenTersedia,
};
