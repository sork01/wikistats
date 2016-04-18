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
    
    $scope.projects = [ // TODO: Proper externalization and language checking
        {name: "Wikipedia",     url: "$lang$.wikipedia",    multilang: true},
        {name: "Wikiversity",   url: "$lang$.wikiversity",  multilang: true},
        {name: "Wikisource",    url: "$lang$.wikisource",   multilang: true},
        {name: "Wikinews",      url: "$lang$.wikinews",     multilang: true},
        {name: "Wikibooks",     url: "$lang$.wikibooks",    multilang: true},
        {name: "Wikiquote",     url: "$lang$.wikiquote",    multilang: true},
        {name: "Wikispecies",   url: "species.wikimedia",   multilang: false},
        {name: "Wikivoyage",    url: "$lang$.wikivoyage",   multilang: true},
        {name: "Wikidata",      url: "www.wikidata",        multilang: false},
        {name: "Wikicommons",   url: "commons.wikimedia",   multilang: false},
        {name: "Metawiki",      url: "meta.wikimedia",      multilang: false}
    ];

    $scope.chosen = { 
        proj: $scope.projects[0].name,
        lang: "Svenska"
    };
    
    $scope.changeChosen = function(name, dropdown){
        $scope.chosen[dropdown] = name;
    }

    pageViews.query({
        project:    "en.wikipedia",
        article:    "Dog",
        from:       "20160101",
        to:         "20160110",
    }).$promise.then(function(result) {
        console.log(result.article);
    });
};
