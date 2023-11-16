import axios from "axios";
const getAllGroup = async () => {
    return await axios.get('http://localhost:8000/api/v1/group');
}

export {
    getAllGroup
}
