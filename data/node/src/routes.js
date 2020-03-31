const express = require('express');

const routes = express.Router();

routes.get('/', function(req, res) {
    res.json(topic_message);
});


module.exports = routes;