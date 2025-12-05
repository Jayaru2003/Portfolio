-- Sample project data
INSERT INTO project (title, description, tech_stack, image_url, github_url, demo_url, created_at) 
VALUES ('Sample Project', 'This is a sample portfolio project showcasing my skills', 'Java, Spring Boot, React', 
        'https://via.placeholder.com/400x300', 'https://github.com/sample/project', 'https://example.com', CURRENT_TIMESTAMP);

-- Sample contact message
INSERT INTO contact_message (name, email, message, created_at) 
VALUES ('Alice Smith', 'alice@example.com', 'Hello! I am interested in discussing a project with you.', CURRENT_TIMESTAMP);

-- Sample admin user (password: admin123)
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2a$10$Py6JmOM4P1fOkDDB9ktfUuN1PtNOaNSMk8gI3nSV./UG2VOjmJLh2', 'ROLE_ADMIN');

-- Sample profile data
INSERT INTO profile (full_name, title, bio, about_description, profile_image_url, cv_url, github_url, linkedin_url, twitter_url, email_address, phone_number, years_experience, projects_completed, happy_clients, created_at, updated_at)
VALUES ('John Doe', 'Full Stack Developer', 'Passionate developer creating amazing web experiences', 
        'I am a dedicated full-stack developer with expertise in modern web technologies. I specialize in building scalable, user-friendly applications that solve real-world problems. My passion lies in clean code, innovative solutions, and continuous learning.',
        'https://via.placeholder.com/200', 'https://example.com/cv.pdf',
        'https://github.com/johndoe', 'https://linkedin.com/in/johndoe', 'https://twitter.com/johndoe',
        'john.doe@example.com', '+1 234 567 8900',
        5, 50, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

