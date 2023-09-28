import axios from "axios";

const BASE_URI = import.meta.env.VITE_BACKEND

// API for login a user
const login = async (data)=>{
    axios.defaults.withCredentials = true
    const response = await axios.post(`${BASE_URI}/user/login`, data);
    return response.data;
}

// API for sending a Quiz data to the server
const saveQuizData = async (data) => {
    axios.defaults.withCredentials = true
    const response = await axios.post(`${BASE_URI}/quiz/create`, data);
    return response.data;
}

// API for fetching all the quiz of a user   
const getAllQuiz = async (userId) => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${BASE_URI}/quiz/all?user=${userId}`);
    return response.data;
}

const userService = {saveQuizData, login, getAllQuiz};

export default userService;