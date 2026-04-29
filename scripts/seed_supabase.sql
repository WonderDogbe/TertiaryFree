-- Supabase Initialization Script
-- Generated to migrate local JSON data to SQL

-- 1. Create Tables

-- Institutions
CREATE TABLE IF NOT EXISTS institutions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    abbreviation TEXT
);

-- Faculties
CREATE TABLE IF NOT EXISTS faculties (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

-- Departments
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

-- Programmes
CREATE TABLE IF NOT EXISTS programmes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    faculty_id TEXT REFERENCES faculties(id),
    department_id TEXT REFERENCES departments(id),
    programme_type TEXT -- 'degree', 'hnd', etc.
);

-- Course Catalog
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT,
    image TEXT
);

-- Weekly Lectures
CREATE TABLE IF NOT EXISTS weekly_lectures (
    id TEXT PRIMARY KEY,
    day TEXT NOT NULL,
    course_code TEXT NOT NULL,
    lecturer TEXT,
    venue TEXT,
    start_time TIME,
    end_time TIME
);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    course TEXT NOT NULL,
    title TEXT NOT NULL,
    date DATE,
    time TIME,
    venue TEXT,
    score TEXT,
    status TEXT -- 'Upcoming', 'Ongoing', 'Completed', 'Missed'
);

-- Signup Roles
CREATE TABLE IF NOT EXISTS signup_roles (
    value TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
);

-- Lecturer Titles
CREATE TABLE IF NOT EXISTS lecturer_titles (
    value TEXT PRIMARY KEY,
    label TEXT NOT NULL
);

-- Academic Options (Metadata)
CREATE TABLE IF NOT EXISTS academic_levels (
    value TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    level TEXT,
    semester TEXT
);

-- 2. Insert Data

-- Institutions
INSERT INTO institutions (id, name, abbreviation) VALUES
('htu', 'HO TECHNICAL UNIVERSITY', 'HTU'),
('uhas', 'UNIVERSITY OF HEALTH AND ALLIED SERVICES', 'UHAS'),
('amedzofe', 'AMEDZOFE COLLEGE OF EDUCATION', 'AMEDZOFE')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    abbreviation = EXCLUDED.abbreviation;

