/** Inicio de aplicacion */
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listen on port http://localhost:${port}`);
});
