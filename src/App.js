import { Paper } from "@material-ui/core";
import { useState } from "react";
import "./App.css";

function App() {
  const [inputString, setInputString] = useState("");
  const [totalDaysTillNow, setTotalDaysTillNow] = useState();
  const [laggingHours, setLaggingHours] = useState(0);
  const [laggingMinutes, setLaggingMinutes] = useState(0);

  const calculateHandler = () => {
    if (!inputString || !totalDaysTillNow) {
      alert("Provide all inputs");
      return;
    }
    let arr = inputString.replaceAll(" ", "").replaceAll("\t", "").split("min");
    let hours = 0;
    let minutes = 0;
    let hoursLagging = 0;
    let minutesLagging = 0;

    arr.forEach((el) => {
      let tempString = el.split("hrs,");
      hours += +tempString[0];
      if (tempString[1]) minutes += +tempString[1];
    });

    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
    let totalExpectedHours = totalDaysTillNow * 9;
    // if(hours > -1) {
    hoursLagging = hours - totalExpectedHours + 1;
    minutesLagging = 60 - minutes;
    // }
    setLaggingHours(hoursLagging);
    setLaggingMinutes(minutesLagging);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} className="my-container">
        <h1>Welcome to cis hours calculator...</h1>
        <div className="my-form">
          <div className="my-form-group">
            <label className="my-input-label">Paste here</label>
            <textarea
              className="my-input"
              type="text"
              name="inputString"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              rows="5"
              width="80%"
            />
          </div>
          <div className="my-form-group">
            <label className="my-input-label">Total Working Days</label>
            <input
              className="my-input"
              type="text"
              name="totalDaysTillNow"
              value={totalDaysTillNow}
              onChange={(e) => setTotalDaysTillNow(e.target.value)}
            />
          </div>
          <div className="my-form-actions">
            <button className="my-submit-btn" onClick={calculateHandler}>
              Calculate
            </button>
          </div>
        </div>
        <div>
          <p>
            Lagging/Ahead By: {laggingHours} Hrs : {laggingMinutes} mins
          </p>
        </div>
      </Paper>
    </div>
  );
}

export default App;
