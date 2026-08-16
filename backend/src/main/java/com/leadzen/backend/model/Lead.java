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
    private String leadEmail;
    private String notes;

    public Lead() {}

    public Lead(String leadName, String leadEmail, String notes){
        this.leadName = leadName;
        this.leadEmail = leadEmail;
        this.notes = notes;
    }

    public Long getId(){
        return id;
    }

    public String getLeadName(){
        return leadName;
    }

    public String getLeadEmail(){
        return leadEmail;
    }

    public String getNotes(){
        return notes;
    }

}
