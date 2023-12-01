package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EssayRepository extends JpaRepository<EssayEntity, Integer> {
    @Modifying(clearAutomatically = true)
    @Transactional //뭐지?
    @Query(nativeQuery = true, value ="UPDATE essay SET title= :title, content=:content WHERE id=:essayId")
    void patch(@Param("essayId") int essayId, @Param("title") String title, @Param("content") String content);

    // 내가 찜한 에세이 목록
    List<EssayEntity> findByEssayDibsUserId(int userId);

    // 좋아요순 3개
    @Query(value = "SELECT e.* " +
            "FROM essay e " +
            "LEFT JOIN (SELECT essay_id, COUNT(*) AS like_count FROM essay_dibs GROUP BY essay_id) ed " +
            "ON e.id = ed.essay_id " +
            "ORDER BY like_count DESC " +
            "LIMIT 3", nativeQuery = true)
    List<EssayEntity> findFavoritePosts();

    List<EssayEntity> findByUser_Id(int userId);

    void deleteByUser_Id(int userId);
}
