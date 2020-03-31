var topic_message = 'hey'




var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send(topic_message);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





const rclnodejs = require('rclnodejs');
rclnodejs.init().then(() => {
  const node = rclnodejs.createNode('publisher_example_node');


  const publisher = node.createPublisher('std_msgs/msg/String', 'topic');
  publisher.publish(`Hello ROS 2.0 from rclnodejs`);

  
  node.createSubscription('std_msgs/msg/String', 'chatter', msg => {
    console.log(`Received message: ${typeof msg}`, msg);
    topic_message = msg;
  });


  rclnodejs.spin(node);

  console.log('ros2 spin');
});
