package com.bluejeans.server.repository;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.entity.RecruitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitRepository extends JpaRepository<RecruitEntity, Integer> {
    // 지역별 조회
    @Query(value="SELECT * FROM recruit WHERE region LIKE %:region%", nativeQuery = true)
    List<RecruitEntity> findByRegion(@Param("region")String region);

    // 좋아요, 최신순 정렬
    @Query(value = "SELECT r.* " +
            "FROM recruit r " +
            "LEFT JOIN (SELECT rc_id, COUNT(*) AS like_count FROM recruit_dibs GROUP BY rc_id) rd " +
            "ON r.id = rd.rc_id " +
            "ORDER BY CASE " +
            "    WHEN :type = 'latest' THEN r.created_at " +
            "    WHEN :type = 'likes' THEN like_count " +
            "END DESC", nativeQuery = true)
    List<RecruitEntity> orderByType(@Param("type") String order);

    // 키워드로 조회하고 최신순 정렬
    @Query(value = "SELECT * FROM recruit WHERE title LIKE %:keyword% ORDER BY created_at DESC", nativeQuery = true)
    List<RecruitEntity> searchByKeywordAndOrderByLatest(@Param("keyword") String keyword);

    // 키워드로 조회하고 좋아요순 정렬
    @Query(value = "SELECT r.* " +
            "FROM recruit r " +
            "LEFT JOIN (SELECT rc_id, COUNT(*) AS like_count FROM recruit_dibs GROUP BY rc_id) rd " +
            "ON r.id = rd.rc_id " +
            "WHERE title LIKE %:keyword% " +
            "ORDER BY like_count DESC", nativeQuery = true)
    List<RecruitEntity> searchByKeywordAndOrderByLikes(@Param("keyword") String keyword);

    // 내가 찜한 게시물
    List<RecruitEntity> findByRecruitDibsUserId(int userId);

    // 최근 3개 게시물
    @Query(value = "SELECT * FROM recruit ORDER BY created_at DESC LIMIT 3", nativeQuery = true)
    List<RecruitEntity> findLatestPosts();

    List<RecruitEntity> findByUser_Id(int userId);

    void deleteByUser_Id(int userId);
}
