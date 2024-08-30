package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.UserDto;
import com.studi.OG_tickets.dto.UserWithRoleDto;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.models.UserEntity;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

  public static UserDto toDto(UserEntity user) {
    UserDto userDto = new UserDto();
    userDto.setId(user.getId());
    userDto.setFirstName(user.getFirstName());
    userDto.setLastName(user.getLastName());
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
    user.setEmail(userDto.getEmail());
    user.setPassword(userDto.getPassword());
    user.setKey(userDto.getKey());
    return user;
  }

  public static UserWithRoleDto withRoleToDto(UserEntity userEntity) {
    UserWithRoleDto userWithRoleDto = new UserWithRoleDto();
    userWithRoleDto.setId(userEntity.getId());
    userWithRoleDto.setKey(userEntity.getKey());
    userWithRoleDto.setFirstName(userEntity.getFirstName());
    userWithRoleDto.setLastName(userEntity.getLastName());
    userWithRoleDto.setEmail(userEntity.getEmail());
    Role.RoleName role = userEntity.getRoles().get(0).getName();
    userWithRoleDto.setRole(role);
    return userWithRoleDto;
  }
}
