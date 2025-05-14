import fs from 'fs';
import path from 'path';
import Consul from 'consul';

interface ProxyRoute {
  url: string;
  auth: boolean;
  target: string;
}

const generateRoutesFileFromConsul = async () => {
  const consul = new Consul({ host: process.env.CONSUL_HOST || 'localhost' });

  try {
    // Lee la clave KV (ajustar si guardás por microservicio)
    const result = await consul.kv.get('routes/gateway');
    if (!result || !result.Value) {
      throw new Error('No se encontraron rutas en Consul');
    }

    const routes: ProxyRoute[] = JSON.parse(result.Value.toString());

    const directoryPath = path.join(__dirname, '/../routesProxy');
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Limpia archivos existentes
    const regex = /Route\.js$/;
    const files = fs.readdirSync(directoryPath).filter(file => regex.test(file));
    files.forEach(file => fs.unlinkSync(path.join(directoryPath, file)));

    // Genera archivo como antes
    const routesJs = `
      const ROUTES = [
        ${routes.map(route => `
        {
          url: "${route.url}",
          auth: ${route.auth},
          proxy: {
            target: "${route.target}",
            changeOrigin: true
          }
        }`).join(',')}
      ];
      export default ROUTES;`;

    fs.writeFileSync(path.join(directoryPath, 'routes.js'), routesJs, 'utf8');
    console.log('Archivo routes.js generado desde Consul con éxito.');
  } catch (error) {
    console.error('Error generando routes.js desde Consul:', error);
  }
};

export default generateRoutesFileFromConsul;
