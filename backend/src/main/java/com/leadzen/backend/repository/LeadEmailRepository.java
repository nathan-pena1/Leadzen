package com.leadzen.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.leadzen.backend.model.LeadEmail;
import java.util.Optional;
import com.leadzen.backend.model.Lead;
import java.time.Instant;
import java.util.List;

public interface LeadEmailRepository extends JpaRepository<LeadEmail, Long> {
    Optional<LeadEmail> findByLeadAndEmailSubjectAndEmailDate(Lead lead, String emailSubject, Instant emailDate);

    List<LeadEmail> findAllByOrderByEmailDateDesc();
}
