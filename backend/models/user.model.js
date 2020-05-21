const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  tokenID: { type: String, required: true },
  image: { type: String },
  contacts: [
    {
      name: { type: String },
      address: { type: String },
      phoneNumber: { type: Number },
      favorite: { type: Boolean },
      image: { type: String },
      label: { type: String },
    },
  ],
  labels: [String],
});

//Create the model contact
const User = mongoose.model("User", userSchema);

module.exports = User;
