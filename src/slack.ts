import { Router } from 'express';
import * as request from 'request';
import * as db from './database';
import { LunchSpot } from './lunch-spot';

const router = Router();
const ideaPhrases = [
	'food me',
	'idea',
	'hyly',
	'where'
];
var lastEventId = "";

function sendSlackText(msg: string) {
	console.log(`Posting to slack: ${msg}`);
	request({
		url: process.env.SLACK_HOOK,
		method: 'POST',
		json: true,
		body: {
			text: msg
		}
	});
}

function hasPhrase(msg: string, list: string[]) {
	return list.some((phrase) => {
		return msg.includes(phrase);
	})
}

router.post('/', async (req, res) => {
	let payload = req.body;
	res.statusCode = 200;

	console.log(payload);

	if (payload.challenge) {
		res.header['Content-Type'] = 'application/json';
		res.send({ challenge: payload.challenge });
		return;
	}

	if (payload.event.type === "app_mention" && payload.event_id !== lastEventId) {
		lastEventId = payload.event_id;

		if (hasPhrase(payload.event.text, ideaPhrases)) {
			const idea: LunchSpot = await db.getRandomIdea();
			sendSlackText(`Go to ${idea.title}!`);
			res.send();
		}
	}
});

export { router };
