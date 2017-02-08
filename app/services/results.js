export default function($http, globals) {
	this.getResults = () => {
		return $http.get('api/results')
		.then((data) => {
			return data;
		})
		.catch((err) => {
			let msg = 'Error al cargar resultados de buesqueda';
			let alertType = 'error';
			globals.alertMsg(alertType, msg, err);
		});
	};
}