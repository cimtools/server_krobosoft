const chalk = require('chalk');

var client_list = []
var sttIOList = []
var node_list = []

// Called when ROS2 is first initiated. It setups ROS2 com.
function createSttIOList(node, sttList = []) {
    node_list.push(node);

    sttList.forEach((stt) => {
        console.log(stt);
        const publisher = node.createPublisher('std_msgs/msg/String', stt + '_in');
        const subscriber = node.createSubscription('std_msgs/msg/String', stt + '_out', (msg) => {
            console.log(chalk.blue.bold(`Ros2Controller::createSttIOList::Received message:`), `${typeof msg}`, msg);
            // TODO: Insert business logic to forward messages.
            if (client_list.length > 0) {
                client_list[0].emit('message', msg);
            }
        });
        sttIOList[stt] = { 'pub': publisher, 'sub': subscriber };
    });

}

function add_client(socket) {
    const stt = socket.adapter.nsp.name.replace('/', '');
    client_list.push(socket);
    console.log(sttIOList)
    console.log("New connection! Id:", socket.id);
    // Receives message from client and send to ROS2 topic.
    socket.on('directCommand', (command) => {
        // TODO: Insert business logic to forward messages.
        console.log(socket.id, ': ', command);
        sttIOList[stt]['pub'].publish(command);
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
    createSttIOList,
    add_client,
    remove_client
}