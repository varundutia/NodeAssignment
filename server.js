const express = require('express');
const Route = require('./Routes/server.route');

//Express Application
const app = express();
app.use(Route);

// Server started at port 3000 
app.listen(3000);