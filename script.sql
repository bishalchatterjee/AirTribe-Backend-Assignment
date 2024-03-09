CREATE TABLE Instructors (
    instructor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Courses (
    course_id SERIAL PRIMARY KEY,
    instructor_id INT,
    name VARCHAR(100) NOT NULL,
    max_seats INT NOT NULL,
    start_date DATE NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE Leads (
    lead_id SERIAL PRIMARY KEY,
    course_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    linkedin_profile VARCHAR(200),
    status VARCHAR(20) DEFAULT 'Applied',
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Registration (
    courseRegistration_id SERIAL PRIMARY KEY,
    course_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    linkedin_profile VARCHAR(200),
    status VARCHAR(20) DEFAULT 'Applied',
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE LeadComments (
    comment_id SERIAL PRIMARY KEY,
    lead_id INT,
    instructor_id INT,
    comment TEXT NOT NULL,
    FOREIGN KEY (lead_id) REFERENCES Leads(lead_id),
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

INSERT INTO Instructors (name, email) VALUES
('Ramesh Roy', 'ramesh@gmail.com'),
('Yash Raj', 'yash@gmail.com');

INSERT INTO Courses (instructor_id, name, max_seats, start_date) VALUES
(1, 'Full Stack Web Development', 110, '2024-03-15'),
(2, 'Rust Bootcamp', 230, '2024-04-01');

INSERT INTO Leads (course_id, name, email, phone, linkedin_profile, status) VALUES
(1, 'Vishi Anand', 'vish1@example.com', '9856545324', 'linkedin.com/alice', 'Applied'),
(2, 'Magnus Carlsen', 'magnusCarlsen@example.com', '9876543210', 'linkedin.com/bob', 'Applied');

INSERT INTO LeadComments (lead_id, instructor_id, comment) VALUES
(1, 1, 'Good candidate, schedule an interview.'),
(2, 2, 'Need to follow up with additional information.');

COMMIT;