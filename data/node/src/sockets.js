const socketio = require('socket.io');
const chalk = require('chalk')
var sockets = {};
var clientList = [];
var sttIOList = [];

const sttList = [
    'stt1',
    'stt2',
    'stt3',
    'stt4'
]


sockets.init = (server) => {
    var io = socketio.listen(server)

    sttList.forEach(stt => {
        sttList[stt] = io.of('/' + stt)
        clientList[stt] = [];
    });

    sttList.forEach(stt => {
        sttList[stt].on('connection', addClient);

    })
}


const createSttIOList = (node) => {
    sttList.forEach((stt) => {
        const publisher = node.createPublisher('std_msgs/msg/String', stt + '_in');
        const subscriber = node.createSubscription('std_msgs/msg/String', stt + '_out', (msg) => {
            console.log(chalk.blue.bold(`Ros2Controller::createSttIOList::Received message for ${stt}:`), `${typeof msg}`, msg);
            // TODO: Insert business logic to forward messages.
            clientList[stt].forEach(socket => socket.emit('message', msg.data))
            console.log(msg.data)
        });
        sttIOList[stt] = { publisher, subscriber };
    });
}



const addClient = (socket) => {
    const stt = socket.adapter.nsp.name.replace('/', '');

    clientList[stt].push(socket);
    console.log("New connection! Id:", socket.id);
    // Receives message from client and send to ROS2 topic.
    socket.on('directCommand', (command) => {
        // TODO: Insert business logic to forward messages.
        console.log(socket.id, ': ', command);
        sttIOList[stt].publisher.publish(command);
    });

    // Set the disconnect callback to this client.
    socket.on('disconnect', () => {
        remove_client(socket.id);
    });
}

// Handles disconnect. Delete client from client list.
const remove_client = (id) => {
    console.log('disconect', id);
    var indexOfSocket = clientList.findIndex(i => i.id === id);
    clientList.splice(indexOfSocket, 1);
}



module.exports = {
    sockets,
    createSttIOList,
}