interface OutputSpeech {
    type: string;
    text: string;
    ssml: string;
}
interface Response {
    outputSpeech: OutputSpeech;
}
export declare class AlexaResponse {
    private data;
    setSpeech(msg: string): void;
    getData(): {
        version: string;
        response: Response;
    };
}
export {};
