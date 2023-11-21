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

    @Query(value = "SELECT r.* " +
            "FROM recruit r " +
            "LEFT JOIN (SELECT rc_id, COUNT(*) AS like_count FROM recruit_dibs GROUP BY rc_id) rd " +
            "ON r.id = rd.rc_id " +
            "ORDER BY CASE " +
            "    WHEN :order = 'latest' THEN r.created_at " +
            "    WHEN :order = 'favorite' THEN like_count " +
            "END DESC", nativeQuery = true)
    List<RecruitEntity> filteringRecruit(@Param("order") String order);

    // 키워드로 조회
    @Query(value = "SELECT * FROM recruit WHERE title LIKE %:keyword%", nativeQuery = true)
    List<RecruitEntity> searchByKeyword(String keyword);

    // 내가 찜한 게시물
    List<RecruitEntity> findByRecruitDibsUserId(int userId);


}
