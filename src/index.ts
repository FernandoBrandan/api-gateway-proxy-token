/** Inicio de aplicacion */
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
let port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`apigateway - Server listen on port http://localhost:${port}`);
});
