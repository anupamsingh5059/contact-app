import express from "express";

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