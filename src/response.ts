import { URL } from "url";

interface OutputSpeech {
	type: string;
	text: string;
};
interface Response {
	outputSpeech: OutputSpeech;
	directives: any[];
	card: any;
	reprompt: string;
	shouldEndSession: boolean;
};

interface AlexaDirective {
	getData(): any;
};
interface TextContent {
	primaryText: { text: string; type: "PlainText" | "RichText" };
	secondaryText?: { text: string; type: "PlainText" | "RichText" };
	tertiaryText?: { text: string; type: "PlainText" | "RichText" };
};
interface Image {
	contentDescription?: string;
	sources: {
		url: string,
		size?: string
	}[];
}

// Basic Class to represent display interface BodyTemplate1
export class BodyTemplate1 implements AlexaDirective {
	private data = {
		type: "Display.RenderTemplate",
		token: "aToken",
		template: {
			type: "BodyTemplate1",
			backButton: "HIDDEN",
			textContent: <TextContent>{},
			title: "",
			backgroundImage: <Image>{}
		}
	};

	public setBackgroundImage(url: URL) {
		this.data.template.backgroundImage = {
			sources: [{
				url: url.toString()
			}]
		}
	}

	public setTitle(title: string) {
		this.data.template.title = title;
	}

	public setPrimaryContent(msg: string) {
		this.data.template.textContent.primaryText = {
			text: msg,
			type: "PlainText"
		}
	}
	public setSecondaryContent(msg: string) {
		this.data.template.textContent.secondaryText = {
			text: msg,
			type: "PlainText"
		}
	}
	public setTertiaryContent(msg: string) {
		this.data.template.textContent.tertiaryText = {
			text: msg,
			type: "PlainText"
		}
	}

	public getData(): any {
		return this.data;
	}
}

export class AlexaResponse {

	private data = {
		version: "1.0",
		response: <Response>{
			directives: []
		}
	};

	// Should alexa end the skill after this response? Default is true
	public setShouldEndSession(shouldEnd: boolean) {
		this.data.response.shouldEndSession = shouldEnd;
	}

	// If the user makes a follow up statement that doesn't match anything in our skill Alexa will say the "reprompt"
	public setReprompt(msg: string) {
		this.data.response.reprompt = msg;
	}

	// What should Alexa say, SSML not currently supported by this skill
	public setSpeech(msg: string) {
		this.data.response.outputSpeech = {
			type: "PlainText",
			text: msg
		}
	}

	public addDirective(directive: AlexaDirective) {
		this.data.response.directives.push(directive.getData())
	}

	public getData() {
		return this.data;
	}
}
