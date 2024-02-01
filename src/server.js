import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./configs/database.js";
dotenv.config();

/**
 * MYSQL connection
 */
connectDatabase();

let PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

/**
 * Server error, shut it down
 */
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
