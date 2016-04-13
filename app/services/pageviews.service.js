module.exports = function($resource) {
    var URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' +
               ':project/all-access/user/:article/daily/:from/:to';
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

                angular.forEach(obj.items, function(val, key) {
                    delete val.access;
                    delete val.agent;
                    delete val.granularity;
                    delete val.article;
                    delete val.project;
                });

                return { article: {
                    name:       name, 
                    project:    proj, 
                    fromdate:   from, 
                    todate:     to, 
                    views:      obj.items
                }}; 
            }    
        }
    });
};
