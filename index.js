const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./db/config");
const port = process.env.PORT || 3012;

const cron = require("node-cron");
const hubungiAgen = require("./controller/hubungiAgenController");
const router = require("./router/index");
const Tender = require("./models/tenderSchema");

database();
app.use(bodyParser.json());
app.use(cors());

cron.schedule("* * * * *", async function (req, res) {
  console.log("Running cron job");
  try {
    const tendersToUpdate = await Tender.find({
      status: "pending",
      expired_at: { $lte: Date.now() },
    });

    for (const tender of tendersToUpdate) {
      tender.status = "expired";
      await tender.save();
      console.log((tender.expired_at = Date.now()));
      // }
      await tender.save();
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
});

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
