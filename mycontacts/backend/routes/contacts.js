const router = require("express").Router();
let Contact = require("../models/contacts.model");

//Get request for getting all cotnacts
router.route("/").get((req, res) => {
  //Use the Contact model to find all the contacts that are in the DB
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Post request for adding a new contact
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phoneNumber = Number(req.body.phoneNumber);

  const newContact = new Contact({
    name,
    address,
    phoneNumber,
  });

  newContact
    .save()
    .then(() => res.json("Contact added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Contact.findById(req.params.id)
    .then((Contact) => res.json(Contact))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json("Contact deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.name = req.body.name;
      contact.address = req.body.address;
      contact.phoneNumber = Number(req.body.phoneNumber);

      contact
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Export the router
module.exports = router;
