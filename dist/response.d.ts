/// <reference types="node" />
import { URL } from "url";
interface OutputSpeech {
    type: string;
    text: string;
}
interface Response {
    outputSpeech: OutputSpeech;
    directives: any[];
    card: any;
    reprompt: {
        outputSpeech: OutputSpeech;
    };
    shouldEndSession: boolean;
}
interface AlexaDirective {
    getData(): any;
}
export declare class BodyTemplate1 implements AlexaDirective {
    private data;
    setBackgroundImage(url: URL): void;
    setTitle(title: string): void;
    setPrimaryContent(msg: string): void;
    setSecondaryContent(msg: string): void;
    setTertiaryContent(msg: string): void;
    getData(): any;
}
export declare class BodyTemplate2 implements AlexaDirective {
    private data;
    setBackgroundImage(url: URL): void;
    setImage(url: URL): void;
    setTitle(title: string): void;
    setPrimaryContent(msg: string): void;
    setSecondaryContent(msg: string): void;
    setTertiaryContent(msg: string): void;
    getData(): any;
}
export declare class AlexaResponse {
    private data;
    private directives;
    setShouldEndSession(shouldEnd: boolean): void;
    setCard(title: string, content: string): void;
    setReprompt(msg: string): void;
    setSpeech(msg: string): void;
    addDirective(directive: AlexaDirective): void;
    getData(): {
        version: string;
        response: Response;
    };
}
export {};
