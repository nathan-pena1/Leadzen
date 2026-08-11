package com.leadzen.backend.service;

import org.springframework.stereotype.Service;

import com.leadzen.backend.dto.EmailRequest;

@Service
public class EmailService {

    public String getSummary(EmailRequest lead){
        return """
        John Doe is inquiring about your listing at 124 Conch Street. He
    is asking about current interest, and availability for a showing.
    """;
    }

    public String getUrgencyLevel(EmailRequest lead){
        return "Medium";
    }

    public String getUrgencyDesc(EmailRequest lead){
        return "Interested buyer asking about a showing.";
    }

    public String getReply(EmailRequest lead){
        return """
        Hi John,

Thanks for your interest in 124 Conch Street!
    
Yes, the property is still available. I'd be happy to schedule a showing with you. How does this Tuesday at 2 pm look for you?
    
Best,
[Your Name]
""";
    }

}
