import axios from 'axios'

// Login
export const Login = async (url, data) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: { 
            'Accept': 'application/json'
        }
    })
    return res;
}

// RefreshToken 
export const RefreshToken = async (url, data) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: { 
            'Accept': 'application/json'
        }
    })
    return res;
}

// Register 
export const Register = async (url, data) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: { 
            'Accept': 'application/json'
        }
    })
    return res;
}

// Get user Profile
export const getUserProfile = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { 
            "x-access-token": token,
            'Accept': 'application/json'
        }
    })
    return res;
}


export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { "x-access-token": token}
    })
    return res;
}