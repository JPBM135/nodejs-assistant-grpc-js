'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var googleAuthLibrary = require('google-auth-library');
var grpc = require('@grpc/grpc-js');
var audioConversation = require('./audio-conversation');
var common = require('./common');
var proto = require('./proto');
var textConversation = require('./text-conversation');

/**
 * The base class to connect with the Assistant.
 * @author Giorgio Garasto <giorgio@garasto.it>
 * @license MIT
 * @class
 */
class Assistant {
    /**
     * Creates a new connection with the assistant.
     * @param credentials - The credentials to use to authenticate with the Assistant.
     * @param options - Some additional (optional) options.
     * @param options.deviceId - The device ID to use in the conversations with the Assistant.
     * @param options.deviceModelId - The device model ID to use in the conversations with the Assistant.
     * @param options.locale - The locale to use in the conversations with the Assistant.
     * @constructor
     */
    constructor(credentials, options = {
        deviceId: 'default',
        deviceModelId: 'default',
        locale: common.AssistantLanguage.ENGLISH,
    }) {
        this._endpoint = 'embeddedassistant.googleapis.com';
        this.locale = options.locale;
        this.deviceId = options.deviceId;
        this.deviceModelId = options.deviceModelId;
        this._client = this._createClient(credentials);
    }
    /**
     * Starts a new text conversation with the Assistant.
     * @param audioOutConfig - The audio output configuration.
     * @returns The new text conversation.
     */
    startTextConversation(audioOutConfig = {
        encoding: proto.AudioOutEncoding.LINEAR16,
        sampleRateHertz: 16000,
        volumePercentage: 100,
    }) {
        return new textConversation.TextConversation(this._client.assist(), this.deviceId, this.deviceModelId, this.locale, audioOutConfig);
    }
    /**
     * Starts a new audio conversation with the Assistant.
     * @param audioInConfig - The audio input configuration.
     * @param audioOutConfig - The audio output configuration.
     * @returns The new audio conversation.
     */
    startAudioConversation(audioInConfig = {
        encoding: proto.AudioInEncoding.LINEAR16,
        sampleRateHertz: 16000,
    }, audioOutConfig = {
        encoding: proto.AudioOutEncoding.LINEAR16,
        sampleRateHertz: 16000,
        volumePercentage: 100,
    }) {
        return new audioConversation.AudioConversation(this._client.assist(), this.deviceId, this.deviceModelId, this.locale, audioInConfig, audioOutConfig);
    }
    /**
     * Sends a single text query to the Assistant and wait for its response.
     * @param textOrAudio - The text query or the audio buffer to send to the Assistant.
     * @param options - The additional query options.
     * @returns A promise that resolves to the Assistant response.
     */
    query(textOrAudio, { conversationState, audioInConfig, audioOutConfig, } = {
        audioInConfig: {
            encoding: proto.AudioInEncoding.LINEAR16,
            sampleRateHertz: 16000,
        },
        audioOutConfig: {
            encoding: proto.AudioOutEncoding.LINEAR16,
            sampleRateHertz: 16000,
            volumePercentage: 100,
        },
    }) {
        const conversation = this._client.assist();
        return new Promise((resolve, reject) => {
            const response = {};
            conversation.on('data', (data) => {
                const mappedData = common.mapAssistResponseToAssistantResponse(data);
                if (typeof mappedData.action !== 'undefined') {
                    response.action = Object.assign(Object.assign({}, response.action), mappedData.action);
                }
                if (typeof mappedData.actionOnGoogle !== 'undefined') {
                    response.actionOnGoogle = Object.assign(Object.assign({}, response.actionOnGoogle), mappedData.actionOnGoogle);
                }
                if (typeof mappedData.audio !== 'undefined') {
                    response.audio = response.audio
                        ? Buffer.concat([response.audio, mappedData.audio])
                        : mappedData.audio;
                }
                if (typeof mappedData.conversationEnded !== 'undefined') {
                    response.conversationEnded = mappedData.conversationEnded;
                }
                if (typeof mappedData.conversationState !== 'undefined') {
                    response.conversationState = mappedData.conversationState;
                }
                if (typeof mappedData.html !== 'undefined') {
                    response.html = response.html
                        ? `${response.html} ${mappedData.html}`
                        : mappedData.html;
                }
                if (typeof mappedData.newVolume !== 'undefined') {
                    response.newVolume = mappedData.newVolume;
                }
                if (typeof mappedData.speechRecognitionResults !== 'undefined') {
                    response.speechRecognitionResults = [
                        ...(response.speechRecognitionResults || []),
                        ...mappedData.speechRecognitionResults,
                    ];
                }
                if (typeof mappedData.text !== 'undefined') {
                    response.text = response.text
                        ? `${response.text} ${mappedData.text}`
                        : mappedData.text;
                }
            });
            conversation.on('end', () => {
                // Response ended, resolve with the whole response.
                resolve(response);
            });
            conversation.on('error', reject);
            conversation.write(common.mapAssistantRequestToAssistRequest(Object.assign({ locale: this.locale, deviceId: this.deviceId, deviceModelId: this.deviceModelId, audioOutConfig,
                conversationState, html: true }, (typeof textOrAudio === 'string'
                ? {
                    text: textOrAudio,
                }
                : {
                    audioInConfig,
                }))));
            if (typeof textOrAudio !== 'string') {
                conversation.write(common.mapAssistantRequestToAssistRequest({ audio: textOrAudio }));
            }
            conversation.end();
        });
    }
    _createClient(credentials) {
        const sslCreds = grpc.credentials.createSsl();
        const refresh = new googleAuthLibrary.UserRefreshClient();
        refresh.fromJSON(credentials);
        const callCreds = grpc.credentials.createFromGoogleCredential(refresh);
        const combinedCreds = grpc.credentials.combineChannelCredentials(sslCreds, callCreds);
        const client = new proto.embeddedAssistantPb(this._endpoint, combinedCreds);
        return client;
    }
}

exports.Assistant = Assistant;
