const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "doctor_booking"
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database Connection Error");
    console.log(err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// BOOK APPOINTMENT API
app.post("/book", (req, res) => {

  console.log("📩 Incoming Booking Data:", req.body);

  const {
    name,
    doctor_name,
    appointment_date,
    appointment_time,
    phone_number,
    notes
  } = req.body;

  const sql = `
    INSERT INTO appointments
    (name, doctor_name, appointment_date, appointment_time, phone_number, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      doctor_name,
      appointment_date,
      appointment_time,
      phone_number,
      notes
    ],
    (err, result) => {

      if (err) {
        console.log("❌ SQL ERROR:", err);
        return res.status(500).send("Database Error");
      }

      console.log("✅ Appointment Saved Successfully");
      res.send("Appointment Booked");

    }
  );
});

// GET ALL APPOINTMENTS (ADMIN SIDE)
app.get("/appointments", (req, res) => {

  db.query("SELECT * FROM appointments", (err, result) => {

    if (err) {
      console.log("❌ Fetch Error:", err);
      return res.status(500).send("Database Error");
    }

    res.json(result);

  });

});

// SERVER START
app.listen(5000, () => {
  console.log("🚀 Server Running On Port 5000");
});