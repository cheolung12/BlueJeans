package com.bluejeans.server.controller;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class RecruitController {
    @Autowired
    private RecruitService recruitService;

    @GetMapping
    public List<RecruitDTO> findAll() {
        return recruitService.findAll();
    }

}
