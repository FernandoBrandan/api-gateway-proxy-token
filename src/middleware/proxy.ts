import { Application } from "express";
import proxy from "express-http-proxy";
import * as fs from "fs";
import * as https from "https";

const setupProxies = async (app: Application, routes: any[]) => {
    const agent = new https.Agent({
        key: fs.readFileSync("src/cert/apigateway.key"), // Clave privada del API Gateway
        cert: fs.readFileSync("src/cert/apigateway.crt"), // Certificado del API Gateway
        ca: fs.readFileSync("src/cert/ca.crt"), // Certificado de la CA
        rejectUnauthorized: true, // Rechazar conexiones no autenticadas
        requestCert: true, // Solicitar certificado al cliente (microservicio)                                 
    });

    routes.forEach((r) => {
        //console.log(`Proxying ${r.url} to ${r.proxy.target}`);
        app.use(
            r.url,
            proxy(r.proxy.target, {
                https: true,
                proxyReqOptDecorator: (proxyReqOpts) => {
                    // Agregamos el agente mTLS
                    proxyReqOpts.agent = agent;
                    return proxyReqOpts;
                },
                proxyReqPathResolver: (req) => {
                    // Reescribimos la ruta, eliminando el prefijo de la URL base
                    const targetPath = req.originalUrl.replace(r.url, "");
                    console.log(`Rewriting path to: ${r.proxy.target}${targetPath}`);
                    return `${r.proxy.target}${targetPath}`;
                },
            })
        );
    });

    console.log("__________________________________________________________________________");
    // Definir un tipo más estricto para el router de Express
    interface RouteLayer {
        route?: {
            path: string;
            methods: { [method: string]: boolean };
        };
        name?: string;
    }
    // Función para imprimir todas las rutas registradas en la aplicación
    const printRoutes = (): void => {
        const stack = (app as any)._router.stack as RouteLayer[];
        //console.log("stack", stack);
        stack.forEach((layer) => {
            if (layer.route) {
                console.log("layer.route", layer.route);

                const { path } = layer.route;
                const methods = Object.keys(layer.route.methods);
                methods.forEach((method) => {
                    console.log(`${method.toUpperCase()} ${path}`);
                });
            }
        });
    };
    // Llamar a la función para imprimir las rutas
    printRoutes();
    console.log("Proxies configured successfully.");
};

export default setupProxies;


/**
 * SIN MTLS 
import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware"; 
const setupProxies = (app: Application, routes: any[]) => {
  routes.forEach((r) => {
    app?.use(r.url, createProxyMiddleware(r.proxy));
  });
};
export default setupProxies;
*/

