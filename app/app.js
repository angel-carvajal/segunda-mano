import { urlRouterProvider, stateProvider } from './config.js';
import resultsController from './results/controller.js';
import navBarDirective from './directives/navBar/directive.js';
import adCardDirective from './directives/adCard/directive.js';
import resultsService from './services/results.js';
import globals from './factories/globals.js';

const {
	module
} = angular;
const angularAppDepedencies = [
	'ui.router',
	'lumx'
];

let app;
//Configs
app = module('app', angularAppDepedencies);
app.config(['$urlRouterProvider', urlRouterProvider]);
app.config(['$stateProvider', stateProvider]);

//Controllers
app.controller('resultsController', ['$scope', 'resultsService', 'globals', resultsController]);

//Services
app.service('resultsService', ['$http', 'globals', resultsService]);

//Factories
app.factory('globals', ['$log', 'LxNotificationService', globals]);

//Directives
app.directive('navBar', [navBarDirective]);
app.directive('adCard', [adCardDirective]);

export default app;