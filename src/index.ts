import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
//let port = process.env.PORT || 3001;

import { VercelRequest, VercelResponse } from "@vercel/node";
// Adaptar Express a serverless:
export default (req: VercelRequest, res: VercelResponse) => {
    return app(req, res);
};

//app.listen(port, () => {
//    console.log(`apigateway - Server listen on port http://localhost:${port}`);
//});

