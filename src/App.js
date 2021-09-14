import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputString, setInputString] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalDaysTillNow, setTotalDaysTillNow] = useState();
  const [laggingHours, setLaggingHours] = useState(0);
  const [laggingMinutes, setLaggingMinutes] = useState(0);

  const calculateHandler = () => {
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
    setTotalHours(hours);
    setTotalMinutes(minutes);
    setLaggingHours(hoursLagging);
    setLaggingMinutes(minutesLagging);
  };

  return (
    <>
      <h1>Hello World.</h1>
      <div className="my-form">
        <div className="my-form-group">
          <label>Paste here</label>
          <textarea
            type="text"
            name="inputString"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            rows="5"
            cols="100"
          />
        </div>
        <div className="my-form-group">
          <label>Total Days</label>
          <input
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
        <h3>Total till now:</h3>
        <p>Total Hours: {totalHours}</p>
        <p>Total Minutes: {totalMinutes}</p>
      </div>
      <div>
        <p>
          Lagging/Ahead By: {laggingHours} Hrs : {laggingMinutes} mins
        </p>
      </div>
    </>
  );
}

export default App;
