import rclpy
from rclpy.node import Node

from std_msgs.msg import String

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('python_echo')
        self.publisher_ = self.create_publisher(String, 'server_in', 10)
        self.create_subscription(
            String,
            'server_out', 
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        print ('Python node message: ' + msg.data)
        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)

    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()

    rclpy.shutdown()

if __name__ == '__main__':
    main()
