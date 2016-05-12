module.exports = function($http) {
    return {
        query: function(obj) { //TODO: validate
            return $http.jsonp('https://' + obj.namespace +
                    '.org/w/api.php?format=json&list=search&utf8=&srlimit=5' + 
                    '&action=query&callback=JSON_CALLBACK&srsearch=' + obj.str, {
                transformResponse: function(data, headersGetter, status) {

                    var obj = angular.fromJson(data);
                    var titles = [];

                    angular.forEach(obj.query.search, function(val, key) {
                        titles.push(val.title);
                    });

                    return {url: titles};
                }
            });
        }
    };
};
