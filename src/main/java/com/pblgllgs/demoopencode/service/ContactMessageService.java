package com.pblgllgs.demoopencode.service;

import com.pblgllgs.demoopencode.model.ContactMessage;
import com.pblgllgs.demoopencode.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage save(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    public List<ContactMessage> findAll() {
        return contactMessageRepository.findAll();
    }

    public ContactMessage findById(Long id) {
        return contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
    }

    public void delete(Long id) {
        contactMessageRepository.deleteById(id);
    }
}
