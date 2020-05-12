import serial

import rclpy
from rclpy.node import Node

from std_msgs.msg import String

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('krobosoft_python_node')
        self.publisher_ = self.create_publisher(String, 'stt2_out', 10)
        self.create_subscription(
            String,
            'stt2_in', 
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        msg.data = msg.data + " [stt2]"
        print ('Python node message: ' + msg.data)
        with serial.Serial('/dev/ttyACM0', 9600, timeout=2) as ser:
            ser.write(msg.data.encode())
            msg.data = str(ser.readline())
            print ("Recived msg from device: " + msg.data)
            self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)

    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()

    rclpy.shutdown()

if __name__ == '__main__':
    main()