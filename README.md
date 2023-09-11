# Service Tender Intern

## `Models`
```json
Schema({
  agen_id: String,
  agen_name: String,
  agen_bantuan: Object,
  co_broking: Boolean,
  property_id: String,
  property_name: String,
  property_address: Object,
  property_type: String,
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
  kavling_id: String,
  created_by: String,
  reason_cancel: String,
  referral: String,
  qr_code: String,
  type_survey: {
    type: String,
    enum: ["percakapan", "penawaran", "chat", "survey", "co_in", "co_ex"],
    default: "percakapan",
  },
  participants_follow: Array,
  participants_reject: Array,
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
  skema_penjualan: Object,
  is_perpanjangan: Boolean,
  meet_up_at: Number,
  created_at: Number,
  expired_at: Number,
  updated_by: Object,
});
```
