package com.pblgllgs.demoopencode.repository;

import com.pblgllgs.demoopencode.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
