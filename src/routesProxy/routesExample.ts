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
    },
    {
        url: "/api/library/books",
        auth: false,
        proxy: {

            target: "http://api-books-1:4001/api/library/books",
            changeOrigin: true,
        }
    },
    {
        url: "/api/library/books/:id",
        auth: false,
        proxy: {

            target: "http://api-books-1:4001/api/library/books/:id",
            changeOrigin: true,
        }
    },
    {
        url: "/api/library/authors",
        auth: false,
        proxy: {

            target: "http://api-books-1:4001/api/library/authors",
            changeOrigin: true,
        }
    },
    {
        url: "/api/library/authors/:id",
        auth: false,
        proxy: {

            target: "http://api-books-1:4001/api/library/authors/:id",
            changeOrigin: true,
        }
    },
    {
        url: "/api/library/categories",
        auth: false,
        proxy: {

            target: "http://api-books-1:4001/api/library/categories",
            changeOrigin: true,
        }
    },
    {
        url: "/api/library/categories/:id",
        auth: false,
        proxy: {

            target: "http://api-books-1:4001/api/library/categories/:id",
            changeOrigin: true,
        }
    }
];

export default ROUTES;
