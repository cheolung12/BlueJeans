package com.bluejeans.server.repository;

import com.bluejeans.server.entity.RecruitDibsEntity;
import com.bluejeans.server.entity.RecruitDibsEntityKey;
import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruitDibRepository extends JpaRepository<RecruitDibsEntity, RecruitDibsEntityKey> {

    Optional<RecruitDibsEntity> findByRecruitAndUser(RecruitEntity recruit, UserEntity userEntity);

    int countByRecruit(RecruitEntity recruit);

    Optional<RecruitDibsEntity>  findByUser_IdAndRecruit_Id(int userId, int jobId);
}
