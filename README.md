# server_krobosoft

Krobosoft is a open-source software for robots programming, first dedicated to ACL language of old Eshed Robots (now Intellitek).
The server_krobosoft is used for managment and interface the communication between the primary user and a ROS2 node running in an embeded hardware (Raspberry Pi) connected to the robot controller.

## Running the server

First, make sure to install ´docker´ and ´docker-compose´
To run the server use the command:

```bash
sudo docker-compose -f docker-compose.yml up
```

It will create an Ubuntu container with `Ros2` and `Node.JS`. It will also install the dependencies with npm and start the server, wich will be running on `port 3000`.

Another container will be create simulating the node that will comunicate with the robot. This one can run on python or C++, just change **docker-compose.yml** to select.

## Testing

Once you started the server, acess `localhost:3000/`. The server contains a simple interface for testing.

## Dontpad

* [Building the container](dontpad.com/LabCIM)

* [Useful links](dontpad.com/LabCIM/links)


