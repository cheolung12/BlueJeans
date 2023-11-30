package com.bluejeans.server.service;

import com.bluejeans.server.dto.ResEBookDTO;
import com.bluejeans.server.dto.ResEssayDTO;
import com.bluejeans.server.dto.ResMainDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.EBookEntity;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MainPageService {

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private EBookRepository ebookRepository;

    @Autowired
    private EssayRepository essayRepository;

    @Autowired
    private RecruitDibRepository recruitDibRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EBookDibRepository eBookDibRepository;

    @Autowired
    private EssayDibRepository essayDibRepository;


    public List<ResRecruitDTO> convertRecruitEntitiesToDTOList(List<RecruitEntity> recruitList) {
        return recruitList.stream()
                .map(recruit -> ResRecruitDTO.toDTO(recruit, recruitDibRepository.countByRecruit(recruit)))
                .collect(Collectors.toList());
    }

    public List<ResEBookDTO> convertEBookEntitiesToDTOList(List<EBookEntity> ebookList) {
        return ebookList.stream()
                .map(ebook -> ResEBookDTO.toDTO(ebook, eBookDibRepository.countByEbook(ebook)))
                .collect(Collectors.toList());
    }

    public List<ResEssayDTO> convertEssayEntitiesToDTOList(List<EssayEntity> essayList) {
        return essayList.stream()
                .map(essay -> ResEssayDTO.toDTO(essay, essayDibRepository.countByEssay(essay)))
                .collect(Collectors.toList());
    }

    public ResMainDTO getMainPost() {

        List<ResRecruitDTO> RecruitLists = convertRecruitEntitiesToDTOList(recruitRepository.findLatestPosts());
        List<ResEBookDTO> EBookLists = convertEBookEntitiesToDTOList(ebookRepository.findRandomEBooks());
        List<ResEssayDTO> EssayLists = convertEssayEntitiesToDTOList(essayRepository.findFavoritePosts());

        return ResMainDTO.builder()
                .EssayList(EssayLists)
                .EBookList(EBookLists)
                .RecruitList(RecruitLists)
                .build();
    }

}

