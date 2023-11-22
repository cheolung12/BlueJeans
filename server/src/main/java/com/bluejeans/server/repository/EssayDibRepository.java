package com.bluejeans.server.repository;

import com.bluejeans.server.entity.EssayDibsEntity;
import com.bluejeans.server.entity.EssayDibsEntityKey;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EssayDibRepository extends JpaRepository<EssayDibsEntity, EssayDibsEntityKey> {
    Optional<EssayDibsEntity> findByEssayAndUser(EssayEntity essay, UserEntity userEntity);
}
