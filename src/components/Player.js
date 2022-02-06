import React, {useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ( {currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs}) => {
  //Ref
  const audioRef = useRef(null);

  //Use Effect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if(song.id === currentSong.id){
        return {
          ...song,
          active: true,
        };
      } else{
          return{
            ...song,
            active: false,
          };
        }
    });
    setSongs(newSongs);
  }, [currentSong])

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration: duration})
  }

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value});
  }

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs [(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex -1) % songs.length === -1) {
        setCurrentSong(songs [songs.length -1]);
        return;
      }
      setCurrentSong(songs [(currentIndex - 1) % songs.length]);
    }
  }

  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }

  //State
  const [songInfo, setSongInfo] = useState ({
    currentTime: 0,
    duration: 0,
  });

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input 
          min={0} 
          max={songInfo.duration || 0} 
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range" />
        <p>{(songInfo.duration) ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" onClick={() => skipTrackHandler('skip-back')} size ="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size ="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward" onClick={() => skipTrackHandler('skip-forward')} size ="2x" icon={faAngleRight} />
      </div>
      <audio 
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={() => skipTrackHandler("skip-forward")}
        ref={audioRef} 
        src={currentSong.audio}></audio>
    </div>
  );
}

export default Player;