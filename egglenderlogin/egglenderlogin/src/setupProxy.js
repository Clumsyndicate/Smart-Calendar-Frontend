// const express = require('express');
const proxy = require('http-proxy-middleware');
 
// const app = express();
 
module.exports = app => {
    app.use('/api',
        proxy({
        target: 'http://localhost:5000',
        changeOrigin: true,
      }))
  }
