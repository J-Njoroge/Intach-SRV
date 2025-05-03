const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    amount: {
        type: String,
    },

    phone: {
        type: String
    },

    dateOfPayment: {
      type: Date,
      default: Date.now,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("ApplicantPayment", schema);
