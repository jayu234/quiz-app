import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../api/userApi";

const init ={
    data: {},
    isLoading: false,
    success: false,
    isError: false,
    message: ''
}

const initialState = {
    userData: init,
    savedData: init,
    quizHistory: {...init, data: []},
    quizDetails: init
}

// ThunkAPI for user Login
export const login = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        try {
            return await userService.login(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// ThunkAPI for saving quiz data
export const saveQuizData = createAsyncThunk(
    'user/saveData',
    async (data, thunkAPI) => {
        try {
            return await userService.saveQuizData(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// ThunkAPI for fetching all the quiz data
export const getAllQuiz = createAsyncThunk(
    'user/quizHistory',
    async (userId, thunkAPI) => {
        try {
            return await userService.getAllQuiz(userId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            // Managing state for user login 
            .addCase(login.pending, (state) => {
                state.userData.isLoading = true
                state.userData.success = false
                state.userData.isError = false
                state.userData.message = ''
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userData.isLoading = false
                state.userData.success = true
                state.userData.data = action.payload.result
                state.userData.isError = false
                state.userData.message = ''
            })
            .addCase(login.rejected, (state, action) => {
                state.userData.isLoading = false
                state.userData.success = false
                state.userData.data = {}
                state.userData.isError = true
                state.userData.message = action.payload
            })
            // Managing state while sending the quiz data 
            .addCase(saveQuizData.pending, (state) => {
                state.savedData.isLoading = true
                state.savedData.success = false
                state.savedData.isError = false
                state.savedData.message = ''
            })
            .addCase(saveQuizData.fulfilled, (state, action) => {
                state.savedData.isLoading = false
                state.savedData.success = true
                state.savedData.data = action.payload.result
                state.savedData.isError = false
                state.savedData.message = ''
            })
            .addCase(saveQuizData.rejected, (state, action) => {
                state.savedData.isLoading = false
                state.savedData.success = false
                state.savedData.data = {}
                state.savedData.isError = true
                state.savedData.message = action.payload
            })
            // Managing while fetching the quiz data of a user 
            .addCase(getAllQuiz.pending, (state) => {
                state.quizHistory.isLoading = true
                state.quizHistory.success = false
                state.quizHistory.isError = false
                state.quizHistory.message = ''
            })
            .addCase(getAllQuiz.fulfilled, (state, action) => {
                state.quizHistory.isLoading = false
                state.quizHistory.success = true
                state.quizHistory.data = action.payload.result
                state.quizHistory.isError = false
                state.quizHistory.message = ''
            })
            .addCase(getAllQuiz.rejected, (state, action) => {
                state.quizHistory.isLoading = false
                state.quizHistory.success = false
                state.quizHistory.data = {}
                state.quizHistory.isError = true
                state.quizHistory.message = action.payload
            })
    }
})

export const { resetState } = userSlice.actions

export default userSlice.reducer;