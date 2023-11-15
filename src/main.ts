import "./setup";

// Express server & CORS config
import express from "express";
import cors, { CorsOptions } from "cors";

// GraphQL Yoga
import { createYoga } from "graphql-yoga";

// Schema
import { schema } from "@models/schema";

// Constants
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:8000", "http://localhost:5173"];

// Create new express server
const app = express();

// Create CORS config
const options: CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

// Create GraphQL Yoga
const yoga = createYoga({ schema });

// Add routes
app.use(yoga.graphqlEndpoint, yoga);

// Run server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
