// import routesRedis from "./routesRedis";
// import routesOrder from "./routesOrder";
// import routesPayment from "./routesPayment";
// import routesApiLibrary from "./routesApiLibrary";
// import routesApiCars from "./routesApiCars";
// export default [...routesRedis,...routesOrder,...routesPayment,...routesApiLibrary,...routesApiCars];
// 
// 
// const serviceKeys = [
//   'routes/orderService',
//   'routes/payment',
//   'routes/apiCars',
//   'routes/apiLibrary',
//   'routes/redis'
// ];
// 
// let allRoutes: ProxyRoute[] = [];
// 
// for (const key of serviceKeys) {
//   const result = await consul.kv.get(key);
//   if (result?.Value) {
//     const routes = JSON.parse(result.Value.toString());
//     allRoutes = [...allRoutes, ...routes];
//   }
// }


import routes from "./routesExample";
export default [...routes];