'use strict';

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config');
var commonUtils = require('common-api-utils');

var initialize = commonUtils.initialize;

var app = express();



/**
 * @SwaggerHeader
 * info:
 *   title: Portfolio Tracker API
 *   version: 1.0.0
 *   description: Manage and Track Financial Portfolio
 * basePath: /pt/api
 */

app.use(initialize.handle); // initialize res.locals object

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// ------------- add routes here
var stocks = require('./routes/stocks');
app.use(config.baseUri + '/stocks', stocks);


// Swagger
app.use(config.baseUri + '/docs', express.static('./public/swagger'));



module.exports = app;
