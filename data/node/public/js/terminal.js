var socket = io()

//Elements

const selectList = document.querySelector('#socket')
const terminal = document.querySelector('#terminal')
selectList.addEventListener('change', (e) => {
    selectList.querySelector('#first_value').disabled = true
    socket.disconnect();
    socket = io(selectList.value);
})

socket.on('message', (socket) => {
    console.log('Receiv: ', socket)
    document.getElementById('response').appendChild(document.createTextNode(socket.data + '\n'))
})

terminal.addEventListener('submit', (e) => {
    e.preventDefault()
    const command = e.target.elements.commandInput.value
    console.log('Send: ', command)
    e.target.elements.commandInput.value = ''
    socket.emit('directCommand', command)
})