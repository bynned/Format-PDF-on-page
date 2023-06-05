const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();

const port = 6000;

app.use(cors());

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})