package com.leadzen.backend.model;

import java.time.Instant;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

@Entity
public class LeadEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lead_id")
    private Lead lead;

    private String emailSubject;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String urgencyLevel;

    @Column(columnDefinition = "TEXT")
    private String urgencyDesc;

    @Column(columnDefinition = "TEXT")
    private String suggestedReply;
    
    private boolean responded;
    private Instant emailDate;

    public LeadEmail() {}

    public LeadEmail(Lead lead, String emailSubject, boolean responded, Instant emailDate){

        this.lead = lead;
        this.emailSubject = emailSubject;
        this.responded = responded;
        this.emailDate = emailDate;
    }

    public void setInsights(String summary, String urgencyLevel, String urgencyDesc, String suggestedReply){

        this.summary = summary;
        this.urgencyLevel = urgencyLevel;
        this.urgencyDesc = urgencyDesc;
        this.suggestedReply = suggestedReply;
    }

    public Long getId(){
        return id;
    }

    public Lead getLead(){
    return lead;
    }

    public String getSubject(){
        return emailSubject;
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

    public Instant getEmailDate(){
        return emailDate;
    }

    public void setResponded(boolean responded){
        this.responded = responded;
    }

}
