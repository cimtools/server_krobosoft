const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json(topic_message);
});


module.exports = routes;