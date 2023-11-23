package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResEssayDTO {
    private int id;

    private String title;
    private String content;
    private int user_id;
    private String imp_path;

    public static ResEssayDTO essayEntityToDTO(EssayEntity entity){
        if (entity == null) {
            return null;
        }
        ResEssayDTO essay = new ResEssayDTO().builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .user_id(entity.getUser() != null ? entity.getUser().getId() : null)
                .build();

        return essay;
    }

    public static EssayEntity essayDTOToEntity(ResEssayDTO dto, UserEntity user){
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