-- Faculties
INSERT INTO faculties (id, name) VALUES
('applied-sciences-and-technology', 'Faculty of Applied Sciences and Technology'),
('engineering', 'Faculty of Engineering'),
('built-and-natural-environment', 'Faculty of Built and Natural Environment'),
('art-and-design', 'Faculty of Art and Design'),
('applied-social-sciences', 'Faculty of Applied Social Sciences'),
('htu-business-school', 'HTU Business School'),
('graduate-studies', 'School of Graduate Studies')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Departments
INSERT INTO departments (id, name) VALUES
('cs', 'DEPARTMENT OF COMPUTER SCIENCE'),
('math', 'DEPARTMENT OF MATHEMATICAL SCIENCES'),
('him', 'DEPARTMENT OF HEALTH INFORMATION MANAGEMENT'),
('edu', 'DEPARTMENT OF EDUCATION STUDIES'),
('bus', 'DEPARTMENT OF BUSINESS ADMINISTRATION')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Programmes (from programmes.json)
INSERT INTO programmes (id, name, faculty_id, programme_type) VALUES
('btech-hospitality-management', 'BTech Hospitality Management', 'applied-sciences-and-technology', 'degree'),
('btech-hospitality-and-tourism-management', 'BTech Hospitality & Tourism Management', 'applied-sciences-and-technology', 'degree'),
('btech-food-technology', 'BTech Food Technology', 'applied-sciences-and-technology', 'degree'),
('btech-tourism-leisure-and-events-management', 'BTech Tourism, Leisure and Events Management', 'applied-sciences-and-technology', 'degree'),
('btech-information-and-communication-technology', 'BTech Information and Communication Technology', 'applied-sciences-and-technology', 'degree'),
('btech-agro-enterprise-development', 'BTech Agro Enterprise Development', 'applied-sciences-and-technology', 'degree'),
('btech-statistics-and-finance', 'BTech Statistics and Finance', 'applied-sciences-and-technology', 'degree'),
('btech-computer-science', 'BTech Computer Science', 'applied-sciences-and-technology', 'degree'),
('hnd-food-technology', 'HND Food Technology', 'applied-sciences-and-technology', 'hnd'),
('hnd-hotel-catering-and-institutional-management', 'HND Hotel, Catering and Institutional Management', 'applied-sciences-and-technology', 'hnd'),
('hnd-statistics', 'HND Statistics', 'applied-sciences-and-technology', 'hnd'),
('hnd-agro-enterprise-development', 'HND Agro Enterprise Development', 'applied-sciences-and-technology', 'hnd'),
('hnd-computer-science', 'HND Computer Science', 'applied-sciences-and-technology', 'hnd'),
('hnd-information-and-communication-technology', 'HND Information and Communication Technology', 'applied-sciences-and-technology', 'hnd'),
('btech-electrical-and-electronic-engineering', 'BTech Electrical and Electronic Engineering', 'engineering', 'degree'),
('btech-automobile-engineering', 'BTech Automobile Engineering', 'engineering', 'degree'),
('btech-agricultural-and-environmental-engineering', 'BTech Agricultural and Environmental Engineering', 'engineering', 'degree'),
('btech-civil-engineering', 'BTech Civil Engineering', 'engineering', 'degree'),
('btech-design-and-manufacturing-engineering', 'BTech Design and Manufacturing Engineering', 'engineering', 'degree'),
('btech-biomedical-engineering', 'BTech Biomedical Engineering', 'engineering', 'degree'),
('hnd-agricultural-engineering', 'HND Agricultural Engineering', 'engineering', 'hnd'),
('hnd-mechanical-engineering-automobile-production', 'HND Mechanical Engineering (Automobile / Production)', 'engineering', 'hnd'),
('hnd-civil-engineering', 'HND Civil Engineering', 'engineering', 'hnd'),
('hnd-electrical-and-electronic-engineering', 'HND Electrical and Electronic Engineering', 'engineering', 'hnd'),
('btech-building-technology', 'BTech Building Technology', 'built-and-natural-environment', 'degree'),
('btech-facilities-and-estate-management', 'BTech Facilities & Estate Management', 'built-and-natural-environment', 'degree'),
('btech-architectural-technology', 'BTech Architectural Technology', 'built-and-natural-environment', 'degree'),
('btech-environmental-science', 'BTech Environmental Science', 'built-and-natural-environment', 'degree'),
('hnd-building-technology', 'HND Building Technology', 'built-and-natural-environment', 'hnd'),
('btech-fashion-design-and-textiles', 'BTech Fashion Design and Textiles', 'art-and-design', 'degree'),
('btech-industrial-art', 'BTech Industrial Art (Sculpture, Painting, Graphic Design, Ceramics, Textiles)', 'art-and-design', 'degree'),
('hnd-fashion-design-and-textiles', 'HND Fashion Design and Textiles', 'art-and-design', 'hnd'),
('hnd-industrial-art', 'HND Industrial Art (Sculpture, Painting, Graphic Design, Ceramics, Textiles)', 'art-and-design', 'hnd'),
('bsc-economics-and-innovation', 'BSc Economics & Innovation', 'applied-social-sciences', 'degree'),
('ba-communication-and-applied-media-technology', 'B.A. Communication & Applied Media Technology', 'applied-social-sciences', 'degree'),
('bsc-accounting', 'BSc Accounting (Finance / Taxation options)', 'htu-business-school', 'degree'),
('bsc-financial-services-banking-and-finance', 'BSc Financial Services (Banking & Finance)', 'htu-business-school', 'degree'),
('bsc-financial-services-finance-and-insurance', 'BSc Financial Services (Finance & Insurance)', 'htu-business-school', 'degree'),
('bsc-procurement-and-supply-chain-management', 'BSc Procurement and Supply Chain Management', 'htu-business-school', 'degree'),
('bachelor-of-marketing-and-information-technology-top-up', 'Bachelor of Marketing and Information Technology (Top-Up)', 'htu-business-school', 'degree'),
('bachelor-of-procurement-and-supply-chain-management', 'Bachelor of Procurement and Supply Chain Management', 'htu-business-school', 'degree'),
('bachelor-of-secretaryship-and-management-studies', 'Bachelor of Secretaryship and Management Studies', 'htu-business-school', 'degree'),
('btech-procurement-and-supply-chain-management-top-up', 'BTech Procurement and Supply Chain Management (Top-Up)', 'htu-business-school', 'degree'),
('hnd-accountancy', 'HND Accountancy', 'htu-business-school', 'hnd'),
('hnd-marketing', 'HND Marketing', 'htu-business-school', 'hnd'),
('hnd-secretaryship-and-management-studies', 'HND Secretaryship and Management Studies', 'htu-business-school', 'hnd'),
('hnd-banking-and-finance', 'HND Banking and Finance', 'htu-business-school', 'hnd'),
('hnd-purchasing-and-supply', 'HND Purchasing and Supply', 'htu-business-school', 'hnd'),
('professional-cimg-programme', 'Professional CIMG Programme', 'htu-business-school', 'hnd')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    faculty_id = EXCLUDED.faculty_id, 
    programme_type = EXCLUDED.programme_type;

