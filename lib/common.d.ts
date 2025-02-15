/// <reference types="node" />
import { AssistRequest, AssistResponse, AudioInConfig, AudioOutConfig, LatLng } from './proto';
export interface AssistantOptions {
    locale: AssistantLanguage;
    deviceId: string;
    deviceModelId: string;
}
export interface AssistantSpeechRecognitionResult {
    transcript: string;
    stability: number;
}
export declare type AssistantRequest = {
    audio?: Buffer;
    audioInConfig?: never;
    audioOutConfig?: never;
    debug?: never;
    deviceId?: never;
    deviceModelId?: never;
    conversationState?: never;
    deviceLocation?: never;
    isNewConversation?: never;
    locale?: never;
    html?: never;
    text?: never;
} | ({
    audioOutConfig: AudioOutConfig;
    html?: boolean;
    conversationState?: Buffer;
    locale: AssistantLanguage;
    deviceLocation?: LatLng;
    isNewConversation?: boolean;
    deviceId: string;
    deviceModelId: string;
    debug?: boolean;
    audio?: never;
} & ({
    audioInConfig: AudioInConfig;
    text?: never;
} | {
    text: string;
    audioInConfig?: never;
}));
export declare type Action = {
    [key: string]: unknown;
};
export declare type ActionOnGoogle = {
    [key: string]: unknown;
};
export interface AssistantResponse {
    action?: Action;
    actionOnGoogle?: ActionOnGoogle;
    audio?: Buffer;
    conversationEnded?: boolean;
    conversationState?: Buffer;
    html?: string;
    newVolume?: number;
    speechRecognitionResults?: AssistantSpeechRecognitionResult[];
    text?: string;
    utteranceEnded?: boolean;
}
export declare enum AssistantLanguage {
    GERMAN = "de-DE",
    ENGLISH_AU = "en-AU",
    ENGLISH_CA = "en-CA",
    ENGLISH_UK = "en-GB",
    ENGLISH_IN = "en-IN",
    ENGLISH_US = "en-US",
    ENGLISH = "en-US",
    FRENCH_CA = "fr-CA",
    FRENCH_FR = "fr-FR",
    FRENCH = "fr-FR",
    ITALIAN = "it-IT",
    JAPANESE = "ja-JP",
    SPANISH_ES = "es-ES",
    SPANISH_MX = "es-MX",
    SPANISH = "es-ES",
    KOREAN = "ko-KR",
    PORTUGUESE = "pt-BR"
}
export declare function mapAssistantRequestToAssistRequest({ audio, audioInConfig, audioOutConfig, debug, deviceId, deviceModelId, conversationState, deviceLocation, isNewConversation, locale, html, text, }: AssistantRequest): AssistRequest;
export declare function mapAssistResponseToAssistantResponse({ audioOut, debugInfo, deviceAction, dialogStateOut, eventType, screenOut, speechResults, }: AssistResponse): AssistantResponse;
