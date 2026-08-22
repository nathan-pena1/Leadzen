package com.leadzen.backend.dto;
import com.leadzen.backend.dto.AiResponse;

public record EmailStateResponse(Long emailId, boolean prevLead, boolean responded, AiResponse prevInsights) {};
