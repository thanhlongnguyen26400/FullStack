import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}


const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data)
}

const deleteUser = (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId
        }
    })
}

const editUserService = (data) => {
    return axios.put("/api/edit-user", data)
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUser, editUserService }