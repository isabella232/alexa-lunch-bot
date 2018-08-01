
interface OutputSpeech { type: string; text: string; ssml: string; };
interface Response {
	outputSpeech: OutputSpeech;
	directives: any[];
};

export class AlexaResponse {

	private data = {
		version: "1.0",
		response: <Response>{},
	};

	public setSpeech(msg: string) {
		this.data.response.outputSpeech = {
			type: "PlainText",
			text: msg,
			ssml: "<speak>" + msg + "</speak>"
		}
	}

	public addDirective() {
		this.data.response.directives = this.data.response.directives || [];
		this.data.response.directives.push({
			"type": "Display.RenderTemplate",
			"template": {
				"type": "BodyTemplate2",
				"backButton": "VISIBLE",
				"backgroundImage": {
					"contentDescription": "Textured grey background",
					"sources": [
						{
							"url": "https://www.example.com/background-image1.png"
						}
					]
				},
				"title": "My Favorite Car",
				"image": {
					"contentDescription": "My favorite car",
					"sources": [
						{
							"url": "https://www.example.com/my-favorite-car.png"
						}
					]
				},
				"textContent": {
					"primaryText": {
						"text": "See my favorite car",
						"type": "PlainText"
					},
					"secondaryText": {
						"text": "Custom-painted",
						"type": "PlainText"
					},
					"tertiaryText": {
						"text": "By me!",
						"type": "PlainText"
					}
				}
			}
		});
	}

	public getData() {
		return this.data;
	}
}
