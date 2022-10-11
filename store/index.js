/** @format */

const { configureStore } = require("@reduxjs/toolkit");
import modalSlice from "../feature/modal-slice";
import quizSlice from "../feature/quiz-slice";

const store = configureStore({
  reducer: {
    quizzes: quizSlice,
    modal: modalSlice,
  },
});

export default store;
