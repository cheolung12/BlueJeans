package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EssayRepository extends JpaRepository<EssayEntity, Integer> {
    @Modifying(clearAutomatically = true)
    @Transactional //뭐지?
    @Query(nativeQuery = true, value ="UPDATE essay SET title= :title, content=:content WHERE id=:essayId")
    void patch(@Param("essayId") int essayId, @Param("title") String title, @Param("content") String content);
}
