package com.bluejeans.server.repository;

import com.bluejeans.server.entity.RecruitFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruitFileRepository extends JpaRepository<RecruitFileEntity, Integer> {

    @Query(value="SELECT * FROM recruit_file WHERE rc_id = :id", nativeQuery = true)
    Optional<RecruitFileEntity> findByRecruitId(int id);
}
