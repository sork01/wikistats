var pageviewChartModel = require('../models/pageviewchart.model');

module.exports = function($scope, pageViews, searchService, chartService, $http, $translate) {

    chart = chartService.createChart('myChart', new pageviewChartModel());
    $scope.dateFrom = new Date(Date.parse("2016-01-01"));
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    $scope.dateTo = yesterday;
    chart.getModel().setDateRange($scope.dateFrom, $scope.dateTo);

    function reloadAll() {
        chart.getModel().clearDatasets();
        chart.getModel().setDateRange($scope.dateFrom, $scope.dateTo);
        angular.forEach($scope.articles, function (val, key) {
            val.refresh(val, new Date($scope.dateFrom), new Date($scope.dateTo),
                function(result){
                    chart.getModel().addDataset(result.name + '//lang:' + result.language, result.views);
                }
            );
        });
    }

    // redefine chartmodel function to format names of chart data series
    chart.getModel().getDisplayName = function(name) {
        // "name" is the name we gave when we did model.addDataset
        var stuff = name.match(/^([^\/]+)(\/\/lang:([^\s]+))?/);
        
        if ($scope.activeLanguagesInChart.size > 1) {
            return stuff[1] + ' (' + stuff[3] + ')';
        }
        else {
            return stuff[1];
        }
    };

    $scope.activeLanguagesInChart = new Set();
    $scope.articles = [];

    $scope.search = {
        str: "",
        list: [] 
    };
    
    $scope.removeArticle = function(article) {
        if(article === undefined) return;
        var idx = $scope.articles.indexOf(article);
        $scope.articles.splice(idx, 1);
        chart.getModel().removeDataset(article.name + '//lang:' + article.language);
        //reloadAll(); //TODO: Don't redraw the full chart 
    };

    $scope.chart = {
        selected: 'line'
    };
    
    $scope.$watch('chart.selected', function() {
        chart.setType($scope.chart.selected);
    });
    
    $scope.dateToStr = function(date) {
        var day = date.getDate() + '';
        var month = date.getMonth() + 1 + '';
        var year = date.getFullYear() + '';
        month = month < 10 ? '0' + month: month;
        day = day < 10 ? '0' + day: day;
        return year+month+day;
    };
    
    $scope.addNewArticle = function (name) {
        var is_multilang = ($scope.activeLanguagesInChart.size > 1);

        var article = pageViews.query({
            project:    $scope.chosen.lang.wiki + '.' + $scope.chosen.proj.namespace,
            projname:   $scope.chosen.proj.proj,
            lang:       $scope.chosen.lang.local,
            article:    name,
            fromStr:       $scope.dateToStr($scope.dateFrom),
            fromDate:      new Date($scope.dateFrom.getTime()),
            toStr:         $scope.dateToStr(new Date($scope.dateTo.getTime()+1)),
            toDate:        new Date($scope.dateTo.getTime() + 1)
        }, function(result) {
            $scope.activeLanguagesInChart.add(result.language);

            if (!is_multilang && $scope.activeLanguagesInChart.size == 2) {
                reloadAll();
            }
            else {
                chart.getModel().addDataset(result.name + '//lang:' + result.language, result.views);
            }
        });
        $scope.articles.push(article);

        $scope.search = {
            str: "",
            list: [] 
        };
    };
    $scope.chosen = {};
   
    $http.get('projects.json').then(function (res) {
        $scope.projects = res.data.projects;
        $scope.chosen.proj = res.data.projects[0];
        $scope.chosen.lang = res.data.projects[0].languages[0];
    });
    
    $scope.changeChosen = function(name, dropdown) {
        $scope.chosen[dropdown] = name;
    };

    $scope.searchArticle = function (searchstr) {
        return searchService.query({
            namespace: $scope.chosen.lang.wiki + '.' + $scope.chosen.proj.namespace,
            str: searchstr
        }).then(function(response) {
            return response.data.url;
        });
    };

    $scope.exportgraph = function(mime) {
        console.log(mime);
        if(!mime) return;
        chart.getModel().exportgraph(mime); 
    };
    // DATEPICKER
    // TODO: Move everything related to bottom bar date pickers
    // to separate controller
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.openFrom = function() {
        $scope.popupFrom.opened = true;
    };

    $scope.openTo = function() {
        $scope.popupTo.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popupFrom = {
        opened: false
    };

    $scope.popupTo = {
        opened: false
    };


    $scope.$watch('dateFrom', reloadAll);
    $scope.$watch('dateTo', reloadAll);

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.languages = [{
            "name": "English (US)",
            "code": "en-US"
        }, {
            "name": "Français (FR)",
            "code": "fr-FR"
        }, {
            "name": "Italiano",
            "code": "it-IT"
        }, {
            "name": "日本語",
            "code": "ja-JP"
        }, {
            "name": "Polski",
            "code": "pl-PL"
        }, {
            "name": "Português (BR)",
            "code": "pt-BR"
        }, {
            "name": "Svenska",
            "code": "sv-SE",
        }
    ];

    $scope.changeLanguage = function(langCode) {
        $translate.use(langCode);
    };
};
