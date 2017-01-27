import express from 'express';
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

module.exports = app;