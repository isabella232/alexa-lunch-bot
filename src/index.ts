require('dotenv').config();
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as mysql from 'mysql';
import { AlexaResponse } from './response';

const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('SELECT * FROM lunch_spots', function(error, results, fields) {
	if (error) throw error;

	results.forEach((row) => {
		console.log(row.title);
	})
});

connection.end();
//insert into lunch_spots (title) values ("Test");

const app: express.Application = express();
const port: number = parseInt(process.env.PORT);

app.use(bodyparser.json());

app.post('/api', (req, res) => {
	const context = req.body.context;
	const request = req.body.request;
	let r = new AlexaResponse();

	if (request.type === 'LaunchRequest') {
		r.setSpeech("Heroku test");
	}

	res.send(r.getData());
});

app.use('/', (req, res) => {
	res.send("Hello world")
});


app.listen(port, () => {
	// Success callback
	console.log(`Listening at http://localhost:${port}/`);
});
