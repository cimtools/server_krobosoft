const socket = io();

socket.on('message', (socket) => {
    //console.log(socket);
})

document.querySelector('#terminal').addEventListener('submit', (e) => {
    e.preventDefault();
    const command = e.target.elements.commandInput.value;
    e.target.elements.commandInput.value = '';
    console.log(command);
    socket.emit('directCommand', command);
});
