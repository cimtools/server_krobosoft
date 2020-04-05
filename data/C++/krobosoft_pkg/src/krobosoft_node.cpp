#include <memory>
#include <iostream>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using std::placeholders::_1;

class MinimalEcho : public rclcpp::Node
{
  public:
    MinimalEcho()
    : Node("krobosoft_node"){
        publisher_ = this->create_publisher<std_msgs::msg::String>(
            "server_in", 
            10
        );
        subscription_ = this->create_subscription<std_msgs::msg::String>(
            "server_out",
            10,
            std::bind(&MinimalEcho::callback, this, _1)
        );
    }

  private:
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;

    void callback(const std_msgs::msg::String::SharedPtr msg) {
        publisher_->publish(*msg);
        std::cout << "C++ node message: " << msg->data << std::endl;
    }
  };

  int main(int argc, char * argv[])
  {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<MinimalEcho>());
    rclcpp::shutdown();
    return 0;
  }
