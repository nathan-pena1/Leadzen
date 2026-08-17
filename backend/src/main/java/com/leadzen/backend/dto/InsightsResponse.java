package com.leadzen.backend.dto;

public record InsightsResponse(AiResponse insights, boolean newLead, boolean responded) {
    
}
