const router = require("express").Router();
let Contact = require("../models/contacts.model");
let User = require("../models/user.model");

//Get the contacts of the logged in user
router.route("/allContacts/").get((req, res) => {
  User.findOne({ tokenID: req.query.subID })
    .then((userData) => {
      if (userData) res.json(userData.contacts);
      else {
        const newUser = new User({ tokenID: req.query.subID });
        newUser.save().then(() => res.json([]));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add a new contact
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phoneNumber = Number(req.body.phoneNumber);
  const favorite = false;
  const image = req.body.image;

  console.log(req.query.subID);

  const newContact = {
    name,
    address,
    phoneNumber,
    favorite,
    image,
  };

  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) user.contacts.push(newContact);
    user
      .save()
      .then(() => res.json("Contact updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//GET contact by ID
router.route("/contact/:id").get((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      contact = user.contacts.filter((contact) => contact._id == req.params.id);
      //console.log(contact[0]);
      res.json(contact[0]);
    }
  });
});

//Delete contact by ID
router.route("/:id").delete((req, res) => {
  console.log(req.query);

  console.log(req.query.subID);

  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      user.contacts = user.contacts.filter(
        (contact) => contact._id != req.params.id
      );

      user
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//Edit contact
router.route("/update/:id").post((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      contact = user.contacts.filter((contact) => contact._id == req.params.id);
      contact[0].name = req.body.name;
      contact[0].address = req.body.address;
      contact[0].phoneNumber = req.body.phoneNumber;

      user
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//toggleFavorite
router.route("/togglefavorite/:id").post((req, res) => {
  User.findOne({ tokenID: req.body.subID }).then((user) => {
    if (user) {
      contact = user.contacts.filter((contact) => contact._id == req.params.id);
      contact[0].favorite = !contact[0].favorite;

      user
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//addUserImage
router.route("/addUserImage").post((req, res) => {
  console.log(req.query.subID);
  console.log(req.body);

  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) user.image = req.body.image;
    user
      .save()
      .then(() => res.json("Contact updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//getUserImage
router.route("/getUserImage/").get((req, res) => {
  console.log(req.query.subID);
  User.findOne({ tokenID: req.query.subID })
    .then((userData) => {
      if (userData.image) res.json(userData.image);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Export the router
module.exports = router;
