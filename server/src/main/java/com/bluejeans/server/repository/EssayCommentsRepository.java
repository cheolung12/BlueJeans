package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayCommentsEntity;
import com.bluejeans.server.entity.EssayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EssayCommentsRepository extends JpaRepository<EssayCommentsEntity, Integer> {
    List<EssayCommentsEntity> findByEssayId(int essayId);
}
