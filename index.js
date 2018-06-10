const http = require('http');
const express = require('express');
const database = require('./database/index');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const route = require('./route/route');

const app = express();
database();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'X-Requested-With,content-type,x-access-token'
//     );
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

route(app);

const port = process.env.PORT || 3002;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Node api is runnig on port ${port}`);
});
