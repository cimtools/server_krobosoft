const express       = require('express');
const bodyParser    = require('body-parser');
const rclnodejs     = require('rclnodejs');


rclnodejs.init()
    .then(() => {
        var node = rclnodejs.createNode('publisher_example_node');

        const rospublisher = node.createPublisher('std_msgs/msg/String', 'send_message');
        const subscription = node.createSubscription('std_msgs/msg/String', 'chatter', msg => {
            console.log(`Received message: ${typeof msg}`, msg);
            topic_message = msg;
        });

        var app = express();
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        app.get('/', function (req, res) {
            res.send(topic_message);
        });

        app.post('/', function(req,res) {
            console.log(req.body.message);
            rospublisher.publish(req.body.message);
            res.json(req.body.message);
        });

        app.listen(3000);

        rclnodejs.spin(node);
        console.log('ros2 spin');
    });

