package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    private final ContactRepository repo;
    public ContactService(ContactRepository repo) { this.repo = repo; }
    public ContactMessage save(ContactMessage msg) { return repo.save(msg); }
    public List<ContactMessage> findAll() { return repo.findAll(); }
    public Optional<ContactMessage> findById(Long id) { return repo.findById(id); }
}
