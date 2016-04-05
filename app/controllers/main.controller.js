var wikistats = angular.module('wikistats', []);

wikistats.controller('MainController', function($scope) {
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
});
