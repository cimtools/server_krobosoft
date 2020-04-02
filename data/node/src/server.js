const express = require('express');
const bodyParser = require('body-parser');
const rclnodejs = require('rclnodejs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

rclnodejs.init()
    .then(() => {
        const node = rclnodejs.createNode('publisher_example_node');

        const rospublisher = node.createPublisher('std_msgs/msg/String', 'send_message');
        const subscription = node.createSubscription('std_msgs/msg/String', 'chatter', msg => {
            console.log(`Received message: ${typeof msg}`, msg);
            topic_message = msg;
        });

        app.get('/last_message', function(req, res) {
            res.send(topic_message);
        });

        app.post('/send_command', function(req, res) {
            console.log(req.body.message);
            rospublisher.publish(req.body.message);
            res.json(req.body.message);
        });

        rclnodejs.spin(node);
        console.log('ros2 spin');
    });