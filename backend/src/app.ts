import express, { Response, NextFunction } from "express";
import { json } from "body-parser";
import authRoutes from "./modules/auth/auth.route";
import profileRoutes from "./modules/profile/profile.route";
import pinRoutes from "./modules/pin/pin.route";

import cors = require("cors");

const PORT = 3000;

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/pins", pinRoutes);
app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
