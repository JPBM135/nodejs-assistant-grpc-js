import { ScreenMode, MicrophoneMode, ScreenOutFormat, AssistResponseEventType } from './proto';

var AssistantLanguage;
(function (AssistantLanguage) {
    AssistantLanguage["GERMAN"] = "de-DE";
    AssistantLanguage["ENGLISH_AU"] = "en-AU";
    AssistantLanguage["ENGLISH_CA"] = "en-CA";
    AssistantLanguage["ENGLISH_UK"] = "en-GB";
    AssistantLanguage["ENGLISH_IN"] = "en-IN";
    AssistantLanguage["ENGLISH_US"] = "en-US";
    AssistantLanguage["ENGLISH"] = "en-US";
    AssistantLanguage["FRENCH_CA"] = "fr-CA";
    AssistantLanguage["FRENCH_FR"] = "fr-FR";
    AssistantLanguage["FRENCH"] = "fr-FR";
    AssistantLanguage["ITALIAN"] = "it-IT";
    AssistantLanguage["JAPANESE"] = "ja-JP";
    AssistantLanguage["SPANISH_ES"] = "es-ES";
    AssistantLanguage["SPANISH_MX"] = "es-MX";
    AssistantLanguage["SPANISH"] = "es-ES";
    AssistantLanguage["KOREAN"] = "ko-KR";
    AssistantLanguage["PORTUGUESE"] = "pt-BR";
})(AssistantLanguage || (AssistantLanguage = {}));
function mapAssistantRequestToAssistRequest({ audio, audioInConfig, audioOutConfig, debug, deviceId, deviceModelId, conversationState, deviceLocation, isNewConversation, locale, html, text, }) {
    if (audio) {
        return { audioIn: audio };
    }
    return {
        config: Object.assign(Object.assign(Object.assign(Object.assign({ audioOutConfig }, (html && {
            screenOutConfig: {
                screenMode: ScreenMode.PLAYING,
            },
        })), { deviceConfig: {
                deviceId,
                deviceModelId,
            }, dialogStateIn: Object.assign(Object.assign(Object.assign(Object.assign({}, (conversationState && { conversationState })), { languageCode: locale }), (deviceLocation && {
                deviceLocation: {
                    coordinates: deviceLocation,
                },
            })), (isNewConversation && { isNewConversation })) }), (debug && {
            debugConfig: {
                returnDebugInfo: debug,
            },
        })), (audioInConfig ? { audioInConfig } : { textQuery: text })),
    };
}
function mapAssistResponseToAssistantResponse({ audioOut, debugInfo, deviceAction, dialogStateOut, eventType, screenOut, speechResults, }) {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (audioOut && { audio: audioOut.audioData })), (debugInfo && {
        actionOnGoogle: JSON.parse(debugInfo.aogAgentToAssistantJson),
    })), (deviceAction && { action: JSON.parse(deviceAction.deviceRequestJson) })), (dialogStateOut && Object.assign({ conversationEnded: dialogStateOut.microphoneMode === MicrophoneMode.CLOSE_MICROPHONE, conversationState: dialogStateOut.conversationState, text: dialogStateOut.supplementalDisplayText }, (dialogStateOut.volumePercentage && {
        newVolume: dialogStateOut.volumePercentage,
    })))), (screenOut &&
        screenOut.format === ScreenOutFormat.HTML && {
        html: screenOut.data.toString(),
    })), (speechResults &&
        speechResults.length && { speechRecognitionResults: speechResults })), { utteranceEnded: eventType === AssistResponseEventType.END_OF_UTTERANCE });
}

export { AssistantLanguage, mapAssistResponseToAssistantResponse, mapAssistantRequestToAssistRequest };
