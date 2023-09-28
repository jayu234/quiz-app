/*
 
    This API fetches the quiz data from https://opentdb.com

*/

import axios from "axios";

const getQuestions = async () => {
    axios.defaults.withCredentials = false
    const response = await axios.get("https://opentdb.com/api.php?amount=15");
    return response.data;
}

const questionService = { getQuestions };

export default questionService;