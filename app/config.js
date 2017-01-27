export function urlRouterProvider($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}

export function stateProvider($stateProvider) {
	let index = {
		controller: 'resultsController',
		name: 'results',
		templateUrl: './results/template.html',
		url: '/'
	};
	$stateProvider.state(index);
}