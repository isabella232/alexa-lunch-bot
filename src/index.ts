require('dotenv').config();
import * as express from 'express';
import * as bodyparser from 'body-parser';
import { AlexaResponse } from './response';
import * as Intents from './intents';
import { LunchSpot } from './lunch-spot';
import { State } from './state';

const state = new State();
const app: express.Application = express();
app.use(bodyparser.json());

const launchIntent = new Intents.LaunchIntent();
const exitIntent = new Intents.ExitIntent();
const intents = {};
intents['getidea'] = new Intents.GetIdeaIntent();
intents['addidea'] = new Intents.AddIdeaIntent();
intents['goodidea'] = new Intents.GoodIdeaIntent();
intents['badidea'] = new Intents.BadIdeaIntent();

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
				r = await launchIntent.execute(state, alexaRequest);
				state.lastLunchSpot = null;
			}
		} catch (err) {
			console.log("Error while creating response.", err);
		}

		res.send(r.getData());
	})();
});

app.use('/images/', express.static('images'));
app.use('/', function(req, res) {
	res.send("");
});

app.listen(process.env.PORT, () => {
	// Success callback
	console.log(`Listening at ${process.env.PORT}/`);
});
