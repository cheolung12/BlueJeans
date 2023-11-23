package com.bluejeans.server.service;

import com.bluejeans.server.repository.EBookContentRepository;
import com.bluejeans.server.repository.EBookDibRepository;
import com.bluejeans.server.repository.EBookRepository;
import com.bluejeans.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EBookService {
    @Autowired
    private EBookRepository eBookRepository;

    @Autowired
    private EBookContentRepository eBookContentRepository;

    @Autowired
    private EBookDibRepository eBookDibRepository;

    @Autowired
    private UserRepository userRepository;
}
