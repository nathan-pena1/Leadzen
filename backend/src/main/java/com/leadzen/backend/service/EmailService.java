package com.leadzen.backend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

import org.springframework.stereotype.Service;

import com.leadzen.backend.dto.AiResponse;
import com.leadzen.backend.dto.EmailRequest;
import com.leadzen.backend.dto.EmailStateResponse;
import com.leadzen.backend.dto.InsightsResponse;
import com.leadzen.backend.model.Lead;
import com.leadzen.backend.model.LeadEmail;
import com.leadzen.backend.repository.LeadEmailRepository;
import com.leadzen.backend.repository.LeadRepository;
import com.leadzen.backend.dto.HistoryResponse;

@Service
public class EmailService {

    private final AiService aiService;
    private final LeadRepository leadRepository;
    private final LeadEmailRepository leadEmailRepository;

    public EmailService(AiService aiService, LeadRepository leadRepository, LeadEmailRepository leadEmailRepository) {
        this.aiService = aiService;
        this.leadRepository = leadRepository;
        this.leadEmailRepository = leadEmailRepository;
    }

    public EmailStateResponse saveEmail(EmailRequest emailRequest) {
        Instant emailDate = Instant.parse(emailRequest.emailDate());
        Optional<Lead> previousLead = leadRepository.findByEmailAddress(emailRequest.emailAddress());
        Lead databaseLead;
        boolean newLead;

        if (previousLead.isPresent()){
            databaseLead = previousLead.get();
            newLead = false;
        }
        else {
            databaseLead = new Lead(emailRequest.leadName(), emailRequest.emailAddress(),"");
            databaseLead = leadRepository.save(databaseLead);
            newLead = true;
        }

        Optional<LeadEmail> previousEmail = leadEmailRepository.findByLeadAndEmailSubjectAndEmailDate(databaseLead, emailRequest.emailSubject(), emailDate);

        if (previousEmail.isPresent()){
            LeadEmail email = previousEmail.get();
            AiResponse prevInsights = null;

            if (email.getSummary() != null) {
                prevInsights = new AiResponse(email.getSummary(), email.getUrgencyDesc(), email.getUrgencyLevel(),
                email.getSuggestedReply());
            }
            return new EmailStateResponse(email.getId(),false, email.isResponded(), prevInsights);
        }

        LeadEmail email = new LeadEmail(databaseLead, emailRequest.emailSubject(),false, emailDate);
        LeadEmail databaseEmail = leadEmailRepository.save(email);

        return new EmailStateResponse(databaseEmail.getId(), newLead, databaseEmail.isResponded(), null);

    }

    public InsightsResponse generateInsights(EmailRequest lead) {
        Instant emailDate = Instant.parse(lead.emailDate());
        AiResponse insights = aiService.getInsights(lead);
        Lead databaseLead = leadRepository.findByEmailAddress(lead.emailAddress()).orElseThrow();
        LeadEmail databaseEmail = leadEmailRepository.findByLeadAndEmailSubjectAndEmailDate(databaseLead, lead.emailSubject(), emailDate).orElseThrow();

        databaseEmail.setInsights(insights.summary(), insights.urgencyLevel(), insights.urgencyDesc(), insights.suggestedReply());
        leadEmailRepository.save(databaseEmail);

        return new InsightsResponse(insights,false, databaseEmail.isResponded());
    }

    public List<HistoryResponse> getHistory() {
        List<LeadEmail> emails = leadEmailRepository.findAllByOrderByEmailDateDesc();
        List<HistoryResponse> history = new ArrayList<>();

        for (LeadEmail email : emails) {
            HistoryResponse response = new HistoryResponse(email.getId(), email.getLead().getLeadName(),
                                    email.getLead().getEmailAddress(), email.getSubject(), email.getUrgencyLevel(), 
                                    email.isResponded(), email.getEmailDate());

            history.add(response);
    }

        return history;
}



}
