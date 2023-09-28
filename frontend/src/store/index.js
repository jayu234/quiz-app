import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import answerReducer from "./answerSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        question: questionReducer,
        answer: answerReducer,
        user: userReducer
    }
})

export default store;