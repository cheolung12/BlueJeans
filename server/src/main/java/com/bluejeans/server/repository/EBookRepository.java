package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EBookRepository extends JpaRepository<EBookEntity, Integer> {

    // 키워드로 조회
    @Query(value = "SELECT * FROM ebook WHERE title LIKE %:keyword%", nativeQuery = true)
    List<EBookEntity> searchByKeyword(String keyword);

    // 최신순, 인기순 정렬
    @Query(value = "SELECT e.* " +
            "FROM ebook e " +
            "LEFT JOIN (SELECT ebook_id, COUNT(*) AS like_count FROM ebook_dibs GROUP BY ebook_id) ed " +
            "ON e.id = ed.ebook_id " +
            "ORDER BY CASE " +
            "    WHEN :type = 'latest' THEN e.created_at " +
            "    WHEN :type = 'likes' THEN like_count " +
            "END DESC", nativeQuery = true)
    List<EBookEntity> orderByType(String type);

    // 키워드로 조회하고 최신순 정렬
    @Query(value = "SELECT * FROM ebook WHERE title LIKE %:keyword% ORDER BY created_at DESC", nativeQuery = true)
    List<EBookEntity> searchByKeywordAndOrderByLatest(@Param("keyword") String keyword);

    // 키워드로 조회하고 좋아요순 정렬
    @Query(value = "SELECT e.* " +
            "FROM ebook e " +
            "LEFT JOIN (SELECT ebook_id, COUNT(*) AS like_count FROM ebook_dibs GROUP BY ebook_id) ed " +
            "ON e.id = ed.ebook_id " +
            "WHERE title LIKE %:keyword% " +
            "ORDER BY like_count DESC", nativeQuery = true)
    List<EBookEntity> searchByKeywordAndOrderByLikes(@Param("keyword") String keyword);

    // 내가 찜한 책 목록
    List<EBookEntity> findByEbookDibsUserId(int userId);

    // 랜덤 10개
    @Query(value = "SELECT * FROM ebook ORDER BY RAND() LIMIT 24", nativeQuery = true)
    List<EBookEntity> findRandomEBooks();

}
