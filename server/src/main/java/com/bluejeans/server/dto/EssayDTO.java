package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EssayDTO {
    private int id;

    private String title;
    private String content;
    private int user_id;

    public static EssayDTO essayEntityToDTO(EssayEntity entity){
        if (entity == null) {
            return null;
        }
        EssayDTO essay = new EssayDTO().builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .user_id(entity.getUser() != null ? entity.getUser().getId() : null)
                .build();

        return essay;
    }

    public static EssayEntity essayDTOToEntity(EssayDTO dto, UserEntity user){
        if (dto == null) {
            return null;
        }
        EssayEntity essay = new EssayEntity().builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(user)
                .build();

        return essay;
    }


}
