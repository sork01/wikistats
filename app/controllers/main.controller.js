var pageviewChartModel = require('../models/pageviewchart.model');

module.exports = function($scope, pageViews, searchService, chartService) {

    chart = chartService.createChart('myChart', new pageviewChartModel());

    chart.setDateRange(
        new Date(Date.parse("2016-01-01")), 
        new Date(Date.parse("2016-04-01"))
    );

    $scope.groups = [];

    $scope.search = {
        str: "",
        list: [] 
    };
    
    $scope.chart = {
        selected: "Line"
    };
    
    $scope.addNewArticle = function (name) {
        pageViews.query({
            project:    "sv.wikipedia",
            article:    name,
            from:       "20160101",
            to:         "20160401",
        }).$promise.then(function(result) {
            result.article.name = name;
            $scope.groups.push({
                articles:[result.article],
                name: name
            });
            chart.addDataset(name, result.article.views);

        });

        $scope.search = {
            str: "",
            list: [] 
        };
     
    };

    $scope.projects = [ // TODO: Proper externalization and language checking
        {name: "Wikipedia",     url: "$lang$.wikipedia",    multilang: true},
        {name: "Wikiversity",   url: "$lang$.wikiversity",  multilang: true},
        {name: "Wikisource",    url: "$lang$.wikisource",   multilang: true},
        {name: "Wikinews",      url: "$lang$.wikinews",     multilang: true},
        {name: "Wikibooks",     url: "$lang$.wikibooks",    multilang: true},
        {name: "Wikiquote",     url: "$lang$.wikiquote",    multilang: true},
        {name: "Wikispecies",   url: "species.wikimedia",   multilang: false},
        {name: "Wikivoyage",    url: "$lang$.wikivoyage",   multilang: true},
        {name: "Wikidata",      url: "www.wikidata",        multilang: false},
        {name: "Wikicommons",   url: "commons.wikimedia",   multilang: false},
        {name: "Metawiki",      url: "meta.wikimedia",      multilang: false}
    ];

    $scope.chosen = { 
        proj: $scope.projects[0].name,
        lang: "Svenska"
    };
    
    $scope.changeChosen = function(name, dropdown){
        $scope.chosen[dropdown] = name;
    };

    $scope.$watch('search.str.length', function () {
        var searchstr = $scope.search.str;
        if(searchstr.length <= 0) {
            $scope.search.list = [];
            return;
        }
        searchService.query({
            namespace: 'sv.wikipedia', //TODO
            str: searchstr
        }).then(function(data) {
            if($scope.search.str == searchstr)
                $scope.search.list = data.data;
        });
    });

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
};
