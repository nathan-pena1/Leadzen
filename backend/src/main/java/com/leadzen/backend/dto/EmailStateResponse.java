package com.leadzen.backend.dto;
import com.leadzen.backend.dto.AiResponse;

public record EmailStateResponse(Long emailId, boolean newLead, boolean responded, AiResponse prevInsights) {};
