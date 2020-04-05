const socket = io();

socket.on('message', (socket) => {
    console.log('Receiv: ', socket);
    document.getElementById('response').appendChild(document.createTextNode(socket.data + '\n'));
})

document.querySelector('#terminal').addEventListener('submit', (e) => {
    e.preventDefault();
    const command = e.target.elements.commandInput.value;
    console.log('Send: ', command);
    e.target.elements.commandInput.value = '';
    socket.emit('directCommand', command);
});