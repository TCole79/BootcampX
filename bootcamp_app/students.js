const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});


pool
  .query(
    `
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`
  )
  .then((res) => {
    console.log(res);
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));


pool
  .query(
    `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
LIMIT 5;
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    });
  });


/* is the following correct?

const queryString = `
    SELECT DISTINCT students.id as student_id, students.name as name, cohorts.name as cohort
    FROM students
    JOIN cohorts ON cohort_id = cohort.id
    WHERE cohorts.name = $1
    ORDER BY students;
    `;
const values = [process.argv[2] || "JUL02"];
pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
  */