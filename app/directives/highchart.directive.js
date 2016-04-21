module.exports = function(chartService)
{
    return {
        restrict: 'E',
        
        link: function(scope, element, attrs)
        {
            function updateChart()
            {
                var series = [];
                var datasets = scope.chartModel.getDatasets();
                
                for (var name in datasets)
                {
                    series.push({animation: false, name: name, data: datasets[name]});
                }
                
                // will running this again and again properly (no leaks) replace the stuff
                // that existed previously? are there more effecient ways to control
                // highcharts? ("restarting" is probably the least efficient way!)
                $(function () { 
                    $(element).highcharts({
                        chart: {
                            type: 'line',
                            animation: true,
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Page Views'
                        },
                        xAxis: {
                            categories: scope.chartModel.getXAxisValues()
                        },
                        yAxis: {
                            title: {
                                text: 'Views'
                            },
                        },
                        series: series
                    });
                });
            }
            
            scope.chartModel = chartService.getChart(attrs.chartName);
            scope.$watch('chartModel', updateChart, true);
        }
    };
};
