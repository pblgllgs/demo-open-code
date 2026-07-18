package com.pblgllgs.demoopencode.controller;

import com.pblgllgs.demoopencode.model.ContactMessage;
import com.pblgllgs.demoopencode.service.ContactMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> create(@RequestBody ContactMessage message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactMessageService.save(message));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> findAll() {
        return ResponseEntity.ok(contactMessageService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> findById(@PathVariable Long id) {
        return ResponseEntity.ok(contactMessageService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactMessageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
