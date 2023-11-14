package com.bluejeans.server.repository;

import com.bluejeans.server.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUserID(String userID); //유저아이디로 사용자 정보 가져오기

    boolean existsByUserID(String userID);
}
