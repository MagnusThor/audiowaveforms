# audiowaveforms

Visualize audio (AudioBuffer) as a hortizontal waveform using SVG elements. It displays the waveform (amplitude) , progress and remaining during audio playback.

## Install

    npm install audiowaveforms

## How to

Below is a brief description of how to use 'audiowaveforms'. As the things evolves i'll make sure that a proper documentations is available.

### Markup

Below is the SVGElement that represents (hold) the audiowavforms, embed this in your 
application.


    <svg id="audio-waves" preserveAspectRatio="none" width="2000" height="100" style="width:100%;height:100px;" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="white" />
      <stop offset="90%" stop-color="white" stop-opacity="0.75" />
      <stop offset="100%" stop-color="white" stop-opacity="0" />
    </linearGradient>
    <mask id="Mask">
      <path fill="url(#Gradient)" />
    </mask>
    <rect class="aw-progress" mask="url(#Mask)" x="0" y="0" width="0" height="100" fill="rgb(255, 106, 106)" />
    <rect class="aw-remaining" mask="url(#Mask)" x="0" y="0" width="0" height="100" fill="rgb(170, 56, 56)" />
     </svg>

### Create an instance 

    const audioEl = document.querySelector("your Audio element selector");
    const svg = document.querySelector("#audio-waves"); // as above
    const aw = new AudioWaveform(audioBuffer,audioEl, svg);

### Update the waveform 

Update the progress and remaining indicators.

    //  where 'aw' is the instance of yours

       window.setInterval( () => {
                        this.audiowaveform.updateAudioPosition();
        },1000 / 60);



### Other

See /examples folder or try this example app https://magnusthor.github.io/audiowaveforms/example/example.html