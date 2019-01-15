export class AudioWaveform {


    
    private progress: any;
    private  remaining: any;
    width: number;
    height: number;
    smoothing: number = 2;
   

    private RMS = values => {
        return Math.sqrt(values.reduce((sum, value) => sum + Math.pow(value, 2), 0) / values.length);
    };
    private avg = values => {
        return values.reduce((sum: number, value: number) => sum + value, 0) / values.length;
    };
    private max = values => {
        return values.reduce((max: number, value: number) => Math.max(max, value), 0);
    };
    
     /**
      *
      *
      * @param {AudioBuffer} audioBuffer
      * @param {number} dataPoints
      * @returns {Float32Array}
      * @memberof AudioWaveform
      */
     createWaveformData(audioBuffer: AudioBuffer, dataPoints: number): Float32Array {
        const leftChannel = audioBuffer.getChannelData(0);
        const rightChannel = audioBuffer.getChannelData(1);
        const values = new Float32Array(dataPoints);
        const dataWindow = Math.round(leftChannel.length / dataPoints);
        for (let i = 0, y = 0, buffer = []; i < leftChannel.length; i++) {
            const summedValue = (Math.abs(leftChannel[i]) + Math.abs(rightChannel[i])) / 2;
            buffer.push(summedValue);
            if (buffer.length === dataWindow) {
                values[y++] = this.avg(buffer);
                buffer = [];
            }
        }
        return values;
    }
    /**
     *
     *
     * @param {Float32Array} data
     * @returns {string}
     * @memberof AudioWaveform
     */
    public createSVGPath(data: Float32Array):string {
        const maxValue = this.max(data);
        let path = `M 0 ${this.height} `;
        for (let i = 0; i < data.length; i++) {
            path += `L ${i * this.smoothing} ${(1 - data[i] / maxValue) * this.height} `;
        }
        path += `V ${this.height} H 0 Z`;
        return path;
    }
    /**
     *Creates an instance of AudioWaveform.
     * @param {AudioBuffer} audioBuffer
     * @param {HTMLAudioElement} audio
     * @param {SVGSVGElement} [svg]
     * @memberof AudioWaveform
     */
    constructor(public audioBuffer: AudioBuffer, public audio: HTMLAudioElement, public svg?: SVGSVGElement) {

        const w = this.svg.getAttribute('width');
        const h = this.svg.getAttribute('height');

        this.width = parseInt(w);
        this.height = parseInt(h);

        const waveformData = this.createWaveformData(audioBuffer, this.width / this.smoothing);

        this.svg.querySelector('path').setAttribute('d', this.createSVGPath(waveformData));
        this.progress = this.svg.querySelector('.aw-progress');
        this.remaining = this.svg.querySelector('.aw-remaining');
    }

    /**
     * Update the current progress and remaining elements 
     * @memberof AudioWaveform
     */
    updateAudioPosition() {
        const { currentTime, duration } = this.audio;
        const physicalPosition = currentTime / duration * this.width;
        if (physicalPosition) {
            this.progress.setAttribute('width', physicalPosition);
            this.remaining.setAttribute('x', physicalPosition);
            this.remaining.setAttribute('width', this.width - physicalPosition);
        }
    }
}
