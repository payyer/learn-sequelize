import axios from "axios";
const registerNewUser = async (email, password, password2, userName) => {
    return await axios.post('http://localhost:8000/api/v1/user/register', { email, password, password2, userName });
}

const loginUser = async (email, password) => {
    return await axios.post('http://localhost:8000/api/v1/user/login', { email, password });
}

const fecthAllUser = async (page, limit) => {
    return await axios.get(`http://localhost:8000/api/v1/user?page=${page}&limit=${limit}`);
}

const deleteUser = async (user) => {
    return await axios.delete(`http://localhost:8000/api/v1/user/${user.id}`);
}

const createUserWithAdmin = async (userData) => {
    return await axios.post('http://localhost:8000/api/v1/user/create-user-admin', { ...userData })
}


export { registerNewUser, loginUser, fecthAllUser, deleteUser, createUserWithAdmin };