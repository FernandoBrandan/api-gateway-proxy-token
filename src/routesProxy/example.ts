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