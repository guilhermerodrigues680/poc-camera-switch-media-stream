import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { closeMediaStream } from "../../helpers/media-stream-utils";

type VideoSource = {
  id: string;
  name: string;
};

const MediaStreamVideo = styled.video`
  display: block;

  width: 220px;
  height: 220px;

  object-fit: cover;

  border: 1px solid gray;
`;

function CameraSwitch() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream>();
  const [videoSources, setVideoSources] = useState<MediaDeviceInfo[]>([]);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [tracksInUse, setTracksInUse] = useState<MediaStreamTrack[]>([]);

  async function getVideoPermission() {
    try {
      const tempVideoPermissionStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      closeMediaStream(tempVideoPermissionStream);
    } catch (error) {
      console.error("erro em getVideoPermission:", { error });
    }
  }

  async function selectVideoSource(vs: MediaDeviceInfo) {
    try {
      console.debug("selectVideoSource", vs);
      if (!videoRef.current) {
        console.warn("videoRef nula");
        return;
      }

      stopCurrentStream();

      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          deviceId: { exact: vs.deviceId },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      mediaStreamRef.current = stream;
      videoRef.current.srcObject = stream;

      console.debug("stream", stream);

      setTracksInUse(stream.getTracks());

      stream.getTracks().forEach((t) => {
        console.debug("t.id capa", t.getSettings());
      });
    } catch (error) {
      console.error("erro no selectVideoSource:", { error });
    }
  }

  async function refreshVideoSources() {
    console.debug("refreshVideoSources");
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices);

      const videoSources = devices.filter((d) => d.kind === "videoinput");

      console.debug(videoSources);
      setVideoSources(videoSources);
    } catch (error) {
      console.error("erro no refreshVideoSources:", { error });
    }
  }

  function stopCurrentStream() {
    console.debug("parando videoTrack stream atual");

    if (!videoRef.current) {
      console.warn("videoRef nula");
      return;
    }

    // Redefine as referências ao MediaProvider para ele ser liberado.
    videoRef.current.srcObject = null;

    if (!mediaStreamRef.current) {
      console.debug("mediaStreamRef nula. Nada a parar.");
      return;
    }

    // Fecha o MediaStream
    closeMediaStream(mediaStreamRef.current);
    // Redefine as referências ao MediaStream para ele ser liberado.
    mediaStreamRef.current = undefined;

    console.debug("parado videoTrack stream atual");
  }

  function handleClickStopStream() {
    stopCurrentStream();
  }

  async function handleClickAuthorizeCameraUse() {
    try {
      await getVideoPermission();
      refreshVideoSources();
      setPermissionGranted(true);
    } catch (error) {
      alert((error as Error).message);
    }
  }

  useEffect(() => {
    console.debug("useEffect onmount");
  }, []);

  return (
    <>
      {permissionGranted ? (
        <>
          <div>
            videoSources:{" "}
            {videoSources.map((vs, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectVideoSource(vs)}
              >
                Usar: {`${vs.label} -> ${vs.deviceId} | ${vs.groupId}`}
              </button>
            ))}
          </div>

          <div>
            <button type="button" onClick={handleClickStopStream}>
              Parar câmera
            </button>
          </div>

          <div>
            Tracks em uso:
            {tracksInUse.map((t, i) => (
              <div key={i}>
                {`${t.label}: ${t.id}`} {t.getSettings().facingMode}
              </div>
            ))}
          </div>

          <div>
            <MediaStreamVideo
              ref={videoRef}
              autoPlay={true}
              muted={true}
              playsInline={true}
            ></MediaStreamVideo>
          </div>
        </>
      ) : (
        <>
          <button type="button" onClick={handleClickAuthorizeCameraUse}>
            Autorizar uso da câmera
          </button>
        </>
      )}
    </>
  );
}

export default CameraSwitch;
