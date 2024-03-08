CREATE DATABASE AirTribe;

CREATE TABLE Instructors (
    instructor_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    instructor_id INT,
    name VARCHAR(100) NOT NULL,
    max_seats INT NOT NULL,
    start_date DATE NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE Leads (
    lead_id INT PRIMARY KEY,
    course_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    linkedin_profile VARCHAR(200),
    status VARCHAR(20) DEFAULT 'Applied', -- Change from ENUM to VARCHAR
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE LeadComments (
    comment_id INT PRIMARY KEY,
    lead_id INT,
    instructor_id INT,
    comment TEXT NOT NULL,
    FOREIGN KEY (lead_id) REFERENCES Leads(lead_id),
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);
