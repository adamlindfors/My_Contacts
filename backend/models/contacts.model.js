const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  favorite: { type: Boolean },
});

//Create the model contact
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
