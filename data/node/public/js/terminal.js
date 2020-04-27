var socket = io()

//Elements
//style="overflow:scroll;border:1px solid black;"

const selectList = document.querySelector('#socket')
const terminal = document.querySelector('#terminal')
const response = document.getElementById('response')
response.appendChild(document.createTextNode('>> Please select a station above\n'))


selectList.addEventListener('change', (e) => {
    selectList.querySelector('#first_value').disabled = true
    socket.disconnect();
    socket = io(selectList.value);
    socket.on('message', (msg) => {
        console.log('Receiv: ', msg)
        response.appendChild(document.createTextNode('>> ' + msg + '\n'))
    })
})



terminal.addEventListener('submit', (e) => {
    e.preventDefault()
    const command = e.target.elements.commandInput.value
    console.log('Send: ', command)
    e.target.elements.commandInput.value = ''
    socket.emit('directCommand', command)
})