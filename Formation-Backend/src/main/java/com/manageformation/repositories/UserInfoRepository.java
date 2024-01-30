package com.manageformation.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.manageformation.entities.UserInfo;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByName(String username);
    Optional<UserInfo> findByEmail(String email);
    @Query("SELECT u.roles FROM UserInfo u WHERE u.email = :email")
    String findRoleByEmail(@Param("email")String email);
}
