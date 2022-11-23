const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        proxy.createProxyMiddleware({
            target:'https://api.hangang.msub.kr/',
            changeOrigin: true,
            pathRewrite:{
                '^/api' : ''
            }
        })
    )
}