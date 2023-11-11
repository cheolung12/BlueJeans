package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EssayRepository extends JpaRepository<EssayEntity, Integer> {
}
