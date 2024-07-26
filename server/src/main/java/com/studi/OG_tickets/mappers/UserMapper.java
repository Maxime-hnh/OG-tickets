package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.UserDto;
import com.studi.OG_tickets.models.UserEntity;

public class UserMapper {

  public static UserDto toDto(UserEntity user) {
    UserDto userDto = new UserDto();
    userDto.setId(user.getId());
    userDto.setFirstName(user.getFirstName());
    userDto.setLastName(user.getLastName());
    userDto.setUserName(user.getUserName());
    userDto.setEmail(user.getEmail());
    userDto.setPassword(user.getPassword());
    userDto.setKey(user.getKey());
    return userDto;
  }

  public static UserEntity toEntity(UserDto userDto) {
    UserEntity user = new UserEntity();
    user.setId(userDto.getId());
    user.setFirstName(userDto.getFirstName());
    user.setLastName(userDto.getLastName());
    user.setUserName(userDto.getUserName());
    user.setEmail(userDto.getEmail());
    user.setPassword(userDto.getPassword());
    user.setKey(userDto.getKey());
    return user;
  }
}
