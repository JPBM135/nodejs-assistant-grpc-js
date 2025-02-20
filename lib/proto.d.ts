/// <reference types="node" />
import { ChannelCredentials, ClientDuplexStream } from '@grpc/grpc-js';
export declare class EmbeddedAssistant {
    constructor(endpoint: string, credentials: ChannelCredentials);
    assist(): ClientDuplexStream<AssistRequest, AssistResponse>;
}
export declare type AssistRequest = {
    config: AssistConfig;
    audioIn?: never;
} | {
    audioIn: Buffer;
    config?: never;
};
export declare enum AssistResponseEventType {
    EVENT_TYPE_UNSPECIFIED = 0,
    END_OF_UTTERANCE = 1
}
export interface AssistResponse {
    eventType: AssistResponseEventType;
    audioOut?: AudioOut;
    screenOut?: ScreenOut;
    deviceAction?: DeviceAction;
    speechResults?: SpeechRecognitionResult[];
    dialogStateOut?: DialogStateOut;
    debugInfo?: DebugInfo;
}
export interface DebugInfo {
    aogAgentToAssistantJson: string;
}
export declare type AssistConfig = {
    audioOutConfig: AudioOutConfig;
    screenOutConfig?: ScreenOutConfig;
    dialogStateIn: DialogStateIn;
    deviceConfig: DeviceConfig;
    debugConfig?: DebugConfig;
} & ({
    audioInConfig: AudioInConfig;
    textQuery?: never;
} | {
    textQuery: string;
    audioInConfig?: never;
});
export declare enum AudioInEncoding {
    ENCODING_UNSPECIFIED = 0,
    LINEAR16 = 1,
    FLAC = 2
}
export interface AudioInConfig {
    encoding: AudioInEncoding;
    sampleRateHertz: number;
}
export declare enum AudioOutEncoding {
    ENCODING_UNSPECIFIED = 0,
    LINEAR16 = 1,
    MP3 = 2,
    OPUS_IN_OGG = 3
}
export interface AudioOutConfig {
    encoding: AudioOutEncoding;
    sampleRateHertz: number;
    volumePercentage: number;
}
export declare enum ScreenMode {
    SCREEN_MODE_UNSPECIFIED = 0,
    OFF = 1,
    PLAYING = 3
}
export interface ScreenOutConfig {
    screenMode?: ScreenMode;
}
export interface DialogStateIn {
    conversationState?: Buffer;
    languageCode: string;
    deviceLocation?: DeviceLocation;
    isNewConversation?: boolean;
}
export interface DeviceConfig {
    deviceId: string;
    deviceModelId: string;
}
export interface AudioOut {
    audioData: Buffer;
}
export declare enum ScreenOutFormat {
    FORMAT_UNSPECIFIED = 0,
    HTML = 1
}
export interface ScreenOut {
    format: ScreenOutFormat;
    data: Buffer;
}
export interface DeviceAction {
    deviceRequestJson: string;
}
export interface SpeechRecognitionResult {
    transcript: string;
    stability: number;
}
export declare enum MicrophoneMode {
    MICROPHONE_MODE_UNSPECIFIED = 0,
    CLOSE_MICROPHONE = 1,
    DIALOG_FOLLOW_ON = 2
}
export interface DialogStateOut {
    supplementalDisplayText: string;
    conversationState: Buffer;
    microphoneMode: MicrophoneMode;
    volumePercentage: number;
}
export interface DebugConfig {
    returnDebugInfo: boolean;
}
export interface LatLng {
    latitude: number;
    longitude: number;
}
export interface DeviceLocation {
    coordinates: LatLng;
}
export declare const embeddedAssistantPb: typeof EmbeddedAssistant;
