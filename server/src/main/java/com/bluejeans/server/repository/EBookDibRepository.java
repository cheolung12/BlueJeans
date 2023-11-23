package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EBookDibsEntity;
import com.bluejeans.server.entity.EBookDibsEntityKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EBookDibRepository extends JpaRepository<EBookDibsEntity, EBookDibsEntityKey> {
}
