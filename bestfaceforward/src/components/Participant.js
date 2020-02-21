import React, { useState, useEffect, useRef } from 'react';


const Participant = ({ participant }) => {
  console.log(participant)
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [dataTracks, setDataTracks] = useState([]);
  const [vHeight, setVHeight] = useState(0);
  const [vWidth, setVWidth] = useState(0);
  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    var vid = document.getElementById("participant");
    setVHeight(vid.videoWidth);
    setVWidth(vid.videoHeight);
  })

  useEffect(() => {
    setVideoTracks(Array.from(participant.videoTracks.values()));
    setAudioTracks(Array.from(participant.audioTracks.values()));
    setDataTracks(Array.from(participant.dataTracks.values()));

    const trackSubscribed = track => {
      if (track.kind === 'data'){
        setDataTracks(dataTracks => [...dataTracks, track]);
        // if (localStorage.getItem("candidate")){
          track.on('message', data => {
            console.log("TEST123");
            console.log(data);
          });
        // }

      }
      else if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      }
      else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);
  return (
    <div className="participant bg-dark">
      <h3>{participant.identity}</h3>
        <video id = "participant" ref={videoRef} autoPlay muted />
      <audio ref={audioRef} autoPlay={false} muted={true} />
    </div>
  );


};

export default Participant;
