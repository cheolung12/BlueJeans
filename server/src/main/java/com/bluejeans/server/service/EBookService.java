package com.bluejeans.server.service;

import com.bluejeans.server.dto.ResEBookContentDTO;
import com.bluejeans.server.dto.ResEBookDTO;
import com.bluejeans.server.entity.*;
import com.bluejeans.server.repository.EBookContentRepository;
import com.bluejeans.server.repository.EBookDibRepository;
import com.bluejeans.server.repository.EBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.bluejeans.server.entity.DibResult.*;

@Service
public class EBookService {

    @Autowired
    private EBookRepository ebookRepository;

    @Autowired
    private EBookContentRepository ebookContentRepository;

    @Autowired
    private EBookDibRepository ebookDibRepository;

    public List<ResEBookDTO> findAll() {
        List<EBookEntity> ebookList = ebookRepository.findAll();
        List<ResEBookDTO> list = new ArrayList<>();

        for(EBookEntity ebook : ebookList) {
            long like = ebookDibRepository.countByEbook(ebook);
            list.add(ResEBookDTO.toDTO(ebook, like));
        }

        return list;
    }

    public ResEBookDTO getBook(int ebookId, UserEntity user) {
        EBookEntity ebook =  ebookRepository.findById(ebookId).orElse(null);
        long like = ebookDibRepository.countByEbook(ebook);
        int userId = user.getId();
        boolean isHeart;
        Optional <EBookDibsEntity> isDib = ebookDibRepository.findByUser_IdAndEbook_Id(userId, ebookId);
        isHeart = isDib.isPresent();

        if(ebook != null){
            return ResEBookDTO.toDTODetail(ebook, like, isHeart);
        } else {
            return null;
        }
    }

    public ResEBookContentDTO getContent(int id) {
        EBookEntity ebook = ebookRepository.findById(id).orElse(null);
        EBookContentEntity content = ebookContentRepository.findById(id).orElse(null);

        return ResEBookContentDTO.toDTO(content, ebook.getTitle());
    }

    public List<ResEBookDTO> searchByKeyword(String keyword) {
        List<EBookEntity> ebookList = ebookRepository.searchByKeyword(keyword);
        List<ResEBookDTO> list = new ArrayList<>();

        for(EBookEntity ebook : ebookList) {
            long like = ebookDibRepository.countByEbook(ebook);
            list.add(ResEBookDTO.toDTO(ebook, like));
        }

        return list;
    }

    public List<ResEBookDTO> orderByType(String type) {
        List<EBookEntity> orderedList =  ebookRepository.orderByType(type);
        List<ResEBookDTO> list = new ArrayList<>();
        for(EBookEntity ebook : orderedList) {
            long like = ebookDibRepository.countByEbook(ebook);
            list.add(ResEBookDTO.toDTO(ebook, like));
        }

        return list;
    }

    @Transactional
    public DibResult dib(int bookId, UserEntity userEntity) {
        EBookEntity ebook = ebookRepository.findById(bookId).orElse(null);
        if (ebook == null) {
            return BOOK_NOT_FOUND;
        }
        Optional<EBookDibsEntity> existingDib = ebookDibRepository.findByEbookAndUser(ebook, userEntity);
        if (existingDib.isPresent()) {
            ebookDibRepository.delete(existingDib.get());
            return DIB_REMOVED;
        } else {
            EBookDibsEntity dib = new EBookDibsEntity(userEntity, ebook);
            ebookDibRepository.save(dib);
            return DIB_ADDED;
        }
    }

    public long countDibs(int bookId) {
        EBookEntity ebook = ebookRepository.findById(bookId).orElse(null);
        if(ebook != null){
            return ebookDibRepository.countByEbook(ebook);
        }else {
            return 0;
        }
    }

    public List<ResEBookDTO> searchByKeywordAndOrderByLatest(String searchKeyword) {
        List<EBookEntity> eBookEntities = ebookRepository.searchByKeywordAndOrderByLatest(searchKeyword);
        List<ResEBookDTO> list = new ArrayList<>();
        for(EBookEntity ebook : eBookEntities) {
            long like = ebookDibRepository.countByEbook(ebook);
            list.add(ResEBookDTO.toDTO(ebook, like));
        }

        return list;
    }

    public List<ResEBookDTO> searchByKeywordAndOrderByLikes(String searchKeyword) {
        List<EBookEntity> eBookEntities = ebookRepository.searchByKeywordAndOrderByLikes(searchKeyword);
        List<ResEBookDTO> list = new ArrayList<>();
        for(EBookEntity ebook : eBookEntities) {
            long like = ebookDibRepository.countByEbook(ebook);
            list.add(ResEBookDTO.toDTO(ebook, like));
        }

        return list;
    }
}
