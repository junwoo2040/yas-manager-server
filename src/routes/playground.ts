import { Router } from "express";
import expressPlayground from "graphql-playground-middleware-express";

let router = Router();
router.get("/", expressPlayground({ endpoint: "http://localhost:8000/graphql" }));

export default router;
