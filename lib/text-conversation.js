'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var conversation = require('./conversation');
var proto = require('./proto');

/**
 * Represents a text conversation with the Assistant.
 * @author Giorgio Garasto <giorgio@garasto.it>
 * @license MIT
 * @class
 */
class TextConversation extends conversation.Conversation {
    /**
     * Creates a new audio conversation.
     * @param _stream - The duplex stream to use to communicate with the Assistant SDK.
     * @param _deviceId - The device ID to use during this conversation.
     * @param _deviceModelId - The device model ID to use during this conversation.
     * @param locale - The locale to use during this conversation.
     * @param _audioOutConfig - The audio output configuration.
     * @constructor
     */
    constructor(_stream, _deviceId, _deviceModelId, locale, _audioOutConfig = {
        encoding: proto.AudioOutEncoding.LINEAR16,
        sampleRateHertz: 16000,
        volumePercentage: 100,
    }) {
        super(_stream, _deviceId, _deviceModelId, locale);
        this._audioOutConfig = _audioOutConfig;
    }
    /**
     * Sends a text query to the Assistant.
     * @param text - The text query to send to the Assistant.
     * @returns A boolean that tells whether the text query was successfully sent or not.
     */
    send(text) {
        return this.sendRequest({
            audioOutConfig: this._audioOutConfig,
            deviceId: this._deviceId,
            deviceModelId: this._deviceModelId,
            locale: this.locale,
            text,
        });
    }
}

exports.TextConversation = TextConversation;
