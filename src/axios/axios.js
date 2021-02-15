import axios from "axios"

export const axiosGetInstance=() => {
  if(localStorage.getItem("token")){
    return axios.create({
      baseURL: 'http://localhost:3001/',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")}
    });
  }
  return axios.create({
    baseURL: 'http://localhost:3001/'
  });
}

