import { EventEmitter } from 'events';
import { mapAssistantRequestToAssistRequest, mapAssistResponseToAssistantResponse } from './common';

/**
 * Represents a conversation with the Assistant.
 * @author Giorgio Garasto <giorgio@garasto.it>
 * @license MIT
 * @class
 */
class Conversation extends EventEmitter {
    /**
     * Creates a new conversation.
     * @param _stream - The duplex stream to use to communicate with the Assistant SDK.
     * @param _deviceId - The device ID to use during this conversation.
     * @param _deviceModelId - The device model ID to use during this conversation.
     * @param locale - The locale to use during this conversation.
     * @constructor
     */
    constructor(_stream, _deviceId, _deviceModelId, locale) {
        super();
        this._stream = _stream;
        this._deviceId = _deviceId;
        this._deviceModelId = _deviceModelId;
        this.locale = locale;
        this._setupEvents();
    }
    sendRawRequest(rawRequest) {
        return this._stream.write(rawRequest);
    }
    sendRequest(request) {
        const finalRequest = request.audio
            ? request
            : Object.assign({ deviceId: this._deviceId, deviceModelId: this._deviceModelId, locale: this.locale }, request);
        return this.sendRawRequest(mapAssistantRequestToAssistRequest(finalRequest));
    }
    end() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            this._stream.end((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    _setupEvents() {
        this._stream
            .on('data', (data) => {
            const mappedResponse = mapAssistResponseToAssistantResponse(data);
            this.emit('data', mappedResponse);
            if (mappedResponse.action) {
                this.emit('action', mappedResponse.action);
            }
            if (mappedResponse.actionOnGoogle) {
                this.emit('actionongoogle', mappedResponse.actionOnGoogle);
            }
            if (mappedResponse.audio) {
                this.emit('audio', mappedResponse.audio);
            }
            if (mappedResponse.conversationEnded) {
                this.emit('conversationend', mappedResponse);
            }
            if (mappedResponse.html) {
                this.emit('html', mappedResponse.html);
            }
            if (mappedResponse.newVolume) {
                this.emit('volume', mappedResponse.newVolume);
            }
            if (mappedResponse.speechRecognitionResults) {
                this.emit('speechrecognition', mappedResponse.speechRecognitionResults);
            }
            if (mappedResponse.text) {
                this.emit('message', mappedResponse.text);
            }
            if (mappedResponse.utteranceEnded) {
                this.emit('utteranceend', mappedResponse);
            }
        })
            .on('end', () => this.emit('end'))
            .on('close', () => this.emit('close'))
            .on('error', err => this.emit('error', err));
    }
}

export { Conversation };
