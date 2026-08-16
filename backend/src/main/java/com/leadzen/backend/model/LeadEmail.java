package com.leadzen.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LeadEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lead_id")
    private Lead lead;

    private String subject;
    private String summary;
    private String urgencyLevel;
    private String urgencyDesc;
    private String suggestedReply;
    private boolean responded;
    private LocalDateTime emailDate;

    public LeadEmail() {}

    public LeadEmail(Lead lead, String subject, String summary, String urgencyLevel, String urgencyDesc, String suggestedReply, boolean responded,
            LocalDateTime emailDate){

        this.lead = lead;
        this.subject = subject;
        this.summary = summary;
        this.urgencyLevel = urgencyLevel;
        this.urgencyDesc = urgencyDesc;
        this.suggestedReply = suggestedReply;
        this.responded = responded;
        this.emailDate = emailDate;
    }

    public Long getId(){
        return id;
    }

    public Lead getLead(){
    return lead;
    }

    public String getSubject(){
        return subject;
    }

    public String getSummary(){
        return summary;
    }

    public String getUrgencyLevel(){
        return urgencyLevel;
    }

    public String getUrgencyDesc(){
        return urgencyDesc;
    }

    public String getSuggestedReply(){
        return suggestedReply;
    }

    public boolean isResponded(){
        return responded;
    }

    public LocalDateTime getEmailDate(){
        return emailDate;
    }
}
