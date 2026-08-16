package com.leadzen.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.leadzen.backend.model.LeadEmail;

public interface LeadEmailRepository extends JpaRepository<LeadEmail, Long> {}
