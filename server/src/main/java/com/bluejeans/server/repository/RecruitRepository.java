package com.bluejeans.server.repository;

import com.bluejeans.server.entity.RecruitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitRepository extends JpaRepository<RecruitEntity, Integer> {
}
