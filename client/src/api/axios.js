import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: "https://task1-production-bab1.up.railway.app/api",
=======
  baseURL: "https://task1-xusg.onrender.com/api",
>>>>>>> bc0088d3891a93840f5b7de8f9fe1d2f48331630
});


// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
