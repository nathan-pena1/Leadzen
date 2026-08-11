package com.leadzen.backend.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leadzen.backend.dto.EmailRequest;
import com.leadzen.backend.dto.InsightsResponse;
import com.leadzen.backend.service.EmailService;


@RestController
public class EmailController {

    private final EmailService emailService;
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/insights")
    public InsightsResponse generateInsights(@RequestBody EmailRequest lead) {
        String summary = emailService.getSummary(lead);
        String urgencyLevel = emailService.getUrgencyLevel(lead);
        String urgencyDesc= emailService.getUrgencyDesc(lead);
        String suggestedReply = emailService.getReply(lead);

        return new InsightsResponse(summary, urgencyLevel, urgencyDesc, suggestedReply);
    }

}
