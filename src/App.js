import React, {useState} from "react";
import "./styles/app.scss"
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./components/util";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player 
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        setSongs={setSongs} />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        setSongs={setSongs} 
        libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
