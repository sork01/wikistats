module.exports = function($scope, pageViews) {
    $scope.groups = [
        { 'name' : 'Dogs',
            'breeds': [
            'Labrador',
            'Retriever',
            'Boxer',
            'Cocker Spaniel'
        ]},
        { 'name': 'Cats',
            'breeds': [
            'Russian blue',
            'Ragdoll',
            'Norwegian Forest Cat'
        ]},
        { 'name': 'Fish',
            'breeds': [
            'Salmon',
            'Pike',
            'Trout',
            'Bass'
        ]}
    ];
    pageViews.query({
        project:    "en.wikipedia",
        article:    "Dog",
        from:       "20160101",
        to:         "20160110",
    }).$promise.then(function(result) {
        console.log(result.article);
    });
};
