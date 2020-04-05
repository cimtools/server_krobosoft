import rclpy
from rclpy.node import Node

from std_msgs.msg import String


class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('python_echo')
        self.publisher_ = self.create_publisher(String, 'server_in', 10)
#        self.subscription = self.create_subscription(
        self.create_subscription(
            String,
            'server_out', 
            self.listener_callback,
            10)
#        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        print ('Python node message:' + msg.data)
        self.publisher_.publish(msg)
#        self.get_logger().info('I heard: "%s"' % msg.data)





def main(args=None):
    rclpy.init(args=args)

#    node = rclpy.create_node('python_echo')
#    publisher = node.create_publisher(String, 'server_in', 10)
#
#    node.create_subscription(
#        String,
#        'server_out', 
#        lambda msg: publisher.publish(msg),
#        10)

#    rclpy.spin(node)
#    node.destroy_node()


    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()

    rclpy.shutdown()

if __name__ == '__main__':
    main()
