import { useState } from "react";
import "./styles.css";
import { VIEWS } from "./views";
import { Finish } from "./views/Finish";
import { Play } from "./views/Play";
import { Start } from "./views/Start";

export default function App() {
  const [view, setView] = useState(VIEWS.START); //Start, Play, Finish
  const [finishMsg, setFinishMsg] = useState("");
  return (
    <div className="App">
      {view === VIEWS.START ? <Start setView={setView} /> : null}
      {view === VIEWS.PLAY ? (
        <Play setView={setView} setFinishMsg={setFinishMsg} />
      ) : null}
      {view === VIEWS.FINISH ? (
        <Finish setView={setView} finishMsg={finishMsg} />
      ) : null}
    </div>
  );
}
