const { Pool } = require('pg');


const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
-- GROUP BY cohort
WHERE cohorts.name = '${process.argv[2]}'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}:  ${user.teacher}`)
  })
})
.catch(err => console.error('query error', err.stack));
