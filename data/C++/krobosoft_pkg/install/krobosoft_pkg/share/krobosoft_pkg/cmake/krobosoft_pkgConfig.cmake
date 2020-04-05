# generated from ament/cmake/core/templates/nameConfig.cmake.in

# prevent multiple inclusion
if(_krobosoft_pkg_CONFIG_INCLUDED)
  # ensure to keep the found flag the same
  if(NOT DEFINED krobosoft_pkg_FOUND)
    # explicitly set it to FALSE, otherwise CMake will set it to TRUE
    set(krobosoft_pkg_FOUND FALSE)
  elseif(NOT krobosoft_pkg_FOUND)
    # use separate condition to avoid uninitialized variable warning
    set(krobosoft_pkg_FOUND FALSE)
  endif()
  return()
endif()
set(_krobosoft_pkg_CONFIG_INCLUDED TRUE)

# output package information
if(NOT krobosoft_pkg_FIND_QUIETLY)
  message(STATUS "Found krobosoft_pkg: 0.0.0 (${krobosoft_pkg_DIR})")
endif()

# warn when using a deprecated package
if(NOT "" STREQUAL "")
  set(_msg "Package 'krobosoft_pkg' is deprecated")
  # append custom deprecation text if available
  if(NOT "" STREQUAL "TRUE")
    set(_msg "${_msg} ()")
  endif()
  message(WARNING "${_msg}")
endif()

# flag package as ament-based to distinguish it after being find_package()-ed
set(krobosoft_pkg_FOUND_AMENT_PACKAGE TRUE)

# include all config extra files
set(_extras "")
foreach(_extra ${_extras})
  include("${krobosoft_pkg_DIR}/${_extra}")
endforeach()
