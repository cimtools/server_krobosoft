const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const rclnodejs = require('rclnodejs');
const chalk = require('chalk');
const { add_client, add_node, remove_client } = require('./controllers/Ros2Controller')
const app = express();
const server = http.createServer(app)
const io = socketio(server);

const station_1 = io.of('/stt1')
const station_2 = io.of('/stt2')
const station_3 = io.of('/stt3')
const station_4 = io.of('/stt4')

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

rclnodejs.init()
    .then(() => {
        const node = rclnodejs.createNode('krobosoft_node');
        add_node(node);
        rclnodejs.spin(node);
    })
    .then(() => {
        server.listen(port, () => {
            console.log(chalk.green(`Server is up on port ${port}!`));
        });
        station_1.on('connection', add_client)
        station_2.on('connection', add_client)
        station_3.on('connection', add_client)
        station_4.on('connection', add_client)
            //io.on('connection', add_client);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());