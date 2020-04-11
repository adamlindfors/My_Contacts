const router = require('express').Router();
let Contact = require('../models/contacts.model');

//Get request for getting all cotnacts
router.route('/').get((req, res) => {
    //Use the Contact model to find all the contacts that are in the DB
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Post request for adding a new contact
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = Number(req.body.phoneNumber);

    const newContact = new Contact({
        name,
        address,
        phoneNumber,
    });

    newContact.save()
        .then(() => res.json('Contact added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Export the router
module.exports = router;