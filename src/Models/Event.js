const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    DateEvent:{
     type: Date,
     required: true

    },
    hour:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Events", EventSchema);
