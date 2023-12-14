package com.bluejeans.server.repository;

import com.bluejeans.server.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EBookDibRepository extends JpaRepository<EBookDibsEntity, EBookDibsEntityKey> {
    Optional<EBookDibsEntity> findByEbookAndUser(EBookEntity ebook, UserEntity userEntity);
    long countByEbook(EBookEntity ebook);

    Optional<EBookDibsEntity> findByUser_IdAndEbook_Id(int userId, int ebookId);
}
