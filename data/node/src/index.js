const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const rclnodejs = require('rclnodejs');
const chalk = require('chalk');

const app = express();
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

var client_list = []
var node_list = []

function add_node(node) {
    const rospublisher = node.createPublisher('std_msgs/msg/String', 'send_message');
    const subscription = node.createSubscription('std_msgs/msg/String', 'chatter', (msg) => {
        console.log(chalk.blue.bold(`Received message:`), `${typeof msg}`, msg);
        // io.emit('message', msg);
    });
}

function add_client(socket) {
    client_list.push(socket);
    console.log("New connection! Id:");
    console.log(socket.id);
    console.log('Current number of connections: ', client_list.length);
    socket.on('directCommand', (command)=> {
        console.log(command);
        // rospublisher.publish(command);
        // socket.emit('message', command);
    });

    socket.on('disconnect', ()=> {
        remove_client(socket.id);
    });
}

function remove_client(id) {
    console.log('disconect', id);
    var indexOfSocket = client_list.findIndex(i => i.id === id);
    client_list.splice(indexOfSocket, 1);
    console.log('Index disconected: ', indexOfSocket);
}

app.use(express.static(publicDirectoryPath));

rclnodejs.init()
    .then(() => {
        const node = rclnodejs.createNode('krobosoft_node');
        add_node(node);
        rclnodejs.spin(node);
        return node;
    });

io.on('connection', add_client);  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

server.listen(port, () => {
    console.log(chalk.green(`Server is up on port ${port}!`));
});
