'use strict';

require('jquery');
require('angular');
require('angular-resource');
require('angular-ui-bootstrap');
require('angular-animate');


var pageViews = require('./services/pageviews.service');

var wikiservices = angular.module('wikiservices', ['ngResource']);
wikiservices.factory('pageViews', ['$resource', pageViews]);

var searchService = require('./services/search.service');
wikiservices.factory('searchService', ['$http', searchService]);

var MainController = require('./controllers/main.controller');
var wikistats = angular.module('wikistats', ['ngAnimate', 'wikiservices', 'ui.bootstrap']);

var chartService = require('./services/chart.service');
var highchartDirective = require('./directives/highchart.directive');
wikistats.service('chartService', chartService);
wikistats.directive('highchart', ['chartService', highchartDirective]);

wikistats.controller('MainController', ['$scope','pageViews', 'searchService', 'chartService', MainController]);
