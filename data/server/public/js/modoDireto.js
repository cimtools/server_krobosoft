

//elementos

const upload = document.querySelector('#modoDireto');


upload.addEventListener('submit', (e) => {
    //e.preventDefault();
    const file = e.target.elements.program.files[0]

    console.log('Upload file ', file);
    //e.target.elements.commandInput.value = ''
    //socket.emit('directCommand', command)
})