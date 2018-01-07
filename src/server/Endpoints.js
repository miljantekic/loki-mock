var fs = require('fs');
var _ = require('lodash');
var uuid = require('uuid/v1');
var Endpoint = require('./models/Endpoint');

var Endpoints = {};
var ENDPOINTS_DIR = 'endpoints';

/**
 * @param {Object} config
 * @returns {string} resourcePath
 */
function getResourcePath(config) {
    return config.resourcesPath + ENDPOINTS_DIR
}

/**
 * @param {Object} endpoint
 * @param {Object} config
 * @returns {Endpoint}
 */
Endpoints.createEndpoint = function (endpoint, config) {
    var endpointId = uuid();
    var resourcePath = getResourcePath(config);
    var filename = endpointId + '.json';

    endpoint.id = endpointId;
    endpoint.createdAt = new Date().toISOString();

    fs.writeFileSync(resourcePath + '/' + filename, JSON.stringify(endpoint, null, 2), 'utf8');

    return new Endpoint(endpoint);
};

/**
 * @param {Object} endpointId
 * @param {Object} config
 * @returns {Endpoint}
 */
Endpoints.getEndpoint = function (endpointId, config) {

};

/**
 * @param {Endpoint[]} endpoints
 * @param {string} url
 * @param {string} method
 * @returns {null | Endpoint}
 */
Endpoints.findEndpointWithParams = function (endpoints, url, method) {
    return null;
};

/**
 * @param {string} url
 * @param {string} method
 * @param {object} config
 * @returns {null | Endpoint}
 */
Endpoints.findEndpoint = function (url, method, config) {
    var path = getResourcePath(config);
    var endpointsFiles = fs.readdirSync(path);
    var endpoints = _.map(endpointsFiles, function (endpointFile) {
        return new Endpoint(JSON.parse(fs.readFileSync(path + '/' + endpointFile, 'utf8')));
    });

    var endpoint = _.find(endpoints, {
        url: url,
        method: method
    });

    if (!endpoint) {
        endpoint = Endpoints.findEndpointWithParams(endpoints, url, method);
    }

    if (!endpoint) {
        return null;
    }

    return endpoint;
};

module.exports = Endpoints;