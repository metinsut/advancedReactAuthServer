const http = require("http");
const express = require("express");
const passport = require("passport");
const database = require("./database/index");
const morgan = require("morgan");
const route = require("./route/route");
const cors = require("cors");
const optionsCors = require("./helpers/cors");

const app = express();
database();

app.use(morgan("tiny"));
app.use(cors(optionsCors));
app.use(express.json());
app.use(passport.initialize());

route(app);

const port = process.env.PORT || 3002;

const server = http.createServer(app);

server.listen(port, () => {
   console.log(`Node api is runnig on port ${port}`);
});
