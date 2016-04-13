'use struct';

require('angular');
require('angular-resource');

var pageViews = require('./services/pageviews.service');
var wikiservices = angular.module('wikiservices', ['ngResource']);
wikiservices.factory('pageViews', ['$resource', pageViews]);

var MainController = require('./controllers/main.controller');
var wikistats = angular.module('wikistats', ['wikiservices']);

wikistats.controller('MainController', ['$scope','pageViews', MainController]);


