//import apiBookProductRoute from "./apiBookProductRoute";
//import apiCarsProductRoute from "./apiCarsProductRoute";
// export default [...apiBookProductRoute, ...apiCarsProductRoute];

import fs from 'fs';
import path from 'path';

import generateRoutesFile from "../middleware/createRoutesProxy";

let routes: any[] = [];

const validateFile = (): boolean => {
    const regex = /routes\.js$/;
    const directoryPath = __dirname + '/../routesProxy';
    if (!fs.existsSync(directoryPath)) return true;
    const files = fs.readdirSync(directoryPath);
    const matchedFiles = files.filter(file => regex.test(file));
    return matchedFiles.length === 0;
};

const getroutes = () => {
    if (validateFile()) {
        generateRoutesFile()
    }
    const routesDirectory = __dirname
    const files = fs.readdirSync(routesDirectory);
    const routeFiles = files.filter(file => file.endsWith('routes.js'));
    routeFiles.forEach((file) => {
        const modulePath = path.join(routesDirectory, file);
        const routeModule = require(modulePath);
        const routesFromModule = routeModule.default || routeModule;
        if (!Array.isArray(routesFromModule)) {
            // Si no es un array, crea uno a partir de los valores
            routes = [...routes, routesFromModule];
        } else {
            routes = [...routes, ...routesFromModule];
        }
    });    
}
getroutes();

export default routes;


// import routes from "./routes";
// export default [...routes];