const express = require('express');
const rclnodejs = require('rclnodejs');
const app = express();
const routes = require('./routes.js')

rclnodejs.init()
    .then(() => {
        var node = rclnodejs.createNode('publisher_example_node');

        const publisher = node.createPublisher('std_msgs/msg/String', 'topic');
        publisher.publish(`Hello ROS 2.0 from rclnodejs`);

        node.createSubscription('std_msgs/msg/String', 'chatter', msg => {
            console.log(`Received message: ${typeof msg}`, msg);
            topic_message = msg;
        });

        rclnodejs.spin(node);

        console.log('ros2 spin');
    });

app.get('/', function(req, res) {
    res.json(topic_message);
});


//app.use(routes);
app.use(express.json);
app.listen(3000);