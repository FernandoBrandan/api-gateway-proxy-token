import mysql, { ConnectionOptions } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

interface ProxyRoute {
  api: string;
  type: string;
  url: string;
  auth: boolean;
  target: string;
}

const generateRoutesFile = async () => {
  /** */
  const access: ConnectionOptions = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_USER,
    user: process.env.MYSQL_PASSWORD,
    password: process.env.MYSQL_DB,
  };

  let conn;
  try {
    conn = await mysql.createConnection(access);
    const [rows]: [any[], any[]] = await conn.query('SELECT api, type, url, auth, target FROM proxy_routes');

    const routes: ProxyRoute[] = rows.map((result: any) => ({
      api: result.api,
      type: result.type,
      url: result.url,
      auth: result.auth,
      target: result.target,
    }));

    const directoryPath = path.join(__dirname, '/../routesProxy');
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Limpia archivos existentes
    const regex = /Route\.js$/;
    const files = fs.readdirSync(directoryPath).filter(file => regex.test(file));
    files.forEach(file => {
      const fullPath = path.join(directoryPath, file);
      fs.unlinkSync(fullPath);
    });

    // Genera contenido del archivo
    const routesJs = `
          const ROUTES = [
            ${routes
        .map(
          route => `
          {
            url: "${route.url}",
            auth: ${route.auth},
            proxy: {
              target: "${route.target}",
              changeOrigin: true,              
            },
          }`
        )
        .join(',')}
        ];
        export default ROUTES;`;
    // Guarda el archivo generado
    fs.writeFileSync(path.join(directoryPath, 'routes.js'), routesJs, 'utf8');
    console.log('Archivo routes.js generado con éxito.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    conn?.end();
  }
};

export default generateRoutesFile;
