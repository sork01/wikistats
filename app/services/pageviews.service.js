module.exports = function($resource) {
    var URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' +
               ':project/all-access/user/:article/daily/:from/:to';
    return $resource(URL, {}, {
        query: {method: 'GET'}
    });
}
