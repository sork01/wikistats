module.exports = function($resource) {
    var URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' +
               ':project/all-access/user/:article/daily/:fromStr/:toStr';

    function dateToStr(date) {
        var day = date.getDate() + '';
        var month = date.getMonth() + 1 + '';
        var year = date.getFullYear() + '';
        month = month < 10 ? '0' + month: month;
        day = day < 10 ? '0' + day: day;
        return year+month+day;
    }
    
    return {
        query: function(input, thenfun) {
            var pure = {};
            angular.copy(input, pure);

            delete pure.projname;
            delete pure.lang;
            delete pure.fromDate;
            delete pure.toDate;
            var art = { //Maybe its time to create a separate file for Articles
                name:       input.article,
                project:    input.projname, 
                language:   input.lang,
                fromdate:   input.fromStr + '00', 
                todate:     input.toStr + '00', 
                link:       'https://' + input.project + '.org/wiki/' + input.article,
                total:      0,
                views:      [],
                refresh: function(article, datefrom, dateto, callback) {
                    pure.fromStr = dateToStr(datefrom) + '00';
                    pure.todate = dateToStr(dateto) + '00';
                    $resource(URL, {}, {
                        query: {
                            method: 'GET',
                            isArray: false,
                            transformResponse: function(data, headers) {
                                var obj = angular.fromJson(data);
                                article.fromdate = obj.items[0].timestamp;
                                article.todate = obj.items[obj.items.length -1].timestamp;
                                article.views = [];
                                article.total = 0;
                                var j = 0;

                                for(var i = datefrom; i <= dateto; i.setDate(i.getDate() + 1)) {
                                    if(obj.items[j].timestamp == dateToStr(i) + '00') {
                                        article.views.push(obj.items[j].views);
                                        article.total += obj.items[j].views;
                                        j++;
                                    }
                                    else {
                                        article.views.push(0);
                                    }
                                }

                                return article; 
                            }    
                        }
                    }).query(pure).$promise.then(callback);

                }
            };
            art.refresh(art, input.fromDate, input.toDate, thenfun);
            return art;
        }
    };
};
