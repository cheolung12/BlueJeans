package com.bluejeans.server.repository;

import com.bluejeans.server.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    //유저아이디로 사용자 정보 가져오기
    Optional<UserEntity> findByUserID(String userID);

    boolean existsByUserID(String userID);

    boolean existsByNickname(String nickname);
}
