package com.leadzen.backend.service;

import org.springframework.stereotype.Service;

import com.leadzen.backend.dto.EmailRequest;
import com.leadzen.backend.dto.EmailStateResponse;
import com.leadzen.backend.dto.AiResponse;
import com.leadzen.backend.dto.InsightsResponse;
import com.leadzen.backend.model.Lead;
import com.leadzen.backend.model.LeadEmail;
import com.leadzen.backend.repository.LeadRepository;
import com.leadzen.backend.repository.LeadEmailRepository;
import java.util.Optional;
import java.time.Instant;

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
            return new EmailStateResponse(email.getId(),false, email.isResponded());
        }

        LeadEmail email = new LeadEmail(databaseLead, emailRequest.emailSubject(),false, emailDate);
        LeadEmail databaseEmail = leadEmailRepository.save(email);

        return new EmailStateResponse(databaseEmail.getId(), newLead, databaseEmail.isResponded());

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



}
