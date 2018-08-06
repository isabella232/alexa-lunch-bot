import { Router } from 'express';
import { AlexaResponse } from './response';
import * as Intents from './intents';
import { State } from './state';

const router = Router();
const state = new State();

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

router.post('/api', (req, res) => {
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

export { router };
