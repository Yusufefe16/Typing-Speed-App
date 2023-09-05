import React from "react";
import './App.css'
import Indexx from "./components/Indexx";
import { useSelector } from "react-redux";
import Result from "./components/Result";
import Footer from "./components/Footer";

function App() {

  const { timer } = useSelector((state) => state.speed);

  return (
    <div className="App">
      <div class="bg-image"></div>
      <Indexx/>
      {timer === 0 ? <Result/> : null}
      <Footer/>
    </div>
  );
}

export default App;
