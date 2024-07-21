package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.UserDto;
import com.studi.OG_tickets.models.User;

public class UserMapper {

  public static UserDto toDto(User user) {
    UserDto userDto = new UserDto();
    userDto.setId(user.getId());
    userDto.setFirstName(user.getFirstName());
    userDto.setLastName(user.getLastName());
    userDto.setEmail(user.getEmail());
    userDto.setPassword(user.getPassword());
    userDto.setRole(user.getRole());
    userDto.setKey(user.getKey());
    return userDto;
  }

  public static User toEntity(UserDto userDto) {
    User user = new User();
    user.setId(userDto.getId());
    user.setFirstName(userDto.getFirstName());
    user.setLastName(userDto.getLastName());
    user.setEmail(userDto.getEmail());
    user.setPassword(userDto.getPassword());
    user.setRole(userDto.getRole());
    user.setKey(userDto.getKey());
    return user;
  }
}
