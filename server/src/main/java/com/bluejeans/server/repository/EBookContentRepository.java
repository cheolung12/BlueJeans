package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EBookContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EBookContentRepository extends JpaRepository<EBookContentEntity, Integer> {
}
