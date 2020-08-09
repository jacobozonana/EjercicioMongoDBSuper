require('./utils/db');
const express = require('express');
const { config } = require('./config');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use(require ('./routes/ProductsRoutes'))
app.use(require ('./routes/TicketsRoutes'))

app.listen(config.port, ()=>{
    console.log(`Express UP Listening on port: ${config.port}`)
})