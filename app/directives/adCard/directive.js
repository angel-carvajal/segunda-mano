export default function() {
	let directive = {
		restrict: 'E',
		replace: true,
		scope: {
			ad: '='
		},
		templateUrl: './directives/adCard/template.html',
		controller: ['$scope', ($scope) => {
			if ($scope.ad.thumbnail) {
				$scope.ad.previewImg = `${$scope.ad.thumbnail.base_url}/card/${$scope.ad.thumbnail.path}`;
			}
			else {
				$scope.ad.previewImg = '/src/images/car2.png';
			}

			if (120 <= $scope.ad.body.length) {
				$scope.ad.shortBody = `${$scope.ad.body.slice(0, 119).trim()}...`;
			}
			else {
				$scope.ad.shortBody = $scope.ad.body;
			}
		}]
	};
	return directive;
}
