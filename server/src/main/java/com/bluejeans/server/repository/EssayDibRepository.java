package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayDibsEntity;
import com.bluejeans.server.entity.EssayDibsEntityKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EssayDibRepository extends JpaRepository<EssayDibsEntity, EssayDibsEntityKey> {
}
