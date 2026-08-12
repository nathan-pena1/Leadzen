package com.leadzen.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leadzen.backend.service.AiService;

@RestController
@RequestMapping("/ai")
public class AiController {
    private final AiService aiService;

    public AiController(AiService aiService){
        this.aiService = aiService;
    }

    @GetMapping
public String ask(@RequestParam String question) {
    System.out.println("AI API connection successful: " + question);
    return aiService.getAnswer(question);
}
}
