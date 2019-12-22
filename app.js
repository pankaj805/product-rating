import express from 'express';
import bodyParser from 'body-parser';
import { MongoHelper } from 'pkmongo';
import config from 'config';

import user from './routes/user';
import product from './routes/product';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

MongoHelper.initialize(`mongodb://${config.mongo.dbuser}:${config.mongo.dbpassword}@${config.mongo.connectionHost}/${config.mongo.dbname}`);

// Health Check
app.get('/', (req, res, next) => {
    res.data = {
        'text': 'Hello World!'
    };
    next();
})

// routes are injected here
app.use('/user', user);
app.use('/product', product);


// response Success Handler
app.use((req, res, next) => {
    if (!res.data) {
        res.status(404).send({
            status: false,
            response: '404 Not Found!'
        });
        return;
    }
    res.status(res.statusCode || 200).send({
        status: true,
        response: res.data
    });
});

// response Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 400).send({
        status: false,
        error: {
            code: (err.code || 1000),
            reason: err.message
        }
    });
});

module.exports = app;