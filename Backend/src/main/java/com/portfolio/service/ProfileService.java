package com.portfolio.service;

import com.portfolio.model.Profile;
import com.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public List<Profile> getAllProfiles() {
        return repository.findAll();
    }

    public Optional<Profile> getProfile() {
        // Return the first profile (single profile system)
        List<Profile> profiles = repository.findAll();
        return profiles.isEmpty() ? Optional.empty() : Optional.of(profiles.get(0));
    }

    public Profile saveProfile(Profile profile) {
        // Ensure only one profile exists
        List<Profile> existing = repository.findAll();
        if (!existing.isEmpty() && (profile.getId() == null || !profile.getId().equals(existing.get(0).getId()))) {
            profile.setId(existing.get(0).getId());
        }
        return repository.save(profile);
    }

    public Optional<Profile> getProfileById(Long id) {
        return repository.findById(id);
    }

    public Profile updateProfile(Long id, Profile profile) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setFullName(profile.getFullName());
                    existing.setTitle(profile.getTitle());
                    existing.setBio(profile.getBio());
                    existing.setAboutDescription(profile.getAboutDescription());
                    existing.setProfileImageUrl(profile.getProfileImageUrl());
                    existing.setCvUrl(profile.getCvUrl());
                    existing.setGithubUrl(profile.getGithubUrl());
                    existing.setLinkedinUrl(profile.getLinkedinUrl());
                    existing.setTwitterUrl(profile.getTwitterUrl());
                    existing.setEmailAddress(profile.getEmailAddress());
                    existing.setPhoneNumber(profile.getPhoneNumber());
                    existing.setYearsExperience(profile.getYearsExperience());
                    existing.setProjectsCompleted(profile.getProjectsCompleted());
                    existing.setHappyClients(profile.getHappyClients());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}
