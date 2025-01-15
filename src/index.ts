/** Inicio de aplicacion */
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
let port = process.env.PORT || 3000;
// Sin mtls
// app.listen(port, () => {
//   console.log(`Server listen on port http://localhost:${port}`);
// });

/**
 * ********************************************************************************************************************
 * Configuración de servidor con certificados
 * ********************************************************************************************************************
 */
import fs from 'fs';
import https from 'https';
const options = {
    key: fs.readFileSync('src/cert/apigateway.key'), // Clave privada del API Gateway
    cert: fs.readFileSync('src/cert/apigateway.crt'), // Certificado del API Gateway
    ca: fs.readFileSync('src/cert/ca.crt'), // Certificado de la CA
    requestCert: false, // Solicitar certificado al cliente (microservicio)
    rejectUnauthorized: false, // Rechazar conexiones no autenticadas
};

https.createServer(options, app).listen(port, () => {
    console.log(`Server listen on port https://localhost:${port}`);
});

