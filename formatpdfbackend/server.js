require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();
const path = require('path');

const port = 5050; // Port where server is running
app.use(cors());

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
const Pdf = mongoose.model('Pdf', pdfSchema);

// Setup file upload using Multer:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage });

// Define post and get routes for uploading and getting the stored pdf's
app.post('/upload', upload.single('pdf'), (req, res) => {
    const { filename } = req.file;
    const newPdf = new Pdf({ filename });
    newPdf.save()
        .then(() => res.redirect(`/pdfs/${newPdf._id}`))
        .catch((error) => res.status(500).json({ error }));
});

app.get('/pdfs/:id', (req, res) => {
    const { id } = req.params;
    Pdf.findById(id)
        .then((pdf) => {
            if (!pdf) {
                return res.status(404).json({ error: 'PDF does not exist' });
            }
            res.sendFile(path.join(__dirname, `uploads/${pdf.filename}`));
        })
        .catch((error) => res.status(500).json({ error }));
});
app.get('/pdf-url', (req, res) => {
    Pdf.findOne()
      .then((pdf) => {
        if (!pdf) {
          return res.status(404).json({ error: 'No PDF available' });
        }
        const pdfUrl = `${req.protocol}://${req.get('host')}/pdfs/${pdf._id}`;
        res.json({ url: pdfUrl });
      })
      .catch((error) => res.status(500).json({ error }));
  });
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})