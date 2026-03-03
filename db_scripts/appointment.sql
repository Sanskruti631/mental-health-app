-- Create appointments and related tables
-- This handles the appointment booking system

CREATE TABLE IF NOT EXISTS appointments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    student_id CHAR(36) NOT NULL,
    therapist_id CHAR(36) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    session_type VARCHAR(20) NOT NULL CHECK (session_type IN ('video', 'phone', 'in-person')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no-show')),
    urgency_level VARCHAR(20) DEFAULT 'medium' CHECK (urgency_level IN ('low', 'medium', 'high', 'crisis')),
    is_first_session BOOLEAN DEFAULT FALSE,
    notes TEXT,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (therapist_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Note: MySQL doesn't support CHECK constraints with subqueries, so role validation
-- will need to be handled at the application level or with triggers if needed

-- Create indexes for appointments
CREATE INDEX idx_appointments_student_id ON appointments(student_id);
CREATE INDEX idx_appointments_therapist_id ON appointments(therapist_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_urgency ON appointments(urgency_level);

-- Create appointment notes table for session records
CREATE TABLE IF NOT EXISTS appointment_notes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    appointment_id CHAR(36) NOT NULL,
    therapist_id CHAR(36) NOT NULL,
    session_notes TEXT,
    treatment_plan TEXT,
    next_steps TEXT,
    risk_assessment VARCHAR(20) CHECK (risk_assessment IN ('low', 'medium', 'high', 'crisis')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (therapist_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for appointment notes
CREATE INDEX idx_appointment_notes_appointment_id ON appointment_notes(appointment_id);
CREATE INDEX idx_appointment_notes_therapist_id ON appointment_notes(therapist_id);

-- Create therapist availability table
CREATE TABLE IF NOT EXISTS therapist_availability (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    therapist_id CHAR(36) NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday, 6 = Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (therapist_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for therapist availability
CREATE INDEX idx_therapist_availability_therapist_id ON therapist_availability(therapist_id);
CREATE INDEX idx_therapist_availability_day ON therapist_availability(day_of_week);