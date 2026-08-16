package com.leadzen.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.leadzen.backend.model.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long> {}
