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
        query: function(input) {
            var pure = {};
            angular.copy(input, pure);

            delete pure.projname;
            delete pure.lang;
            delete pure.fromDate;
            delete pure.toDate;

            return $resource(URL, {}, {
                query: {
                    method: 'GET',
                    isArray: false,
                    transformResponse: function(data, headers) {
                        var obj     = angular.fromJson(data);
                        var name    = obj.items[0].article;
                        var proj    = obj.items[0].project;
                        var from    = obj.items[0].timestamp;
                        var to      = obj.items[obj.items.length -1].timestamp;
                        var total   = 0;
                        var v = [];
                        var j = 0;
                        
                        for(var i = input.fromDate; i <= input.toDate; i.setDate(i.getDate() + 1)) {
                            if(obj.items[j].timestamp == dateToStr(i) + '00') {
                                v.push(obj.items[j].views);
                                total += obj.items[j].views;
                                j++;
                            }
                            else {
                                v.push(0);
                            }
                        }

                        return { article: {
                            name:       name, 
                            project:    input.projname, 
                            language:   input.lang,
                            fromdate:   from, 
                            todate:     to, 
                            views:      v,
                            total:      total,
                            link:       'https://' + proj + '.org/wiki/' + name
                        }}; 
                    }    
                }
            }).query(pure);
        }
    };
};
