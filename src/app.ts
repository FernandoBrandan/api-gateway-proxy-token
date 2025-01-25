import express from "express";
const app = express();
/****************************************************** */
// middleware 
/****************************************************** */
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
/****************************************************** */
// Rate Limit
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
import cors from "cors";
const corsOptions = {
  origin: process.env.NODE_ENV === "development"
    ? "*"
    : "https://your-production-domain.com",
  methods: ["GET", "POST"],  // Permite solo métodos HTTP específicos
  allowedHeaders: ["Content-Type", "Authorization"],  // Permite solo encabezados específicos  
  credentials: true  // Permite el envío de cookies o credenciales
};
if (process.env.NODE_ENV === "development") {
  console.log("cors !!!!!!!!!!!!!1");
  app.use(cors());
} else {
  app.use(cors(corsOptions));
}
/****************************************************** */
import morgan from "morgan";
process.env.NODE_ENV === "development" ? app?.use(morgan("dev")) : app?.use(morgan("combined"));
/****************************************************** */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
app.get("/api/test3", () => {
  console.log("Test apigateway");
})
/****************************************************** */
// Error Handler
import errorHandler from "./utils/errorHandle";
app?.use(errorHandler);
/****************************************************** */
export default app;
