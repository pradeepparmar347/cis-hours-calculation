import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [inputString, setInputString] = useState("");
  const [totalDaysTillNow, setTotalDaysTillNow] = useState();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [laggingHours, setLaggingHours] = useState(0);
  const [laggingMinutes, setLaggingMinutes] = useState(0);
  const [isAhead, setIsAhead] = useState(true);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

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

    setHours(hours);
    setMinutes(minutes);
    let totalExpectedHours = totalDaysTillNow * 8;
    if (hours >= totalExpectedHours) {
      hoursLagging = hours - totalExpectedHours;
      minutesLagging = minutes;
      setIsAhead(true);
    } else {
      hoursLagging = totalExpectedHours - hours - 1;
      minutesLagging = 60 - minutes;
      setIsAhead(false);
    }

    setLaggingHours(hoursLagging);
    setLaggingMinutes(minutesLagging);
  };

  return (
    <>
      {isAhead && totalDaysTillNow ? (
        <Confetti width={width} height={height} />
      ) : null}
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
              Total hours till yesterday: {hours} Hrs : {minutes} mins
            </p>
            <p>
              Lagging/Ahead By:{" "}
              <span className={isAhead ? "ahead" : "lagging"}>
                {laggingHours} Hrs : {laggingMinutes} mins
              </span>
            </p>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default App;
