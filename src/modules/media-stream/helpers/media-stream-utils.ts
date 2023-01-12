export function closeMediaStream(stream: MediaStream): void {
  stream.getTracks().forEach((track) => {
    // Define como false para que os indicadores de
    // atividade do dispositivo parem de mostrar que
    // a câmera está gravando ou transmitindo no momento.
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/enabled
    track.enabled = false;

    // Interrompe a transmissão
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
    track.stop();
  });
}
