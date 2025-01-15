/**
 * Ejemplo de categorias 
 */

const ROUTES = [
  {
    url: "/api/categories",
    auth: true,
    creditCheck: false,
    proxy: {
      target: "http://product-service:3001/api/categories/",
      changeOrigin: true,
      pathRewrite: {
        [`^/api/categories`]: "",
      },
    },
  },
  {
    url: "/api/categories/:categoryId",
    auth: false,
    creditCheck: false,
    proxy: {
      target: "http://product-service:3001/api/categories/:categoryId",
      changeOrigin: true,
      pathRewrite: {
        [`^/api/categories/:id`]: "",
      },
    },
  },
];

export default ROUTES;

 /**
  * Ejemplo de productos 
  */

 /**
 const ROUTES = [
  {
    url: "/free",
    auth: false,
    creditCheck: false, 
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/free`]: "",
      },
    },
  },
  {
    url: "/premium",
    auth: true,
    creditCheck: true,
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: "",
      },
    },
  },
];

export default ROUTES;
 */