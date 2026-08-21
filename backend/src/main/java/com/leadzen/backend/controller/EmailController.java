package com.leadzen.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leadzen.backend.dto.EmailRequest;
import com.leadzen.backend.dto.InsightsResponse;
import com.leadzen.backend.service.EmailService;
import com.leadzen.backend.dto.EmailStateResponse;
import com.leadzen.backend.dto.HistoryResponse;
import java.util.List;


@RestController
public class EmailController {

    private final EmailService emailService;
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/insights")
    public InsightsResponse generate(@RequestBody EmailRequest lead) {
        return emailService.generateInsights(lead);
    }

    @PostMapping("/email")
    public EmailStateResponse saveEmail(@RequestBody EmailRequest email) {
        return emailService.saveEmail(email);
    }

    @GetMapping("/history")
    public List<HistoryResponse> getHistory() {
        return emailService.getHistory();
    }

}
