import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// connection to the MYSQL database
export const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connect to MYSQL database.");
    connection.release();
  } catch (error) {
    console.error("Error connecting to MYSQL database: ", error.message);
  }
};

export default pool;
