import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const DB_DIR = './src/db';

async function migrate() {
  console.log('🚀 Starting migration...');

  // 1. Institutions
  try {
    const institutions = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'institutions.json'), 'utf8'));
    console.log(`- Migrating ${institutions.length} institutions...`);
    const { error } = await supabase.from('institutions').upsert(institutions);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating institutions:', err.message);
  }

  // 2. Faculties
  try {
    const faculties = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'faculty.json'), 'utf8'));
    console.log(`- Migrating ${faculties.length} faculties...`);
    // Add default institution_id for HTU if needed
    const facultiesWithInst = faculties.map(f => ({ ...f, institution_id: 'htu' }));
    const { error } = await supabase.from('faculties').upsert(facultiesWithInst);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating faculties:', err.message);
  }

  // 3. Departments
  try {
    const academicOptions = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'academic-options.json'), 'utf8'));
    const departments = academicOptions.departments || [];
    console.log(`- Migrating ${departments.length} departments...`);
    const { error } = await supabase.from('departments').upsert(departments);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating departments:', err.message);
  }

  // 4. Programmes
  try {
    const programmes = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'programmes.json'), 'utf8'));
    console.log(`- Migrating ${programmes.length} programmes...`);
    // Rename facultyId to faculty_id to match DB schema
    const formattedProgrammes = programmes.map(p => ({
      id: p.id,
      name: p.name,
      faculty_id: p.facultyId,
      programme_type: p.programmeType
    }));
    const { error } = await supabase.from('programmes').upsert(formattedProgrammes);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating programmes:', err.message);
  }

  // 5. Courses
  try {
    const courses = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'course-catalog.json'), 'utf8'));
    console.log(`- Migrating ${courses.length} courses...`);
    const formattedCourses = courses.map(c => ({
      id: c.id,
      code: c.code,
      title: c.title,
      department: c.department,
      image_url: c.image
    }));
    const { error } = await supabase.from('courses').upsert(formattedCourses);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating courses:', err.message);
  }

  // 6. Weekly Lectures
  try {
    const lectures = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'weekly-lectures.json'), 'utf8'));
    console.log(`- Migrating ${lectures.length} lectures...`);
    const formattedLectures = lectures.map(l => ({
      day: l.day,
      course_code: l.courseCode,
      lecturer: l.lecturer,
      venue: l.venue,
      start_time: l.startTime,
      end_time: l.endTime
    }));
    const { error } = await supabase.from('weekly_lectures').upsert(formattedLectures);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating lectures:', err.message);
  }

  // 7. Quizzes
  try {
    const quizzes = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'quizzes.json'), 'utf8'));
    console.log(`- Migrating ${quizzes.length} quizzes...`);
    const formattedQuizzes = quizzes.map(q => ({
      course_code: q.course,
      title: q.title,
      date: q.date,
      time: q.time,
      venue: q.venue,
      status: q.status
    }));
    const { error } = await supabase.from('quizzes').upsert(formattedQuizzes);
    if (error) throw error;
  } catch (err) {
    console.error('❌ Error migrating quizzes:', err.message);
  }

  console.log('✅ Migration complete!');
}

migrate();
