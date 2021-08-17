import { useState } from "react";
import "./styles.css";
import { VIEWS } from "./views";
import { Finish } from "./views/Finish";
import { Play } from "./views/Play";
import { Start } from "./views/Start";

export default function App() {
  const [view, setView] = useState(VIEWS.START); //Start, Play, Finish
  return (
    <div className="App">
      {view === VIEWS.START ? <Start setView={setView} /> : null}
      {view === VIEWS.PLAY ? <Play setView={setView} /> : null}
      {view === VIEWS.FINSIH ? <Finish setView={setView} /> : null}
    </div>
  );
}
