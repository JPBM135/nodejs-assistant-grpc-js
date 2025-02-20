import { loadSync } from '@grpc/proto-loader';
import { getProtoPath } from 'google-proto-files';
import { loadPackageDefinition } from '@grpc/grpc-js';

// Indicates the type of event.
var AssistResponseEventType;
(function (AssistResponseEventType) {
    // No event specified.
    AssistResponseEventType[AssistResponseEventType["EVENT_TYPE_UNSPECIFIED"] = 0] = "EVENT_TYPE_UNSPECIFIED";
    // This event indicates that the server has detected the end of the user's
    // speech utterance and expects no additional speech. Therefore, the server
    // will not process additional audio (although it may subsequently return
    // additional results). The client should stop sending additional audio
    // data, half-close the gRPC connection, and wait for any additional results
    // until the server closes the gRPC connection.
    AssistResponseEventType[AssistResponseEventType["END_OF_UTTERANCE"] = 1] = "END_OF_UTTERANCE";
})(AssistResponseEventType || (AssistResponseEventType = {}));
// Audio encoding of the data sent in the audio message.
// Audio must be one-channel (mono).
var AudioInEncoding;
(function (AudioInEncoding) {
    // Not specified. Will return result [google.rpc.Code.INVALID_ARGUMENT][].
    AudioInEncoding[AudioInEncoding["ENCODING_UNSPECIFIED"] = 0] = "ENCODING_UNSPECIFIED";
    // Uncompressed 16-bit signed little-endian samples (Linear PCM).
    // This encoding includes no header, only the raw audio bytes.
    AudioInEncoding[AudioInEncoding["LINEAR16"] = 1] = "LINEAR16";
    // [`FLAC`](https://xiph.org/flac/documentation.html) (Free Lossless Audio
    // Codec) is the recommended encoding because it is
    // lossless--therefore recognition is not compromised--and
    // requires only about half the bandwidth of `LINEAR16`. This encoding
    // includes the `FLAC` stream header followed by audio data. It supports
    // 16-bit and 24-bit samples, however, not all fields in `STREAMINFO` are
    // supported.
    AudioInEncoding[AudioInEncoding["FLAC"] = 2] = "FLAC";
})(AudioInEncoding || (AudioInEncoding = {}));
// Audio encoding of the data returned in the audio message. All encodings are
// raw audio bytes with no header, except as indicated below.
var AudioOutEncoding;
(function (AudioOutEncoding) {
    // Not specified. Will return result [google.rpc.Code.INVALID_ARGUMENT][].
    AudioOutEncoding[AudioOutEncoding["ENCODING_UNSPECIFIED"] = 0] = "ENCODING_UNSPECIFIED";
    // Uncompressed 16-bit signed little-endian samples (Linear PCM).
    AudioOutEncoding[AudioOutEncoding["LINEAR16"] = 1] = "LINEAR16";
    // MP3 audio encoding. The sample rate is encoded in the payload.
    AudioOutEncoding[AudioOutEncoding["MP3"] = 2] = "MP3";
    // Opus-encoded audio wrapped in an ogg container. The result will be a
    // file which can be played natively on Android and in some browsers (such
    // as Chrome). The quality of the encoding is considerably higher than MP3
    // while using the same bitrate. The sample rate is encoded in the payload.
    AudioOutEncoding[AudioOutEncoding["OPUS_IN_OGG"] = 3] = "OPUS_IN_OGG";
})(AudioOutEncoding || (AudioOutEncoding = {}));
// Possible modes for visual screen-output on the device.
var ScreenMode;
(function (ScreenMode) {
    // No video mode specified.
    // The Assistant may respond as if in `OFF` mode.
    ScreenMode[ScreenMode["SCREEN_MODE_UNSPECIFIED"] = 0] = "SCREEN_MODE_UNSPECIFIED";
    // Screen is off (or has brightness or other settings set so low it is
    // not visible). The Assistant will typically not return a screen response
    // in this mode.
    ScreenMode[ScreenMode["OFF"] = 1] = "OFF";
    // The Assistant will typically return a partial-screen response in this
    // mode.
    ScreenMode[ScreenMode["PLAYING"] = 3] = "PLAYING";
})(ScreenMode || (ScreenMode = {}));
// Possible formats of the screen data.
var ScreenOutFormat;
(function (ScreenOutFormat) {
    // No format specified.
    ScreenOutFormat[ScreenOutFormat["FORMAT_UNSPECIFIED"] = 0] = "FORMAT_UNSPECIFIED";
    // Data will contain a fully-formed HTML5 layout encoded in UTF-8, e.g.
    // `<html><body><div>...</div></body></html>`. It is intended to be rendered
    // along with the audio response. Note that HTML5 doctype should be included
    // in the actual HTML data.
    ScreenOutFormat[ScreenOutFormat["HTML"] = 1] = "HTML";
})(ScreenOutFormat || (ScreenOutFormat = {}));
// Possible states of the microphone after a `Assist` RPC completes.
var MicrophoneMode;
(function (MicrophoneMode) {
    // No mode specified.
    MicrophoneMode[MicrophoneMode["MICROPHONE_MODE_UNSPECIFIED"] = 0] = "MICROPHONE_MODE_UNSPECIFIED";
    // The service is not expecting a follow-on question from the user.
    // The microphone should remain off until the user re-activates it.
    MicrophoneMode[MicrophoneMode["CLOSE_MICROPHONE"] = 1] = "CLOSE_MICROPHONE";
    // The service is expecting a follow-on question from the user. The
    // microphone should be re-opened when the `AudioOut` playback completes
    // (by starting a new `Assist` RPC call to send the new audio).
    MicrophoneMode[MicrophoneMode["DIALOG_FOLLOW_ON"] = 2] = "DIALOG_FOLLOW_ON";
})(MicrophoneMode || (MicrophoneMode = {}));
const PROTO_ROOT_DIR = getProtoPath('..');
const proto = loadSync('google/assistant/embedded/v1alpha2/embedded_assistant.proto', {
    includeDirs: [PROTO_ROOT_DIR],
});
const { google } = loadPackageDefinition(proto);
const embeddedAssistantPb = google.assistant.embedded.v1alpha2.EmbeddedAssistant;

export { AssistResponseEventType, AudioInEncoding, AudioOutEncoding, MicrophoneMode, ScreenMode, ScreenOutFormat, embeddedAssistantPb };
