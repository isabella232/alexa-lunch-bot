import { AlexaResponse, BodyTemplate1 } from './response';
import { getRandomImage } from './images';
import { State } from './state';
import { LunchSpot } from './lunch-spot';
import { Request } from 'express';
import * as mysql from 'mysql';

async function getRandomIdea(): Promise<LunchSpot> {
	const options = await getAllSpots();

	// Pick a random one
	const selection = options[Math.floor(Math.random() * options.length)];
	return selection;
}

async function getAllSpots(): Promise<LunchSpot[]> {
	// Query for all ideas, create and end connection as needed, this isn't called very often
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	var options: LunchSpot[] = await (new Promise<LunchSpot[]>((resolve, reject) => {
		connection.query('select * from lunch_spots order by lastSuggested ASC, score DESC limit 5', function(error, results) {
			if (error) reject(error);

			let spots: LunchSpot[] = [];
			results.forEach(function(row) {
				spots.push(new LunchSpot(row));
			})

			resolve(spots);
		});
	}));
	connection.end();

	return options;
}

async function alterScore(id: number, amount: number) {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	await (new Promise<LunchSpot[]>((resolve, reject) => {
		connection.query('UPDATE lunch_spots SET score = score + ? WHERE id = ?', [amount, id], function(error) {
			if (error) reject(error);
			resolve();
		});
	}));
	connection.end();
}

interface Intent {
	execute: (state: State, alexaRequest: any) => Promise<AlexaResponse>;
}

export class LaunchIntent implements Intent {
	async execute(state: State, alexaRequest: any): Promise<AlexaResponse> {
		let r = new AlexaResponse();
		r.setSpeech("Hi, I can give you some lunch ideas!")
		r.setReprompt('Try, "Where should I go for lunch"')
		r.setShouldEndSession(false)

		const directive = new BodyTemplate1();
		directive.setBackgroundImage(getRandomImage());
		directive.setTitle('Lunch Bot');
		directive.setPrimaryContent("Ask for a lunch idea, or add a new idea!")
		r.addDirective(directive);

		return r;
	}
}

export class ExitIntent implements Intent {
	async execute(state: State, alexaRequest: any): Promise<AlexaResponse> {
		let r = new AlexaResponse();
		r.setSpeech("Ok, goodbye!")
		r.setShouldEndSession(true)

		return r;
	}
}

export class GetIdeaIntent implements Intent {
	async execute(state: State): Promise<AlexaResponse> {
		// Pick a random one
		const selection = await getRandomIdea();
		state.lastLunchSpot = selection;

		// Respond
		let r = new AlexaResponse();
		r.setSpeech(`How does ${selection.title} sound?`);
		r.setShouldEndSession(false);
		r.setReprompt(`You can say "That's a bad idea" or "That'll do pig"`);
		return r;
	}
}

export class BadIdeaIntent implements Intent {
	async execute(state: State): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		if (state.lastLunchSpot) {
			alterScore(state.lastLunchSpot.id, -1);

			const selection = await getRandomIdea();
			state.lastLunchSpot = selection;

			r.setSpeech(`Ok that idea will come up less often. What about ${selection.title}?`);
			r.setShouldEndSession(false);
		} else {
			r.setSpeech("I'm not sure which idea we were talking about.");
		}

		return r;
	}
}

export class GoodIdeaIntent implements Intent {
	async execute(state: State): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		if (state.lastLunchSpot) {
			alterScore(state.lastLunchSpot.id, 1);

			r.setSpeech(`Ok that idea will come up more often!`);
			r.setShouldEndSession(true);
		} else {
			r.setSpeech("I'm not sure which idea we were talking about.");
		}

		return r;
	}
}

export class AddIdeaIntent implements Intent {
	async execute(state: State, alexaRequest: any): Promise<AlexaResponse> {
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
			r.setShouldEndSession(false);
		} catch (err) {
			console.log(err);
			r.setSpeech("I'm pretty sure that was already on the list.");
			r.setShouldEndSession(false);
		} finally {
			connection.end();
			return r;
		}
	}
}
