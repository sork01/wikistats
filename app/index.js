'use strict';

require('angular');
require('angular-resource');

var pageViews = require('./services/pageviews.service');
var langLinks = require('./services/langlinks.service');

var wikiservices = angular.module('wikiservices', ['ngResource']);
wikiservices.factory('pageViews', ['$resource', pageViews]);
wikiservices.factory('langLinks', ['$resource', langLinks]);

var MainController = require('./controllers/main.controller');
var wikistats = angular.module('wikistats', ['wikiservices']);

wikistats.controller('MainController', ['$scope','pageViews', 'langLinks', MainController]);
