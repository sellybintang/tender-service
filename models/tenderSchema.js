const mongoose = require("mongoose");

const tenderSchema = mongoose.Schema({
  agen_id: {
    type: String,
  },
  agen_name: {
    type: String,
  },
  property_id: {
    type: String,
  },
  property_name: {
    type: String,
  },
  property_address: {
    type: String,
  },
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
    default: false,
  },
  kavling_id: {
    type: String,
  },
  created_by: {
    type: String,
  },
  reason_cancel: {
    type: String,
  },
  referral: {
    type: String,
  },
  qr_code: {
    type: String,
  },
  type_survey: {
    type: String,
    enum: ["percakapan", "penawaran", "chat", "survey", "co_in", "co_ex"],
    default: "percakapan",
  },
  participants_follow: {
    type: Array,
  },
  participants_reject: {
    type: Array,
  },
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
  meet_up_at: {
    type: Number,
  },
  created_at: {
    type: Number,
  },
  expired_at: {
    type: Number,
  },
  createdAd: {
    type: Date,
    default: Date.now,
  },
  updatedAd: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tender", tenderSchema);
