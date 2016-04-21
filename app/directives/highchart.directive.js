module.exports = function(chartService)
{
    return {
        restrict: 'E',
        
        link: function(scope, element, attrs)
        {
            scope.chartModel = chartService.getChart(attrs.chartName);
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
                        series: []
                    });
            });

            function addSeries() {
                var set = scope.chartModel.getLatest();
                var chart = $(element).highcharts();
                if(set == null) {
                    while(chart.series.length > 0)
                        chart.series[0].remove(true);
                    return;
                }
                chart.addSeries({
                    data: set.values,
                    name: set.name
                });
                chart.xAxis[0].setCategories( scope.chartModel.getXAxisValues());

            }
            
            scope.chartModel = chartService.getChart(attrs.chartName);
            scope.$watch('chartModel', addSeries, true);
        }
    };
};
