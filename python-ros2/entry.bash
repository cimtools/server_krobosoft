#!/bin/bash
cp /home/extern/krobosoft_stt_node.py /home/ws/src/krobosoft_stt/krobosoft_stt/krobosoft_stt_node.py
cd /home/ws/
source /opt/ros/eloquent/setup.bash
colcon build 
source /home/ws/install/setup.bash
ros2 run krobosoft_stt krobosoft_stt_node