package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.UserDto;
import com.studi.OG_tickets.dto.UserShortDto;
import com.studi.OG_tickets.dto.UserWithRoleDto;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.models.UserEntity;

public class UserMapper {

  public static UserDto toDto(UserEntity user) {
    UserDto userDto = new UserDto();
    userDto.setId(user.getId());
    userDto.setFirstName(user.getFirstName());
    userDto.setLastName(user.getLastName());
    userDto.setEmail(user.getEmail());
    userDto.setPassword(user.getPassword());
    userDto.setKey(user.getKey());
    userDto.setTwoFactorCode(user.getTwoFactorCode());
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
    userWithRoleDto.setTwoFactorCode(userEntity.getTwoFactorCode());
    Role.RoleName role = userEntity.getRoles().get(0).getName();
    userWithRoleDto.setRole(role);
    return userWithRoleDto;
  }

  public static UserShortDto toShortDto(UserEntity userEntity) {
    UserShortDto userShortDto = new UserShortDto();
    userShortDto.setId(userEntity.getId());
    userShortDto.setFirstName(userEntity.getFirstName());
    userShortDto.setLastName(userEntity.getLastName());
    userShortDto.setEmail(userEntity.getEmail());
    return userShortDto;
  }
}
