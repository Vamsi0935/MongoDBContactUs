const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection failed...", err);
  });

const contactFormSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactFormSchema); 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/contact", async (req, res) => {
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    country: req.body.country,
    message: req.body.message,
  };

  try {
    await Contact.create(data);
    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
});

app.listen(5000, () => {
  console.log("Server is running.....");
});
