import React, { useEffect } from "react";
import { uploadTimer, setLanguage } from "../store/speedSlice";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const { timer, start, resultt, language } = useSelector((state) => state.speed);

  const dispatch = useDispatch();

  useEffect(() => {
    let timerInterval;

    if (start && timer > 0) {
      timerInterval = setInterval(() => {
        dispatch(uploadTimer(timer - 1));
      }, 1000);
    }

    console.log("start:", start);

    return () => {
      clearInterval(timerInterval);
    };
  }, [start, timer, dispatch]);



  return (
    <div >
      <div className="timer">
        <div
        className={`language ${language === "turkish" ? "tr" : "en"}`}
        onClick={()=>dispatch(setLanguage())}>
        {language === "turkish" ? "TR": "EN"}
        </div>
        <div className="time">
          <h1>{timer}</h1>
        </div>
        <div className="result">
          <h1>{`${resultt[0]} - ${resultt[1]}`}</h1>
        </div>
      </div>
    </div>
  );
}

export default Timer;
