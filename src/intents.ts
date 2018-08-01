import { AlexaResponse, BodyTemplate1 } from './response';
import { getRandomImage } from './images';
import { Request } from 'express';
import * as mysql from 'mysql';

interface Intent {
	execute: (httpRequest: Request, alexaRequest: any) => Promise<AlexaResponse>;
}

export class LaunchIntent {
	async execute(httpRequest: Request, alexaRequest: any): Promise<AlexaResponse> {

		console.log("create response");
		let r = new AlexaResponse();
		console.log("set speech");
		r.setSpeech("Hi, I can give you some lunch ideas!")
		console.log("set end");
		r.setShouldEndSession(false)
		console.log("set reprompt");
		r.setReprompt('Try, "Where should I go for lunch"')
		console.log("response done");

		// const directive = new BodyTemplate1();
		// directive.setBackgroundImage(getRandomImage());
		// directive.setTitle('Lunch Bot');
		// r.addDirective(directive);

		return r;
	}
}

export class GetIdeaIntent {
	async execute(httpRequest: Request): Promise<AlexaResponse> {
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
	async execute(httpRequest: Request, alexaRequest: any): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		const connection = mysql.createConnection(process.env.JAWSDB_URL);
		connection.connect();
		try {
			const title: string = alexaRequest.intent.slots.spot.value;

			await (new Promise((resolve, reject) => {
				connection.query('Insert into lunch_spots SET ?', { title }, function(error) {
					if (error) reject(error);

					resolve();
				});
			}));

			r.setSpeech(`Ok, ${title} has been added to the list!`);
		} catch (err) {
			console.log(err);
			r.setSpeech("I'm pretty sure that was already on the list.");
		} finally {
			connection.end();
			return r;
		}
	}
}

export class TestIntent {
	async execute(httpRequest: Request): Promise<AlexaResponse> {
		let r = new AlexaResponse();
		r.setSpeech("Hi");
		return r;
	}
}
