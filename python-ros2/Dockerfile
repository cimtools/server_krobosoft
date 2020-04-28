FROM osrf/ros:eloquent-desktop

MAINTAINER GiulianoWF Giuliano.Floriani@gmail.com

COPY entry.bash /home/entry/

SHELL ["/bin/bash", "-c"]

RUN apt-get update && \
    apt-get install python-pip -y && \
    pip install pyserial

RUN mkdir -p /home/ws/src && \
    cd /home/ws/src && \
    source /opt/ros/eloquent/setup.bash && \
    ros2 pkg create --build-type ament_python --node-name krobosoft_stt_node krobosoft_stt
    
CMD ["/bin/bash", "/home/entry/entry.bash"]