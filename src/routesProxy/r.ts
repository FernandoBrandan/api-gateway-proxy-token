const ROUTES = [
    {
        url: "/api/order/",
        auth: 0,
        proxy: {
            target: "http://order-service-1:5001/api/order",
            changeOrigin: true,
        },
    },
    {
        url: "/api/order/:id",
        auth: 0,
        proxy: {
            target: "http://order-service-1:5001/api/order/:id",
            changeOrigin: true,
        },
    }
];

export default ROUTES;