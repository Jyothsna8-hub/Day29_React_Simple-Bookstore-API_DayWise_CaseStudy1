const mysql = require('mysql2/promise');

// Step 3: Connect
async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',   // change if needed
    password: 'root',   // add your MySQL password
    database: 'employeeDB'
  });
  console.log("✅ Connected to MySQL");
  return connection;
}

// Step 4: Insert Employee
async function addEmployee(name, email, department) {
  const db = await connectDB();
  const [result] = await db.execute(
    "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
    [name, email, department]
  );
  console.log("👨‍💼 Employee Added, ID:", result.insertId);
  await db.end();
}

// Step 5: Fetch All Employees
async function listEmployees() {
  const db = await connectDB();
  const [rows] = await db.execute("SELECT * FROM employees");
  console.log("📋 Employees:", rows);
  await db.end();
}

// Step 6: Update Employee Info
async function updateEmployee(id, newDepartment) {
  const db = await connectDB();
  const [result] = await db.execute(
    "UPDATE employees SET department = ? WHERE id = ?",
    [newDepartment, id]
  );
  console.log(`✏️ Updated Employee ID ${id}, Rows affected:`, result.affectedRows);
  await db.end();
}

// Step 7: Delete Employee
async function deleteEmployee(id) {
  const db = await connectDB();
  const [result] = await db.execute(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );
  console.log(`🗑️ Deleted Employee ID ${id}, Rows affected:`, result.affectedRows);
  await db.end();
}

// Step 9: Demo Run
async function run() {
  await addEmployee("Alice", "alice@example.com", "HR");
  await addEmployee("Bob", "bob@example.com", "IT");

  await listEmployees();

  await updateEmployee(1, "Finance");

  await deleteEmployee(2);

  await listEmployees();
}

run();
