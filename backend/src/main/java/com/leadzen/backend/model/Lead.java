package com.leadzen.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String leadName;
    private String emailAddress;
    private String notes;

    public Lead() {}

    public Lead(String leadName, String emailAddress, String notes){
        this.leadName = leadName;
        this.emailAddress = emailAddress;
        this.notes = notes;
    }

    public Long getId(){
        return id;
    }

    public String getLeadName(){
        return leadName;
    }

    public String getEmailAddress(){
        return emailAddress;
    }

    public String getNotes(){
        return notes;
    }

}
