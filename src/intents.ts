import { AlexaResponse } from './response';
import * as mysql from 'mysql';

interface Intent {
	readonly key: string;
	execute: (handlerInput: object) => AlexaResponse;
}

const connection = mysql.createConnection(process.env.JAWSDB_URL);

export class GetIdeaIntent {
	public readonly key = 'getidea';

	execute(handlerInput: object): AlexaResponse {
		connection.connect();

		var options = [];
		connection.query('SELECT * FROM lunch_spots', function(error, results, fields) {
			if (error) throw error;

			results.forEach((row) => {
				options.push(row.title);
			})
		});

		connection.end();

		const selection = options[Math.floor(Math.random() * options.length)];


		let r = new AlexaResponse();
		r.setSpeech(`How does ${selection} sound?`);
		return r;
	}
}
