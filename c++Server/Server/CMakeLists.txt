cmake_minimum_required(VERSION 3.16)
project(krobosoftServer)

add_definitions("-std=c++2a")

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

include_directories("${CMAKE_SOURCE_DIR}/Router")
include_directories("${CMAKE_SOURCE_DIR}/Server")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR}/bin)

add_subdirectory("${CMAKE_SOURCE_DIR}/Router")
add_subdirectory("${CMAKE_SOURCE_DIR}/Server")

# add_subdirectory(lib1_dir)

add_executable(main main.cpp)
conan_target_link_libraries(main)
target_link_libraries(main Router Server)

