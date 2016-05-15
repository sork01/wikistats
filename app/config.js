module.exports = function($translateProvider, $compileProvider) {

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.useLoaderCache(true);
    
    $translateProvider.translations('en-US', { //Prevent initial flicker on load
        'ADD_ARTICLE': 'Add article...',
        'LINE_CHART': 'Line chart',
        'PIE_CHART': 'Pie chart',
        'COLUMN_CHART': 'Column chart',
        'EXPORT_AS': 'Export as...',
        'PRINT': 'Print...',
        'LANGUAGE': 'Language',
        'SEARCH': 'Search...',
        'TOTALVIEWS': 'Total views',
        'START_DATE': 'Start date',
        'END_DATE': 'End date',
        'ARTICLE': 'Article',
        'LINK': 'Link',
        'PROJECT': 'Project',
        'GRANULARITY':	'Granularity'
    });
    
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale/',
        suffix: '.json'
    });

    $translateProvider
            .fallbackLanguage('en-US')
		    .preferredLanguage('en-US');

    $compileProvider.debugInfoEnabled(false);

};
