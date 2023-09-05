import React from "react";
import { useSelector } from "react-redux";

function Result() {
  const { resultt } = useSelector((state) => state.speed);
  const percentage = Math.round((resultt[0]/(resultt[0] + resultt[1]))*100);
  if (!isNaN(percentage)){console.log(percentage);}
  return (
    <div className="resultCard">
      <div className="title">
        <h3>Result</h3>
        <hr />
      </div>
      <div className="resultbody">
        <h1 className="resultTitle">{resultt[0]} WPM</h1>
        <h3 className="WPM">(Words Per Minute)</h3>
        <hr className="hr"/>
      </div>
      <div>
        <div className="cardDetails">
          <div className="left">Accuracy</div>
          <div className="right percentage">%{!isNaN(percentage)?percentage:0}</div>
        </div>
        <hr className="hr"/>
      </div>
      <div>
        <div className="cardDetails">
          <div className="left">Correct Words</div>
          <div className="right correctWord">{resultt[0]}</div>
        </div>
        <hr className="hr"/>
      </div>
      <div className="cardDetails">
        <div className="left">Wrong Words</div>
        <div className="right wrongWord">{resultt[1]}</div>
      </div>
    </div>
  );
}

export default Result;
