//// filepath: /home/jsierra/projects/pictor-98/src/app.ts
import express from "express";
import path from "path";
import apodRoutes from "./routes/apodRoutes.js";
import logger from "./middleware/logger.js";
import { getLocalIpAddress } from "./utils/networkUtils.js";
import { methodOverrideMiddleware } from "./middleware/methodOverride.js";

const app = express();

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(methodOverrideMiddleware);
app.use(express.static(path.join(process.cwd(), "public")));

// Routes
app.use("/", apodRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  const ipAddress = getLocalIpAddress();
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Access the server from another computer at http://${ipAddress}:${PORT}`
  );
});
