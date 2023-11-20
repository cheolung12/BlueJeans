package com.bluejeans.server.repository;

import com.bluejeans.server.entity.RecruitDibsEntity;
import com.bluejeans.server.entity.RecruitDibsEntityKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitDibRepository extends JpaRepository<RecruitDibsEntity, RecruitDibsEntityKey> {
    int countByRecruit_Id(int recruitId);
}
