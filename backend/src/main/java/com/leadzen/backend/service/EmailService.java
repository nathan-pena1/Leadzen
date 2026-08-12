package com.leadzen.backend.service;

import org.springframework.stereotype.Service;

import com.leadzen.backend.dto.EmailRequest;
import com.leadzen.backend.dto.InsightsResponse;

@Service
public class EmailService {

    private final AiService aiService;

    public EmailService(AiService aiService) {
        this.aiService = aiService;
    }

    public InsightsResponse generateInsights(EmailRequest lead) {
        return aiService.getInsights(lead);
    }

}
