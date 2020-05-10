const express = require('express');
const uploadConfig = require('./config/upload');
const routes = express.Router();
const multer = require('multer');

const upload = multer(uploadConfig);

// routes.get('/', (req, res) => {
//     res.json(topic_message);
// });

routes.post('/upload', upload.single('program'), (req, res) => {
    console.log("upload: ", req.file)
});

module.exports = routes;