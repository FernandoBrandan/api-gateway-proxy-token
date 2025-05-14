import { Application, Request, Response } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { ClientRequest } from "http";

const simpleRequestLogger = (proxyServer: { on: Function }, _options: Options) => {
  proxyServer.on('proxyReq', (proxyReq: ClientRequest, req: Request, _res: Response) => {
    if (req.body && Object.keys(req.body).length) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  });
};

type ProxyRoute = {
  url: string;
  proxy: Options;
};

const setupProxies = (app: Application, routes: ProxyRoute[]) => {
  routes.forEach((r) => {
    console.log(`Proxying ${r.url} to ${r.proxy.target}`);
    app.use(
      r.url,
      createProxyMiddleware({
        target: r.proxy.target,
        changeOrigin: true,
        plugins: [simpleRequestLogger],
        ...r.proxy,
      })
    );
  });
};

export default setupProxies;
