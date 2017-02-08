import express from 'express';
import request from 'request';
import path from 'path';
import bodyParser from 'body-parser';

const rootPath = path.normalize(__dirname + '/../');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app'));
app.use('/src', express.static(rootPath + '/src'));
app.use('/node_modules', express.static(rootPath + '/node_modules'));
app.use('/bower_components', express.static(rootPath + '/bower_components'));

//console.log(app);
app.listen(3033);
console.log('Listening on port ' + 3033 + '...');

//Methods
app.get('/api/results', (req, res) => {
	request.get({
		url: 'https://webapi.segundamano.mx/nga/api/v1/public/klfst?lang=es&category=2021&region=21&vehicle_brand=110&vehicle_model=11023'
	}, (err, response, body) => {
		if (!err &&  200 === parseInt(response.statusCode)) { 
			res.json(JSON.parse(body));
		}
	});
});

module.exports = app;
