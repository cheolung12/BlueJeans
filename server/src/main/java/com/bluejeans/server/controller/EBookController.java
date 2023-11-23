package com.bluejeans.server.controller;

import com.bluejeans.server.service.EBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ebook")
public class EBookController {

    @Autowired
    private EBookService eBookService;
    
}
