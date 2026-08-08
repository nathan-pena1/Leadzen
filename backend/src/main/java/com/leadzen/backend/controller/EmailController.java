package com.leadzen.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leadzen.backend.service.EmailService.GetTest;

@RestController
public class EmailController {

    private static final String status = "Leadzen GET endpoint setup successful";

    @GetMapping("/getResponse")
    public GetTest getResponse() {
        return new GetTest(status);
    }
    
}

