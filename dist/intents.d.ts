import { AlexaResponse } from './response';
import { State } from './state';
export interface Intent {
    execute: (state: State, alexaRequest: any) => Promise<AlexaResponse>;
}
export declare class LaunchIntent implements Intent {
    execute(): Promise<AlexaResponse>;
}
export declare class ExitIntent implements Intent {
    execute(): Promise<AlexaResponse>;
}
export declare class GetIdeaIntent implements Intent {
    execute(state: State): Promise<AlexaResponse>;
}
export declare class BadIdeaIntent implements Intent {
    private getLessOftenPhrase;
    execute(state: State): Promise<AlexaResponse>;
}
export declare class GoodIdeaIntent implements Intent {
    private getMoreOftenPhrase;
    execute(state: State): Promise<AlexaResponse>;
}
export declare class AddIdeaIntent implements Intent {
    private getAddedPhrase;
    execute(state: State, alexaRequest: any): Promise<AlexaResponse>;
}
export declare class RemoveLastIdeaIntent implements Intent {
    private getRemovedPhrase;
    execute(state: State): Promise<AlexaResponse>;
}
