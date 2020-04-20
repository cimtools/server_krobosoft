const chalk = require('chalk');

var client_list = []
var node_list = []
var ros2_publisher;
var ros2_subscriber;

// Called when ROS2 is first initiated. It setups ROS2 com.
function add_node(node) {
    node_list.push(node);
    ros2_publisher = node.createPublisher('std_msgs/msg/String', 'server_out');
    ros2_subscriber = node.createSubscription('std_msgs/msg/String', 'server_in', (msg) => {
        console.log(chalk.blue.bold(`Received message:`), `${typeof msg}`, msg);
        // TODO: Insert business logic to forward messages.
        if (client_list.length > 0) {
            client_list[0].emit('message', msg);
        }
    });
}

function add_client(socket) {
    client_list.push(socket);
    console.log("New connection! Id:", socket.id);

    // Receives message from client and send to ROS2 topic.
    socket.on('directCommand', (command) => {
        // TODO: Insert business logic to forward messages.
        console.log(socket.id, ': ', command);
        ros2_publisher.publish(command);
    });

    // Set the disconnect callback to this client.
    socket.on('disconnect', () => {
        remove_client(socket.id);
    });
}

// Handles disconnect. Delete client from client list.
function remove_client(id) {
    console.log('disconect', id);
    var indexOfSocket = client_list.findIndex(i => i.id === id);
    client_list.splice(indexOfSocket, 1);
}

module.exports = {
    add_node,
    add_client,
    remove_client
}