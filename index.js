

import express from "express";
const app = express();
import mongoose, { connect, connections } from "mongoose";


import Contact from "./models/contacts.models.js";



// Database 

mongoose.connect("mongodb://127.0.0.1:27017/contacts-crud")
.then(() => console.log("Database connection Success"))

// Middleware

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))

// app.use(express.static("public"))

app.use(express.static("public"));

// Route
app.get('/', async (req, res)=> {

   const contacts = await Contact.find();
  //  res.json(contacts)
   res.render("home", {contacts:contacts})
})

// app.get('/show-contact/:id', (req, res)=> {
//   res.render("show-contact")
// })

app.get('/show-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.render("show-contact", { contact });
  } catch (error) {
    res.status(500).send("Error loading contact");
  }
});

// Show Add Contact Form
app.get('/add-contact', (req, res) => {
  res.render("add-contact");
});

app.post('/add-contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Error adding contact");
  }
});


// Show update form
app.get('/update-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.render("update-contact", { contact });
  } catch (error) {
    res.status(500).send("Error loading contact");
  }
});

// Handle update form submission
app.post('/update-contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });
    res.redirect(`/show-contact/${req.params.id}`);
  } catch (error) {
    res.status(500).send("Error updating contact");
  }
});

// Hard Delete - Contact remove permanently
app.get('/delete-contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Error deleting contact");
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});