import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT || 3000}`
  )
);
