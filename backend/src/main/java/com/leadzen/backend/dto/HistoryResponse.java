package com.leadzen.backend.dto;
import java.time.Instant;

public record HistoryResponse(Long emailId, String leadName, String emailAddress, String emailSubject, String urgencyLevel, boolean responded, Instant emailDate) {}
