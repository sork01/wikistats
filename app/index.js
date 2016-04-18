'use strict';

require('angular');
require('angular-resource');
require('angular-ui-bootstrap');

var pageViews = require('./services/pageviews.service');

var wikiservices = angular.module('wikiservices', ['ngResource']);
wikiservices.factory('pageViews', ['$resource', pageViews]);

var searchService = require('./services/search.service');
wikiservices.factory('searchService', ['$http', searchService]);

var MainController = require('./controllers/main.controller');
var wikistats = angular.module('wikistats', ['wikiservices', 'ui.bootstrap']);

wikistats.controller('MainController', ['$scope','pageViews', 'searchService', MainController]);

