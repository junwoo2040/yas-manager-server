// Path alias setup
import "./paths";

// Express server & CORS config
import express from "express";
import cors, { CorsOptions } from "cors";

// Routers
import graphQLRouter from "@routes/graphql";
import playgroundRouter from "@routes/playground";

// Environment variables
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

// Create new express server
const app = express();

// Create CORS config
const allowedOrigins = ["http://localhost:8000", "http://localhost:5173"];
const options: CorsOptions = {
  origin: allowedOrigins,
};

// Use created CORS policy
app.use(cors(options));

// Add routes
app.use("/graphql", graphQLRouter);
app.use("/playground", playgroundRouter);

// Run server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
