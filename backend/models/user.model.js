const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Contact = require("../models/contacts.model");

const userSchema = new Schema(
  {
    tokenID: String,
    contacts: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Create the model contact
const User = mongoose.model("User", userSchema);

module.exports = User;
