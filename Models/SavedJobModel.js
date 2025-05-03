const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
        autopopulate: true,
    },

    dateOfSave: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfSave <= value;
          },
          msg: "dateOfJoining should be greater than dateOfSave",
        },
      ],
    },
    sop: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(" ").filter((ele) => ele != "").length <= 250;
        },
        msg: "Statement of purpose should not be greater than 250 words",
      },
    },
  },
  { collation: { locale: "en" } }
);

schema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("savedjobs", schema);
