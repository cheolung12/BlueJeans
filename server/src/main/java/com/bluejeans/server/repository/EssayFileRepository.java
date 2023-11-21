package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EssayFileRepository extends JpaRepository<EssayFileEntity, String> {

    @Query(value="SELECT * FROM essay_file WHERE essay_id = :id", nativeQuery = true)
    Optional<EssayFileEntity> findByEssayId(int id);
}
