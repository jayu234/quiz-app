import { createSlice } from "@reduxjs/toolkit";

// intialization of the state
const init = {
    data: Array(15).fill({ selected: "", correct: "" }),
}

// Answer slice
const answerSlice = createSlice({
    name: 'answer',
    initialState: init,
    reducers: {
        // Reducer to reset the  state
        resetState: (state) => {
            state.data = Array(15).fill({ selected: "", correct: "" })
        },
        // Reducer for updating the 'answer' state
        updateAnswer: (state, action) => {
            const { id, selected, correct } = action.payload;
            state.data[id] = { selected, correct };
        }
    }
})

export const { updateAnswer, resetState } = answerSlice.actions

export default answerSlice.reducer;