const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  tokenID: { type: String, required: true },
  contacts: [
    {
      name: { type: String },
      address: { type: String },
      phoneNumber: { type: Number },
      favorite: { type: Boolean },
      image: { type: String },
    },
  ],
});

//Create the model contact
const User = mongoose.model("User", userSchema);

module.exports = User;
