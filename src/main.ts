import "./paths";

import express from "express";
import cors, { CorsOptions } from "cors";

import graphQLRouter from "@routes/graphql";
import playgroundRouter from "@routes/playground";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

const allowedOrigins = ["http://localhost:8000", "http://localhost:5173"];

const options: CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use("/graphql", graphQLRouter);
app.use("/playground", playgroundRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
