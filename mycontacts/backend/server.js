const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');

//Environment variable
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//Hello world from the server!
// app.use("/", (req, res) => {
//     res.send("Hello from the server!");
// });

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
