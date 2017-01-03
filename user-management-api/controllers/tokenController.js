'use strict';

var  commonUtils = require('common-api-utils'),
     responseHandler = commonUtils.auditableResponseHandler,
     config       = require('../config/config'),
     Q = require('q'),
     path = require('path');

var service = new  commonUtils.DataService(path.join(__dirname, '../models'),'user', 'User');
var tokenService = new  commonUtils.JWTTokenService(config['jwt']);
var domainName = 'Token';

/**
  * @SwaggerDefinitions
  *   Token:
  *     type: object
  *     properties:
  *       token:
  *         type: string
  *       username:
  *         type: string
  */

/**
 * @SwaggerDefinitions
 *   TokenResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Token"
 */

/**
 * @SwaggerDefinitions
 *   TokenRequest:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       userPassword:
 *         type: string
 */

/**
 * @SwaggerPath
 *   /tokens:
 *     get:
 *       summary: Get Token
 *       description: Get token for a given user credential
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: username
 *           in: query
 *           description: username
 *           required: true
 *           type : string
 *         - name: userPassword
 *           in: query
 *           description: password
 *           required: true
 *           type : string
 *       tags:
 *         - Tokens
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/TokenResponse"
 */
module.exports.tokenGet = function(req, res, next) {
  var passwd = req.query.userPassword;
  service.get({'username' : req.query.username})
    .then( function(data) {
        return tokenService.authenticate(data, passwd);
    }).then(function(data) {
      var responseData = { token : data, username: req.query.username};
      res.locals.message = 'authenticated successfully';
      responseHandler.handleSuccess(req, res, next, responseData, domainName);
    }).fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};


/**
 * @SwaggerPath
 *   /tokens:
 *     post:
 *       summary: Get token
 *       description: Get token for a given user credential
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: userCredential
 *           in: body
 *           description: user credential
 *           required: true
 *           schema:
 *             $ref: "#/definitions/TokenRequest"
 *       tags:
 *         - Tokens
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/TokenResponse"
 *         400:
 *           description: user Validation Error.
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.tokenPost = function(req, res, next) {
  var passwd = req.body.userPassword;
  service.get({'username' : req.body.username})
    .then( function(data) {
        return tokenService.authenticate(data, passwd);
    }).then(function(data) {
      var responseData = { token : data, username: req.body.username};
      res.locals.message = 'authenticated successfully';
      responseHandler.handleSuccess(req, res, next, responseData, domainName);
    }).fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};
