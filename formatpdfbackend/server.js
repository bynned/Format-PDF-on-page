require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();

const port = 6000; // Port where server is running

// Connect to database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Create schema for pdf, because the schema is so small, there is no reason to create it in another file
const pdfSchema = new mongoose.Schema({
    filename: String,
});




app.use(cors());

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})