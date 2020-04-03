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
let topic_message;
app.use(express.static(publicDirectoryPath));



rclnodejs.init()
    .then(() => {
        const node = rclnodejs.createNode('publisher_example_node');

        const rospublisher = node.createPublisher('std_msgs/msg/String', 'send_message');
        const subscription = node.createSubscription('std_msgs/msg/String', 'chatter', (msg) => {
            console.log(chalk.blue.bold(`Received message:`), `${typeof msg}`, msg);
            topic_message = msg;
            io.emit('message', topic_message);
            
        });
        console.log(subscription)
        io.on('connection', (socket) => {
            console.log("New connection!");
            socket.emit('message', topic_message)
            socket.on('directCommand', (command)=> {
                console.log(command);
                rospublisher.publish(command);
                socket.emit('message', command);
            });
            
        });
        
        
        app.get('/last_message', function(req, res) {
            res.send(topic_message);
        });

        // app.post('/send_command', function(req, res) {
        //     console.log(req.body.message);
        //     rospublisher.publish(req.body.message);
        //     res.json(req.body.message);
        // });

        rclnodejs.spin(node);
        console.log('ros2 spin');3000
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

server.listen(port, () => {
    console.log(chalk.green(`Server is up on port ${port}!`));
});