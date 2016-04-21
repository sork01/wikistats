'use struct';

require('jquery');
require('angular');
require('angular-resource');

var pageviewChartModel = require('./pageviewchartmodel');

var pageViews = require('./services/pageviews.service');
var wikiservices = angular.module('wikiservices', ['ngResource']);
wikiservices.factory('pageViews', ['$resource', pageViews]);

var MainController = require('./controllers/main.controller');
var wikistats = angular.module('wikistats', ['wikiservices']);

var chartService = require('./services/chart.service');
var highchartDirective = require('./directives/highchart.directive');
wikistats.service('chartService', chartService);
wikistats.directive('highchart', ['chartService', highchartDirective]);

wikistats.controller('MainController', ['$scope','pageViews', MainController]);
wikistats.controller('myChartController', ['chartService', function(chartService)
{
    var chart = chartService.createChart('myChart', new pageviewChartModel());
    chart.addDataset('Prime Numbers', [2,3,5,7,11,13,17]);
}]);
