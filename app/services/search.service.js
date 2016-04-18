module.exports = function($http) {
    return {
        query: function(obj) { //TODO: validate
            return $http.get('https://' + obj.namespace +
                    '.org/w/api.php?format=json&list=search&utf8=1' +
                    '&srlimit=5&action=query&callback=?&srsearch=' + obj.str, {
                method: 'GET',
                headers: {'Origin': 'http://tools.wmflabs.org/'},
                transformResponse: function(data, headers, s) {
                    console.log(data);
                }
            });
        }
    };
};
