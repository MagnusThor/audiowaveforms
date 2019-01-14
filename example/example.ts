import { AudioWaveform } from '../src/audiowaveform';
class ExampleApp {
    audiowaveform: AudioWaveform
    audio: HTMLAudioElement;
    audioFile: any;
    createSVG(buffer: ArrayBuffer) {
        let audioContext = new AudioContext();
        const source = audioContext.createBufferSource();
        return audioContext.decodeAudioData(buffer)
            .then( (audioBuffer:AudioBuffer ) => {
                this.audiowaveform = new AudioWaveform(audioBuffer, this.audio, this.el);
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                window.setInterval( () => {
                        this.audiowaveform.updateAudioPosition();
                },1000 / 60)  ; 
                this.audio.src = URL.createObjectURL(this.audioFile);

            })
            .catch(console.error);
    }
    constructor(public el: SVGSVGElement, public filePicker: HTMLInputElement) {
        
        this.audio = document.createElement("audio");
        this.audio.setAttribute("autoplay","true")    
    
        this.filePicker.addEventListener("change", (evt: any) => {
            this.audioFile  = evt.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => this.createSVG(e.target.result);
            reader.readAsArrayBuffer(this.audioFile);
        });
    }
    static  getInstance(el: SVGSVGElement,filePicker: HTMLInputElement): ExampleApp{
            return new this(el,filePicker);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ExampleApp.getInstance(document.querySelector("svg"), document.querySelector("input"));

});