-- Programmes (from academic-options.json)
INSERT INTO programmes (id, name, department_id) VALUES
('bsc-computer-science', 'B.Sc. Computer Science', 'cs'),
('bsc-information-technology', 'B.Sc. Information Technology', 'cs'),
('bsc-mathematics', 'B.Sc. Mathematics', 'math'),
('bsc-health-information-management', 'B.Sc. Health Information Management', 'him'),
('bed-basic-education', 'B.Ed. Basic Education', 'edu'),
('bsc-business-administration', 'B.Sc. Business Administration', 'bus')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    department_id = EXCLUDED.department_id;

-- Course Catalog
INSERT INTO courses (id, code, title, department, image) VALUES
('mth-101-25-26', 'MTH 101 25/26', 'Math 101', 'DEPARTMENT OF MATHEMATICAL SCIENCES', '/images/course-emerald-a.svg'),
('ict-207-25-26', 'ICT 207 25/26', 'Data Structures', 'DEPARTMENT OF COMPUTER SCIENCE', '/images/course-teal-a.svg'),
('phy-201-25-26', 'PHY 201 25/26', 'Physics 201', 'DEPARTMENT OF MATHEMATICAL SCIENCES', '/images/course-gold-a.svg'),
('ict-205-25-26', 'ICT 205 25/26', 'UI Design', 'DEPARTMENT OF COMPUTER SCIENCE', '/images/course-blue-a.svg'),
('ict-301-25-26', 'ICT 301 25/26', 'Software Engineering', 'DEPARTMENT OF COMPUTER SCIENCE', '/images/course-slate-a.svg'),
('ict-315-25-26', 'ICT 315 25/26', 'Database Systems', 'DEPARTMENT OF COMPUTER SCIENCE', '/images/course-emerald-a.svg'),
('ict-208-25-26', 'ICT 208 25/26', 'Networks', 'DEPARTMENT OF COMPUTER SCIENCE', '/images/course-teal-a.svg')
ON CONFLICT (id) DO UPDATE SET 
    code = EXCLUDED.code, 
    title = EXCLUDED.title, 
    department = EXCLUDED.department, 
    image = EXCLUDED.image;

