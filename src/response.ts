
interface OutputSpeech { type: string; text: string; ssml: string; };
interface Response { outputSpeech: OutputSpeech; };

export class AlexaResponse {

	private data = {
		version: "1",
		response: <Response>{}
	};

	public setSpeech(msg: string) {
		this.data.response.outputSpeech = {
			type: "PlainText",
			text: msg,
			ssml: "<speak>" + msg + "</speak>"
		}
	}

	public getData() {
		return this.data;
	}
}
