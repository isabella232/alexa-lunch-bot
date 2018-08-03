require('dotenv').config();
import * as express from 'express';
import * as bodyparser from 'body-parser';
import { AlexaResponse } from './response';
import * as Intents from './intents';
import * as request from 'request';
import * as db from './database';
import { LunchSpot } from './lunch-spot';
import { State } from './state';

const state = new State();
const app: express.Application = express();
app.use(bodyparser.json());

const launchIntent: Intents.Intent = new Intents.LaunchIntent();
const exitIntent: Intents.Intent = new Intents.ExitIntent();
const intents = {
	getidea: new Intents.GetIdeaIntent(),
	addidea: new Intents.AddIdeaIntent(),
	removeidea: new Intents.RemoveLastIdeaIntent(),
	goodidea: new Intents.GoodIdeaIntent(),
	badidea: new Intents.BadIdeaIntent(),
	"AMAZON.StopIntent": new Intents.ExitIntent(),
	"AMAZON.CancelIntent": new Intents.ExitIntent()
};

app.post('/api', (req, res) => {
	const alexaContext = req.body.context;
	const alexaRequest = req.body.request;
	let r = new AlexaResponse();

	(async function() {
		try {
			if (alexaRequest.type === 'LaunchRequest') {
				state.lastLunchSpot = null;
				r = await launchIntent.execute(state, alexaRequest);
			} else if (alexaRequest.type === 'IntentRequest') {
				const intent = intents[alexaRequest.intent.name];

				if (intent)
					r = await intent.execute(state, alexaRequest);
				else
					r.setSpeech("I'm not sure what to do.");
			} else if (alexaRequest.type === 'SessionEndedRequest') {
				r = await exitIntent.execute(state, alexaRequest);
				state.lastLunchSpot = null;
			}
		} catch (err) {
			console.log("Error while creating response.", err);
			r.setSpeech("Something went wrong with the skill.");
		}

		res.send(r.getData());
	})();
});

function sendSlackText(msg: string) {
	request({
		url: process.env.SLACK_HOOK,
		method: 'POST',
		json: true,
		body: {
			text: msg
		}
	});
}

const ideaPhrases = [
	'food me',
	'idea',
	'hyly',
	'where'
];
app.post('/slack', async (req, res) => {
	let payload = req.body;
	res.sendStatus(200);

	if (payload.challenge) {
		res.send({ challenge: payload.challenge });
		return;
	}

	if (payload.event.type === "app_mention") {
		if (ideaPhrases.some((msg) => { return payload.event.text.includes(msg) })) {
			(async () => {
				const idea: LunchSpot = await db.getRandomIdea();
				sendSlackText(`Go to ${idea.title}!`);
			})();
			return;
		}
	}
});

app.use('/images/', express.static('images'));
app.use('/', function(_req, res) {
	res.send("<html><body><h1>Lunch Bot</h1><p>This is the api server for the Lunch Bot alexa skill.</p></body></html>");
});

app.listen(process.env.PORT, () => {
	// Success callback
	console.log(`Listening at ${process.env.PORT}/`);
});
