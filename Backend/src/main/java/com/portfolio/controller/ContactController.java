package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService service;
    public ContactController(ContactService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<ContactMessage> submit(@Valid @RequestBody ContactMessage msg) {
        ContactMessage saved = service.save(msg);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping public List<ContactMessage> all() { return service.findAll(); }
}
