import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionService from "../api/questionApi";

const initialState = {
    data: [],
    isLoading: true,
    success: false,
    isError: false,
    message: '',
}

// ThunkAPI for fetching quiz data from https://opentdb.com
export const getQuestions = createAsyncThunk(
    'question/fetch',
    async (_, thunkAPI) => {
        try {
            return await questionService.getQuestions();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Question slice
const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        resetState: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            // Managing 'questions' state while fetching the data
            .addCase(getQuestions.pending, (state) => {
                state.isLoading = true
                state.success = false
                state.isError = false
                state.message = ''
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false
                state.success = true
                state.data = action.payload.results
                state.isError = false
                state.message = ''
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.isLoading = false
                state.success = false
                state.data = []
                state.isError = true
                state.message = action.payload
            })
    }
})
export const { resetState } = questionSlice.actions
export default questionSlice.reducer