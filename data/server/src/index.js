const path = require('path');
const http = require('http');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const rclnodejs = require('rclnodejs');
const chalk = require('chalk');
const { sockets, createSttIOList } = require('./sockets')
const app = express();
const server = http.createServer(app)
    // const io = socketio(server);


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

rclnodejs.init()
    .then(() => {
        const node = rclnodejs.createNode('krobosoft_node');
        createSttIOList(node);

        sockets.init(server);
        server.listen(port, () => {
            console.log(chalk.green(`Server is up on port ${port}!`));
        });
        rclnodejs.spin(node);
    })

//app.use(express.json());
app.use(routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());