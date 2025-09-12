import express from "express";
import mongoose, { connect, connections } from "mongoose";


import Contact from "./models/contacts.models.js";



// Database 

mongoose.connect("mongodb://127.0.0.1:27017/contacts-crud")
.then(() => console.log("Database connection Success"))
const app = express();
// Middleware

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
// Route
app.get('/', (req, res)=> {
   res.render("home")
})

app.get('/show-contact', (req, res)=> {
  res.render("show-contact")
})
app.get('/add-contact', (req, res)=> {
    res.render("add-contact")
})
app.post('/add-contact', (req, res)=> {
    
    
})
app.get('/update-contact', (req, res)=>{
   res.render("update-contact")
})
app.post('/update-contact', (req, res)=>{
    
})
app.get('/delete-contact', (req, res)=>{
    
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});