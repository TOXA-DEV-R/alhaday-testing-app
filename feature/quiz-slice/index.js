/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { getLargest } from "../../utilities";

const initialState = {
  list: [],
  analyzeResult: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getListData(state, { payload: { data } }) {
      state.list = data;
    },
    controlQuiz(state, { payload: { type, id } }) {
      switch (type) {
        case "ISNOT":
          state.list = state.list.map((quiz) => {
            if (id === quiz.id)
              return {
                ...quiz,
                isNot: true,
                isYes: false,
                sometimes: false,
                isClicked: true,
              };
            else return quiz;
          });
          break;
        case "ISYES":
          state.list = state.list.map((quiz) => {
            if (id === quiz.id)
              return {
                ...quiz,
                isNot: false,
                isYes: true,
                sometimes: false,
                isClicked: true,
              };
            else return quiz;
          });
          break;
        case "SOMETIMES":
          state.list = state.list.map((quiz) => {
            if (id === quiz.id)
              return {
                ...quiz,
                isNot: false,
                isYes: false,
                sometimes: true,
                isClicked: true,
              };
            else return quiz;
          });
          break;
        default:
          return state;
      }
    },
    getResult(state, { payload: { data } }) {
      const list = state.list;

      let notTotal = 0;
      let trueTotal = 0;
      let sometimesTital = 0;

      for (const key in list) {
        if (list[key].isNot === true) {
          trueTotal++;
        }

        if (list[key].isYes === true) {
          notTotal++;
        }

        if (list[key].sometimes === true) {
          sometimesTital++;
        }
      }
      console.log(notTotal, trueTotal, sometimesTital);
      console.log(getLargest(notTotal, trueTotal, sometimesTital));
      state.analyzeResult = data.filter((item) => {
        return item.content === getLargest(notTotal, trueTotal, sometimesTital);
      })[0];
    },
  },
});

export const { controlQuiz, getListData, getResult } = quizSlice.actions;

export default quizSlice.reducer;
