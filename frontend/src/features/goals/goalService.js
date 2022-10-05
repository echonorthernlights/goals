import axios from "axios";

const API_URL = '/api/goals/'
// create goal
const createGoal = async (goalText, token) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalText, config);
    return response.data

}
// get user goals
const getGoals = async (token) => {
    console.log(token)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data
}
// delete user goal
const deleteGoal = async (token, goalID) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalID, config);
    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService;