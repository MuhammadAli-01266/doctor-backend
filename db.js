import { Pool } from 'pg';

// Create a connection pool to Neon PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

pool.connect()
  .then(async (client) => {
    console.log("✅ Neon PostgreSQL Connected Successfully");
    
    // Check and create the correct table structure!
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS appointments (
          id SERIAL PRIMARY KEY,
          patient_name VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          notes TEXT,
          doctor_name VARCHAR(255) NOT NULL,
          appointment_date VARCHAR(255) NOT NULL,
          appointment_time VARCHAR(255) NOT NULL,
          status VARCHAR(50) DEFAULT 'Pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ Appointments table is ready.");
    } catch (tableErr) {
      console.error("❌ Error creating appointments table:", tableErr);
    } finally {
      client.release();
    }
  })
  .catch(error => {
    console.error("❌ PostgreSQL Connection Error:");
    console.error(error);
  });
  import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});