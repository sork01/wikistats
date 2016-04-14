module.exports = function($resource) {
    // this doesn't work, see https://phabricator.wikimedia.org/T62835
    var URL = 'https://en.wikipedia.org/w/api.php?action=query&prop=langlinks' +
              '&origin=*mustbewhitelisted*&titles=:title&lllimit=:limit&format=json';
    
    return $resource(URL, {limit:500}, {
        query: {
            method: 'GET',
            isArray: false,
            transformResponse: function(data, headers) {
                console.log(angular.fromJson(data));
            }
        }
    });
};
