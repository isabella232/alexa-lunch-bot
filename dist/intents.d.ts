import { AlexaResponse } from './response';
import { State } from './state';
interface Intent {
    execute: (state: State, alexaRequest: any) => Promise<AlexaResponse>;
}
export declare class LaunchIntent implements Intent {
    execute(state: State, alexaRequest: any): Promise<AlexaResponse>;
}
export declare class ExitIntent implements Intent {
    execute(state: State, alexaRequest: any): Promise<AlexaResponse>;
}
export declare class GetIdeaIntent implements Intent {
    execute(state: State): Promise<AlexaResponse>;
}
export declare class BadIdeaIntent implements Intent {
    execute(state: State): Promise<AlexaResponse>;
}
export declare class GoodIdeaIntent implements Intent {
    execute(state: State): Promise<AlexaResponse>;
}
export declare class AddIdeaIntent implements Intent {
    execute(state: State, alexaRequest: any): Promise<AlexaResponse>;
}
export {};
