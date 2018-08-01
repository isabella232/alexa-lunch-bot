import { AlexaResponse } from './response';
import * as mysql from 'mysql';

interface Intent {
	readonly key: string;
	execute: (handlerInput: object) => Promise<AlexaResponse>;
}

const connection = mysql.createConnection(process.env.JAWSDB_URL);

export class GetIdeaIntent {
	public readonly key = 'getidea';

	async execute(handlerInput: object): Promise<AlexaResponse> {
		connection.connect();

		var options: string[] = await (new Promise<string[]>((resolve, reject) => {
			connection.query('SELECT * FROM lunch_spots', function(error, results, fields) {
				if (error) reject(error);

				var options: string[] = [];
				results.forEach((row) => {
					options.push(row.title);
				});

				resolve(options);
			});
		}));

		connection.end();

		const selection = options[Math.floor(Math.random() * options.length)];


		let r = new AlexaResponse();
		r.setSpeech(`How does ${selection} sound?`);
		return r;
	}
}
