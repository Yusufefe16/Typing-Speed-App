import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  uploadIndex,
  resetIndex,
  setStart,
  setUserInput,
  resetWords,
  incrementFirstElement,
  incrementSecondElement,
  setCount,
  uploadFirstData,
  uploadSecondData,
  uploadShouldHandle,
  uploadTimer,
  resetResult
} from "../store/speedSlice";
import Timer from "./Timer";

function Indexx() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [hmwords, setHmwords] = useState(calculateHmwords(screenWidth)); // how many words
  const [changed, setChanged] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();
  const {
    words,
    timer,
    activeIndex,
    start,
    userInput,
    resultt,
    language,
    count,
    firstData,
    secondData,
    shouldHandle,
  } = useSelector((state) => state.speed);

  const handleClick = () => {
    console.log(screenWidth);
    dispatch(uploadFirstData(words.slice(count, count + hmwords)));
    dispatch(
      uploadSecondData(words.slice(count + hmwords, count + hmwords + hmwords))
    );
    dispatch(setCount(count + hmwords));
  };

  useEffect(() => {
    if (!shouldHandle) {
      handleClick();
      dispatch(uploadShouldHandle(true));
    }
  }, []);

  useEffect(() => {
    console.log(resultt);
  }, [resultt]);

  useEffect(() => {
    if (!start && timer === 20) {
      const delay = 25;
      const timerId = setTimeout(() => {
        const newHmwords = calculateHmwords(screenWidth);
        setHmwords(newHmwords);
        dispatch(setCount(0));
        setChanged(changed + 1);
        if (changed === 2) {
          dispatch(resetWords());
          setChanged(0);
        }

        handleClick();
      }, delay);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [screenWidth]);

  function calculateHmwords(screenWidth) {
    if (screenWidth > 700) {
      return 9;
    } else if (screenWidth > 600) {
      return 8;
    } else if (screenWidth > 530) {
      return 7;
    } else if (screenWidth > 500) {
      return 6;
    } else if (screenWidth > 420) {
      return 5;
    } else if (screenWidth > 320){
      return 4;
    }
    else{
      return 3;
    }
  }

  const Word = (props) => {
    const { text, active, correct } = props;

    const letterDivs = text
      .split("")
      .map((letter, index) => <span key={index}>{letter}</span>);
    if (active === true) {
      return <span className="active">{letterDivs} </span>;
    }
    if (correct === true) {
      return <span className="correct">{letterDivs} </span>;
    }
    if (correct === false) {
      return <span className="incorrect">{letterDivs} </span>;
    }

    return <span>{letterDivs} </span>;
  };

  useEffect(() => {
    if (timer === 0) {
      dispatch(setUserInput(""));
    }
  }, [timer, dispatch]);
  

  const processInput = (value) => {
    if (!start && timer !== 0) {
      console.log("start", start);
      dispatch(setStart());
      console.log("start", start);
    }

    if (value.endsWith(" ")) {
      // the user has finished this word
      const word = value.trim();

      setCorrectWordArray((dataa) => {
        const newResult = [...dataa];
        newResult[currentIndex] = word === firstData[currentIndex][language];

        if (newResult[currentIndex]) {
          dispatch(incrementFirstElement());
        } else {
          dispatch(incrementSecondElement());
        }

        return newResult;
      });

      const currentIndex = activeIndex;
      dispatch(uploadIndex());

      if (activeIndex === hmwords - 1) {
        dispatch(resetIndex());
        handleClick();
        setCorrectWordArray([]);
      }

      dispatch(setUserInput(""));
    } else {
      dispatch(setUserInput(value));
    }
  };
  const resetTimer = () => {
    dispatch(uploadTimer(60));
    if(timer !== 60){dispatch(setStart());}
    dispatch(setUserInput(""));
    setCorrectWordArray([]);
    dispatch(resetResult());
    dispatch(resetIndex());
    dispatch(resetWords());
    handleClick();
    dispatch(setCount(0));
  };

  return (
    <div>
      <Timer />

      <div className="words">
        {firstData.map((word, index) => {
          const text = word[language];
          return (
            <Word
              key={index}
              text={text}
              active={index === activeIndex}
              correct={correctWordArray[index]}
            ></Word>
          );
        })}
        <br />
        {secondData.map((word, index) => {
          const text = word[language];
          return <Word key={index} text={text}></Word>;
        })}
      </div>

      <div className="inputReset">
        <div></div>
        <input
          type="text"
          value={userInput}
          disabled={timer === 0}
          autoFocus
          onChange={(e) => processInput(e.target.value)}
        />

        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Indexx;
