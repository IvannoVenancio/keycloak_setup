import express from "express";

import authRoutes from "./routes/auth.routes.ts";
import cors from "cors";

const app = express();



app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());

app.use(authRoutes);

export default app;