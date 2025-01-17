import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const setupProxies = (app: Application, routes: any[]) => {
  routes.forEach((r) => {
    console.log(`Proxying ${r.url} to ${r.proxy.target}`);
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};

export default setupProxies;