-- Weekly Lectures
INSERT INTO weekly_lectures (id, day, course_code, lecturer, venue, start_time, end_time) VALUES
('wk-1', 'Monday', 'MTH 101 25/26', 'Dr. Smith', 'Room A2', '09:00:00', '10:50:00'),
('wk-2', 'Monday', 'ICT 207 25/26', 'Dr. Mensah', 'Lab C', '13:00:00', '14:50:00'),
('wk-3', 'Tuesday', 'PHY 201 25/26', 'Prof. Lee', 'Hall B1', '11:00:00', '12:50:00'),
('wk-4', 'Tuesday', 'ICT 205 25/26', 'Ms. Ofori', 'Studio 4', '15:00:00', '16:50:00'),
('wk-5', 'Wednesday', 'ICT 301 25/26', 'Dr. Boateng', 'Room D3', '07:00:00', '08:50:00'),
('wk-6', 'Thursday', 'ICT 315 25/26', 'Dr. Chen', 'Lab A1', '17:00:00', '18:50:00'),
('wk-7', 'Friday', 'ICT 208 25/26', 'Mr. Johnson', 'Room C5', '19:00:00', '20:50:00'),
('wk-8', 'Saturday', 'ICT 315 25/26', 'Dr. Chen', 'Lab A1', '09:00:00', '10:50:00'),
('wk-9', 'Sunday', 'MTH 101 25/26', 'Dr. Smith', 'Room A2', '11:00:00', '12:50:00')
ON CONFLICT (id) DO UPDATE SET 
    day = EXCLUDED.day, 
    course_code = EXCLUDED.course_code, 
    lecturer = EXCLUDED.lecturer, 
    venue = EXCLUDED.venue, 
    start_time = EXCLUDED.start_time, 
    end_time = EXCLUDED.end_time;

-- Quizzes
INSERT INTO quizzes (id, course, title, date, time, venue, score, status) VALUES
('quiz-1', 'CSC 301', 'Algorithms Quiz Drill', '2026-04-22', '09:30:00', 'Room LT-3', NULL, 'Upcoming'),
('quiz-2', 'PHY 201', 'Mechanics Flash Quiz', '2026-04-20', '14:00:00', 'Online (Zoom)', NULL, 'Ongoing'),
('quiz-3', 'MAT 221', 'Differential Equations Quiz', '2026-04-24', '12:00:00', 'Room C-12', NULL, 'Upcoming'),
('quiz-4', 'CSC 205', 'Database Practice Quiz', '2026-04-08', '10:00:00', 'Room B-07', '18/25', 'Completed'),
('quiz-5', 'STA 211', 'Probability Quiz 2', '2026-03-30', '15:00:00', 'Room C-04', '21/25', 'Completed'),
('quiz-6', 'GST 101', 'Communication Skills Quiz', '2026-03-18', '11:00:00', 'Online (LMS)', '0/20', 'Missed')
ON CONFLICT (id) DO UPDATE SET 
    course = EXCLUDED.course, 
    title = EXCLUDED.title, 
    date = EXCLUDED.date, 
    time = EXCLUDED.time, 
    venue = EXCLUDED.venue, 
    score = EXCLUDED.score, 
    status = EXCLUDED.status;

-- Academic Levels
INSERT INTO academic_levels (value, label, level, semester) VALUES
('100-1', 'Level 100 (1st Semester)', '100', '1'),
('100-2', 'Level 100 (2nd Semester)', '100', '2'),
('200-1', 'Level 200 (1st Semester)', '200', '1'),
('200-2', 'Level 200 (2nd Semester)', '200', '2'),
('300-1', 'Level 300 (1st Semester)', '300', '1'),
('300-2', 'Level 300 (2nd Semester)', '300', '2'),
('400-1', 'Level 400 (1st Semester)', '400', '1'),
('400-2', 'Level 400 (2nd Semester)', '400', '2')
ON CONFLICT (value) DO UPDATE SET 
    label = EXCLUDED.label, 
    level = EXCLUDED.level, 
    semester = EXCLUDED.semester;

-- Signup Roles
INSERT INTO signup_roles (value, title, description) VALUES
('student', 'Student', 'For HTU, select faculty and programme first, then enter details, choose level, and set your password.'),
('lecturer', 'Lecturer', 'Continue with lecturer registration fields including title and course lectured.')
ON CONFLICT (value) DO UPDATE SET 
    title = EXCLUDED.title, 
    description = EXCLUDED.description;

-- Lecturer Titles
INSERT INTO lecturer_titles (value, label) VALUES
('Dr.', 'Dr.'),
('Prof.', 'Prof.'),
('Mr.', 'Mr.'),
('Mrs.', 'Mrs.'),
('Ms.', 'Ms.'),
('Lecturer', 'Lecturer'),
('Senior Lecturer', 'Senior Lecturer')
ON CONFLICT (value) DO UPDATE SET label = EXCLUDED.label;
