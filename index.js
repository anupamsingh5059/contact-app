

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

app.get('/add-contact', (req, res)=> {
    res.render("add-contact")
})
app.post('/add-contact/:id', (req, res)=> {
    
    
})
app.get('/update-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");

    res.render("update-contact", { contact });
  } catch (err) {
    res.status(500).send("Error loading contact");
  }
});

app.post('/update-contact/:id', (req, res)=>{
    
})
app.get('/delete-contact/:id', (req, res)=>{
    
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});