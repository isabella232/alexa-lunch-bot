import { AlexaResponse, BodyTemplate1, BodyTemplate2 } from './response';
import { getRandomIcon, getRandomBackground } from './images';
import { State } from './state';
import * as db from './database';

export interface Intent {
	execute: (state: State, alexaRequest: any) => Promise<AlexaResponse>;
}

export class LaunchIntent implements Intent {
	async execute(): Promise<AlexaResponse> {
		let r = new AlexaResponse();
		r.setSpeech("Hi, I can give you some lunch ideas!");
		r.setReprompt('Try, "Where should I go for lunch"');
		r.setShouldEndSession(false);

		const directive = new BodyTemplate1();
		directive.setBackgroundImage(getRandomBackground());
		directive.setTitle('Lunch Bot');
		directive.setPrimaryContent("Ask for a lunch idea, or add a new idea!");
		r.addDirective(directive);

		r.setCard('Lunch Bot', "Ask for a lunch idea, or add a new idea!");

		return r;
	}
}

export class ExitIntent implements Intent {
	async execute(): Promise<AlexaResponse> {
		let r = new AlexaResponse();
		r.setSpeech("Ok, goodbye!")
		r.setShouldEndSession(true)

		return r;
	}
}

export class GetIdeaIntent implements Intent {
	async execute(state: State): Promise<AlexaResponse> {
		// Pick a random one
		const selection = await db.getRandomIdea();
		await db.setDate(selection.id);
		state.lastLunchSpot = selection;

		// Respond
		let r = new AlexaResponse();
		r.setSpeech(`How does ${selection.title} sound?`);
		r.setShouldEndSession(false);
		r.setReprompt(`You can say "That's a bad idea" or "That'll do pig"`);

		const directive = new BodyTemplate2();
		directive.setBackgroundImage(getRandomBackground());
		directive.setImage(getRandomIcon());
		directive.setTitle('Lunch Bot');
		directive.setPrimaryContent("Was that a good idea?");
		directive.setSecondaryContent("You can ask for another!");
		r.addDirective(directive);

		r.setCard('Lunch Bot', "Was that a good idea?\n You can ask for another!");

		return r;
	}
}

export class BadIdeaIntent implements Intent {
	private getLessOftenPhrase(): string {
		const options = [
			`Ok that idea will come up less often.`,
			`I'll suggest that less.`,
			`I'll just put a pin in that.`,
			`Well that's your opinion.`,
			`I didn't think you'd hate it that much...`,
			`Woah, it was just a bad lunch idea.`,
			`Everyone else seems to disagree.`,
			`Well all the other bots like that spot.`,
			`I'm doing my best here.`
		]
		return options[Math.floor(Math.random() * options.length)];
	}

	async execute(state: State): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		if (state.lastLunchSpot) {
			await db.alterScore(state.lastLunchSpot.id, -1);

			const selection = await db.getRandomIdea();
			await db.setDate(selection.id);
			state.lastLunchSpot = selection;

			r.setSpeech(`${this.getLessOftenPhrase()} What about ${selection.title}?`);
			r.setShouldEndSession(false);
		} else {
			r.setSpeech("I'm not sure which idea we were talking about.");
		}

		return r;
	}
}

export class GoodIdeaIntent implements Intent {
	private getMoreOftenPhrase(): string {
		const options = [
			`Ok that idea will come up more often!`,
			`I'll suggest that more.`,
			`Don't get too excited, it's just lunch.`,
			`I'm a Lunch Bot, good ideas are kind of my thing.`,
			`Woah, it was just a good lunch idea.`,
			`We will do that every day then.`,
			`Enjoy, goodbye.`,
			`Glad I could help.`
		]
		return options[Math.floor(Math.random() * options.length)];
	}

	async execute(state: State): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		if (state.lastLunchSpot) {
			await db.alterScore(state.lastLunchSpot.id, 1);

			r.setSpeech(this.getMoreOftenPhrase());
			r.setShouldEndSession(true);
		} else {
			r.setSpeech("I'm not sure which idea we were talking about.");
		}

		return r;
	}
}

export class AddIdeaIntent implements Intent {
	private getAddedPhrase(title: string): string {
		const options = [
			`I added ${title} to the list.`,
			`Ok, ${title} has been added to the list!`,
			`${title} was added.`,
			`I'll make sure everyone goes to ${title}!`,
			`${title} is an excellent idea!`
		]
		return options[Math.floor(Math.random() * options.length)];
	}

	async execute(state: State, alexaRequest: any): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		try {
			const title: string = alexaRequest.intent.slots.spot.value;
			state.lastLunchSpot = await db.addIdea(title);

			r.setSpeech(this.getAddedPhrase(title));
			r.setShouldEndSession(false);
			r.setReprompt("You can ask for an idea, or add another lunch spot!")
		} catch (err) {
			console.log(err);
			r.setSpeech("I'm pretty sure that was already on the list.");
			r.setShouldEndSession(false);
		} finally {
			return r;
		}
	}
}

export class RemoveLastIdeaIntent implements Intent {
	private getRemovedPhrase(title: string): string {
		const options = [
			`I removed ${title}.`,
			`${title} was deleted.`,
			`You're right ${title} was a terrible idea.`,
			`${title} was never going to work out anyway.`
		]
		return options[Math.floor(Math.random() * options.length)];
	}

	async execute(state: State): Promise<AlexaResponse> {
		let r = new AlexaResponse();

		if (state.lastLunchSpot) {
			await db.removeIdea(state.lastLunchSpot.id);
			const title = state.lastLunchSpot.title;
			state.lastLunchSpot = null;

			r.setSpeech(this.getRemovedPhrase(title));
			r.setShouldEndSession(true);
		} else {
			r.setSpeech("I'm not sure which idea we were talking about.");
		}

		return r;
	}
}
