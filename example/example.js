"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var audiowaveform_1 = require("../src/audiowaveform");
var ExampleApp = (function () {
    function ExampleApp(el, filePicker) {
        var _this = this;
        this.el = el;
        this.filePicker = filePicker;
        this.audio = document.createElement("audio");
        this.audio.setAttribute("autoplay", "true");
        this.filePicker.addEventListener("change", function (evt) {
            _this.audioFile = evt.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) { return _this.createSVG(e.target.result); };
            reader.readAsArrayBuffer(_this.audioFile);
        });
    }
    ExampleApp.prototype.createSVG = function (buffer) {
        var _this = this;
        var audioContext = new AudioContext();
        var source = audioContext.createBufferSource();
        return audioContext.decodeAudioData(buffer)
            .then(function (audioBuffer) {
            _this.audiowaveform = new audiowaveform_1.AudioWaveform(audioBuffer, _this.audio, _this.el);
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            window.setInterval(function () {
                _this.audiowaveform.updateAudioPosition();
            }, 1000 / 60);
            _this.audio.src = URL.createObjectURL(_this.audioFile);
        })
            .catch(console.error);
    };
    ExampleApp.prototype.addEventListener = function () { };
    return ExampleApp;
}());
(function () {
    ExampleApp.getInstance(document.querySelector("svg"), document.querySelector("input"));
});
;
