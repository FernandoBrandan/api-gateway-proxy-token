import express from "express";
const app = express();
/****************************************************** */
// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
import helmet from "helmet";
app.use(helmet(
  {
    dnsPrefetchControl: false,
    contentSecurityPolicy: false,
    hsts: false,
    frameguard: false,
    //frameguard: { action: "deny" },
    referrerPolicy: false,
  }
));
import morgan from "morgan";
process.env.NODE_ENV === "development" ? app?.use(morgan("dev")) : app?.use(morgan("combined"));
import cors from "cors";
const corsOptions = { origin: process.env.NODE_ENV === "development" ? "*" : "https://your-production-domain.com" };
process.env.NODE_ENV === "development" ? app?.use(cors()) : app.use(cors(corsOptions));
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
  statusCode: 429,
});
app.use(limiter);
/****************************************************** */
// Auth, Proxy
import routes from "./routesProxy/index";
import setupAuth from "./middleware/auth";
setupAuth(app, routes);
import proxyRoutes from "./middleware/proxy";
proxyRoutes(app, routes);

/****************************************************** */
// Routes
import authRoutes from "./routes/authRoute";
app.use("/api/auth", authRoutes);
//routes
import userRoutes from "./routes/userRoute";
app.use("/api/users", userRoutes);
/****************************************************** */
// PRUEBA 
app.get("/api/test2", () => {
  // curl -k --cert apigateway.crt --key apigateway.key http://localhost:5000/api/test
  console.log("Test apigateway");
})
/****************************************************** */
// Error Handler
import errorHandler from "./utils/errorHandle";
app?.use(errorHandler);
/****************************************************** */
export default app;
