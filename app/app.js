import { urlRouterProvider, stateProvider } from './config.js';
import resultsController from './results/controller.js';
import navBarDirective from './directives/navBar/directive.js';

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
app.controller('resultsController', ['$scope', resultsController]);

//Services

//Factories

//Directives
app.directive('navBar', [navBarDirective]);

export default app;