const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = require('./db/connect');
mongoConnect();

const router = require('./router/router');

app.use(express.static('../client'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(router);



app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
});