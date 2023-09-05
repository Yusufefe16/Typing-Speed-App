import { createSlice } from "@reduxjs/toolkit";
import wordData from "../data/wordData.json";
import arrayShuffle from "array-shuffle";

export const SpeedSlice = createSlice({
  name: "speed",
  initialState: {
    words: arrayShuffle(wordData.words).map((item) => {
      return { ...item, status: "" };
    }),
    timer: 60,
    start: false,
    userInput: "",
    language: "turkish",
    count: 0,
    shouldHandle:false,
    firstData: [],
    secondData: [],
    correctArray: [],
    resultt: [0, 0],
    activeIndex: 0,
  },
  reducers: {
    uploadTimer: (state, action) => {
      state.timer = action.payload;
    },
    setCorrectArray:(state,action)=>{
      state.correctArray = action.payload;
    },
    uploadShouldHandle:(state)=>{
      state.shouldHandle = !state.shouldHandle
    },
    uploadFirstData: (state, action) => {
      state.firstData = action.payload;
    },
    uploadSecondData: (state, action) => {
      state.secondData = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setLanguage: (state) => {
      if (state.language === "turkish") {
        state.language = "english";
      } else {
        state.language = "turkish";
      }
    },
    uploadIndex: (state, action) => {
      state.activeIndex += 1;
    },
    setStart: (state, action) => {
      state.start = !state.start;
    },
    incrementFirstElement: (state) => {
      state.resultt[0] += 1;
    },
    incrementSecondElement: (state) => {
      state.resultt[1] += 1;
    },
    resetResult: (state, action) => {
      state.resultt = [0, 0];
    },
    resetIndex: (state, action) => {
      state.activeIndex = 0;
    },
    resetWords: (state) => {
      state.words = arrayShuffle(wordData.words).map((item) => {
        return { ...item, status: "" };
      });
    },
  },
});

console.log(SpeedSlice.words);
export const {
  uploadTimer,
  uploadIndex,
  resetIndex,
  resetWords,
  setStart,
  setUserInput,
  incrementFirstElement,
  incrementSecondElement,
  setLanguage,
  setCount,
  uploadFirstData,
  uploadSecondData,
  setCorrectArray,
  uploadShouldHandle,
  resetResult
} = SpeedSlice.actions;

export default SpeedSlice.reducer;
