// we create an audio context
const audioContext = new AudioContext();

const xhr = new XMLHttpRequest();
xhr.open("GET", "audiofile.mp3", true);
xhr.responseType = "arraybuffer";
xhr.onload = () => {
  // Create an AudioWorkletNode with the registered module
  audioContext.decodeAudioData(xhr.response, (decodedData) => {
    const source = audioContext.createBufferSource();
    source.buffer = decodedData;
    source.loop = true;

    source.connect(audioContext.destination);
    source.start();

    // audioContext.audioWorklet.addModule("delay.js").then(() => {
    //   const workletNode = new AudioWorkletNode(audioContext, "delay", {
    //     numberOfOutputs: 2,
    //   });

    //   source.connect(workletNode);
    //   source.start();

    //   workletNode.connect(audioContext.destination);
    // });
  });
};
xhr.send();
