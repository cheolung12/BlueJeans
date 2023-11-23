package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EBookRepository extends JpaRepository<EBookEntity, Integer> {
}
