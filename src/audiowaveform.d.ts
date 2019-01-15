export declare class AudioWaveform {
    audioBuffer: AudioBuffer;
    audio: HTMLAudioElement;
    svg?: SVGSVGElement;
    private progress;
    private remaining;
    width: number;
    height: number;
    smoothing: number;
    private RMS;
    private avg;
    private max;
    createWaveformData(audioBuffer: AudioBuffer, dataPoints: number): Float32Array;
    createSVGPath(data: Float32Array): string;
    constructor(audioBuffer: AudioBuffer, audio: HTMLAudioElement, svg?: SVGSVGElement);
    updateAudioPosition(): void;
}
