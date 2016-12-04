angular.module('app', [
    'app.templates',
    'app.partials',
    'ngMaterial',
]);
require('../dist/temp/templateCacheTemplates');
require('../dist/temp/templateCachePartials');
require('search');
require('dataLeakFactory');