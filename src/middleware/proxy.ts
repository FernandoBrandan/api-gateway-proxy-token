import { Application, Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ClientRequest } from "http"; 
const setupProxies = (app: Application, routes: any[]) => {
  routes.forEach((r) => {
    console.log(`Proxying ${r.url} to ${r.proxy.target}`);
    app.use(r.url, createProxyMiddleware({
      target: r.proxy.target,
      changeOrigin: true,    
      onProxyReq: (proxyReq: ClientRequest, req: Request) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
        proxyReq.setHeader('Authorization', authHeader);
        }
      },
      ...r.proxy, // Agrega todas las opciones de r.proxy
    })
    );
  });
};

export default setupProxies;
