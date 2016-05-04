module.exports = function(chartService)
{
    return {
        restrict: 'E',
        scope: {}, // isolate scope
        link: function(scope, element, attrs)
        {
            // var seriesAdapterInterface = {
                // type: 'string' // passed to highcharts as chart type,
                // init: function(chart); // initialize the chart
                // add: function(chart, datasets, name); // add a data series to the chart
                // setXAxis: function(chart); // configure the x-axis
            // };
            
            var lineSeriesAdapter = {
                type: 'line',
                
                init: function(chart)
                {
                    chart.xAxis[0].setCategories(scope.chartModel.getXAxisValues());
                },
                
                add: function(chart, datasets, name)
                {
                    chart.addSeries({
                        name: name,
                        data: datasets[name]
                    });
                },
                
                setXAxis: function(chart)
                {
                    chart.xAxis[0].setCategories(scope.chartModel.getXAxisValues());
                }
            };
            
            var pieSeriesAdapter = {
                type: 'pie',
                
                init: function(chart)
                {
                    chart.xAxis[0].setCategories([]);
                    chart.addSeries({name: 'Total Views', data: []});
                },
                
                add: function(chart, datasets, name)
                {
                    chart.series[0].addPoint({
                        name: name,
                        y: datasets[name].reduce(function(a, b) { return a + b; }, 0)
                    });
                },
                
                setXAxis: function(chart) { }
            };
            
            var columnSeriesAdapter = {
                type: 'column',
                
                init: function(chart)
                {
                    chart.xAxis[0].setCategories([]);
                    chart.addSeries({name: 'Total Views'});
                },
                
                add: function(chart, datasets, name)
                {
                    console.log(name);
                    chart.series[0].addPoint({
                        name: name,
                        y: datasets[name].reduce(function(a, b) { return a + b; }, 0)
                    });
                },
                
                setXAxis: function(chart) { }
            };
            
            scope.chart = chartService.getChart(attrs.chartName);
            scope.chartModel = chart.getModel();
            
            if (attrs.chartType == 'pie')
            {
                scope.chart.setType('pie');
                scope.chartSeriesAdapter = pieSeriesAdapter;
            }
            else if (attrs.chartType == 'column')
            {
                scope.chart.setType('column');
                scope.chartSeriesAdapter = columnSeriesAdapter;
            }
            else
            {
                scope.chart.setType('line');
                scope.chartSeriesAdapter = lineSeriesAdapter;
            }
            
            $(function ()
            {
                var initchart = function()
                {
                    $(element).highcharts({
                        chart: {
                            type: scope.chartSeriesAdapter.type,
                            animation: true
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    format: '{point.name}: {point.percentage:.1f} %'
                                }
                            }
                        },
                        title: {
                            text: 'Page Views'
                        },
                        xAxis: {}, // configured a bit later by chartSeriesAdapter.init
                        yAxis: {
                            title: {
                                text: 'Views'
                            }
                        },

                        exporting: {
                            buttons: {
                                contextButton: {
                                    enabled: false
                                }
                            },
                            fallbackToExportServer: false
                        }
                        // series: configured a bit later by chartSeriesAdapter.init/add
                    });
                    
                    var chart = $(element).highcharts();
                    var datasets = scope.chartModel.getDatasets();
                    var setnames = Object.keys(datasets);
                    
                    scope.chartSeriesAdapter.init(chart);
                    
                    for (var i in setnames)
                    {
                        scope.chartSeriesAdapter.add(chart, datasets, setnames[i]);
                    }
                };
                
                initchart();
                
                scope.chartModel.addEventListener('datasetadded', function(name)
                {
                    scope.chartSeriesAdapter.add($(element).highcharts(), scope.chartModel.getDatasets(), name);
                });

                scope.chartModel.addEventListener('exportclicked', function(mime) {
                    var chart = $(element).highcharts();
                    console.log(mime);
                    if(!mime) return;
                    if(mime === 'print') 
                    { 
                        chart.print();
                    }
                    else if (mime === 'image/svg+xml' || mime === 'application/pdf')
                    {
                        chart.exportChartLocal({
                            type: mime,
                            filename: 'chart',
                            //width: 1280,
                            sourceWidth: 1280,
                            sourceHeight: 720
                        });
                    }
                });
                
                scope.chartModel.addEventListener('daterangechanged', function()
                {
                    console.log('date change');
                    scope.chartSeriesAdapter.setXAxis($(element).highcharts());
                    initchart();
                });
                
                scope.$watch('chart.getType()', function(type)
                {
                    if (type == 'pie')
                    {
                        scope.chartSeriesAdapter = pieSeriesAdapter;
                    }
                    else if (type == 'column')
                    {
                        scope.chartSeriesAdapter = columnSeriesAdapter;
                    }
                    else
                    {
                        scope.chartSeriesAdapter = lineSeriesAdapter;
                    }
                    
                    initchart();
                });
            });
        }
    };
};
