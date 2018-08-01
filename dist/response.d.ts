interface OutputSpeech {
    type: string;
    text: string;
    ssml: string;
}
interface Response {
    outputSpeech: OutputSpeech;
    directives: any[];
}
export declare class AlexaResponse {
    private data;
    setSpeech(msg: string): void;
    addDirective(): void;
    getData(): {
        version: string;
        response: Response;
    };
}
export {};
