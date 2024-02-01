import express from "express";
import dotenv from "dotenv";
import pool from "./configs/database.js";

const app = express();
app.use(express.json());

const getAllEmployees = async () => {
  try {
    console.log("hi");
    const [rows] = await pool.query("SELECT * FROM employee");
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  }
};

app.get("/", async (req, res) => {
  const employees = await getAllEmployees();
  res.status(200).json({ status: "success", employees });
});

export default app;
