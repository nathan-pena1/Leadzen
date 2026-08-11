package com.leadzen.backend.service;

import org.springframework.stereotype.Service;
import com.leadzen.backend.dto.EmailRequest;

@Service
public class EmailService {

    public String getSummary(EmailRequest lead){
        return lead.emailBody();
    }

    public String getUrgency(EmailRequest lead){
        return lead.emailSubject();
    }

    public String getReply(EmailRequest lead){
        return lead.leadName();
    }

}
