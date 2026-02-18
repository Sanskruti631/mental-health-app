-- Seed sample data for testing
-- This creates sample users and data for development/testing

-- Insert sample admin user
INSERT INTO users (id, email, password_hash, name, role, is_verified, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@university.edu', '$2b$12$LQv3c1yqBwEHxv68JaMCOeHHzQzUHMM4HLI4fOFiukjNI3VA9/c3O', 'Jane Admin', 'admin', true, true),
('550e8400-e29b-41d4-a716-446655440002', 'therapistsoulsup2025@gmail.com', '$2b$12$LQv3c1yqBwEHxv68JaMCOeHHzQzUHMM4HLI4fOFiukjNI3VA9/c3O', 'Dr. Sarah Johnson', 'therapist', true, true),
('550e8400-e29b-41d4-a716-446655440003', 'student@university.edu', '$2b$12$LQv3c1yqBwEHxv68JaMCOeHHzQzUHMM4HLI4fOFiukjNI3VA9/c3O', 'John Student', 'student', true, true);

-- Insert admin profile
INSERT INTO admin_profiles (user_id, college_name, college_id, position, department) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'University of Excellence', 'UOE001', 'Mental Health Coordinator', 'Student Services');

-- Insert therapist profile
INSERT INTO therapist_profiles (user_id, license_number, specialties, years_experience, bio, rating, total_reviews, is_accepting_patients) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'LIC123456', ARRAY['Anxiety', 'Depression', 'Academic Stress', 'Trauma'], '12 years', 'Experienced clinical psychologist specializing in student mental health with over 12 years of practice.', 4.9, 127, true);

-- Insert student profile
INSERT INTO student_profiles (user_id, student_id, admin_id, enrollment_date, graduation_year, major) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'STU12345', 'ADM001', '2022-09-01', 2026, 'Computer Science');

-- Insert therapist availability (Monday to Friday, 9 AM to 5 PM)
INSERT INTO therapist_availability (therapist_id, day_of_week, start_time, end_time) VALUES
('550e8400-e29b-41d4-a716-446655440002', 1, '09:00:00', '17:00:00'), -- Monday
('550e8400-e29b-41d4-a716-446655440002', 2, '09:00:00', '17:00:00'), -- Tuesday
('550e8400-e29b-41d4-a716-446655440002', 3, '09:00:00', '17:00:00'), -- Wednesday
('550e8400-e29b-41d4-a716-446655440002', 4, '09:00:00', '17:00:00'), -- Thursday
('550e8400-e29b-41d4-a716-446655440002', 5, '09:00:00', '17:00:00'); -- Friday

-- Insert sample appointment
INSERT INTO appointments (student_id, therapist_id, appointment_date, appointment_time, session_type, status, urgency_level, is_first_session, notes) VALUES
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE + INTERVAL '1 day', '10:00:00', 'video', 'confirmed', 'medium', true, 'Initial consultation for anxiety management');

-- Insert sample conversation
INSERT INTO conversations (student_id, therapist_id) VALUES
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample messages
INSERT INTO messages (conversation_id, sender_id, message_text, is_read) VALUES
((SELECT id FROM conversations WHERE student_id = '550e8400-e29b-41d4-a716-446655440003'), '550e8400-e29b-41d4-a716-446655440003', 'Hello Dr. Johnson, I wanted to thank you for our session yesterday. I''m feeling much better about managing my anxiety.', true),
((SELECT id FROM conversations WHERE student_id = '550e8400-e29b-41d4-a716-446655440003'), '550e8400-e29b-41d4-a716-446655440002', 'I''m so glad to hear that! Remember to practice the breathing exercises we discussed. How are you feeling about your upcoming exams?', false);
