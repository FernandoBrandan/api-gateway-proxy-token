import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
import "./eureka-client"; 
import { getConfig } from "./getConfig";

(async () => {
  const config = await getConfig("books");
  const port = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : config.port;

  app.listen(port, () => {
    console.log(`Gateway - Server listening on http://localhost:${port}`);
  });
})();
