import rclpy
from rclpy.node import Node

from std_msgs.msg import String

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('krobosoft_python_node')
<<<<<<< HEAD:data/Python/krobosoft_python_package/build/krobosoft_python_package/build/lib/krobosoft_python_package/krobosoft_node.py
        self.publisher_ = self.create_publisher(String, 'stt2_out', 10)
=======
        self.publisher_ = self.create_publisher(String, 'stt3_out', 10)
>>>>>>> feature-dockerros2:data/Python_stt3_package/krobosoft_stt_node.py
        self.create_subscription(
            String,
            'stt3_in', 
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        msg.data = msg.data + " [stt3]"
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
