import { AlexaResponse } from './response';
import * as mysql from 'mysql';

interface Intent {
	readonly key: string;
	execute: (handlerInput: object) => Promise<AlexaResponse>;
}

export class GetIdeaIntent {
	public readonly key = 'getidea';

	async execute(handlerInput: object): Promise<AlexaResponse> {
		const connection = mysql.createConnection(process.env.JAWSDB_URL);
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

export class AddIdeaIntent {
	public readonly key = 'addidea';

	async execute(handlerInput: any): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		const connection = mysql.createConnection(process.env.JAWSDB_URL);
		connection.connect();
		try {
			const title: string = handlerInput.intent.slots.spot.value;

			await (new Promise((resolve, reject) => {
				connection.query('Insert into lunch_spots SET ?', { title }, function(error) {
					if (error) reject(error);

					resolve();
				});
			}));

			r.setSpeech(`Ok, ${title} has been added to the list!`);
		} catch (err) {
			r.setSpeech("I'm pretty sure that was already on the list.");
		} finally {
			connection.end();
			return r;
		}
	}
}
