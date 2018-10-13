import axios from "axios";
import { Base_url } from "./constant";

const instance = axios.create({
  baseURL: Base_url,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const login = data => {
  return axios.post(Base_url + "/auth/local", data);
};

export const GetDataAnggota = (skip = "0", searchkey = "", limit = "9") => {
  const _start = skip * limit;
  return instance.get(
    `/anggotas?nama_contains=${searchkey}&_limit=${limit}&_start=${_start}`
  );
};

export const getAnggotaDetail = id => {
  return instance.get(`/anggotas/${id}`);
};

export const getRatingParameter = id => {
  return instance.get(`ratings/parameter`);
};

export const postRating = data => {
  return instance.post(`ratings`, data);
};
