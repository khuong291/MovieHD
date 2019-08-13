import axios from "axios";
import { User } from "src/reducers/user";

const BASE_URL = "https://radiant-dusk-57430.herokuapp.com/";

export const register = async (
  name: string,
  age: number,
  email: string,
  gender: number,
  favoriteGenres: number[],
  password: string
) => {
  const res = await axios.post(`${BASE_URL}api/auth/register`, {
    name: name,
    age: age,
    email: email,
    gender: gender,
    favoriteGenres: favoriteGenres,
    password
  });
  const data = res.data;
  return data;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}api/auth/login`, {
    email,
    password
  });
  const data = res.data;
  return data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}api/auth/me`, {
    headers: {
      "x-access-token": token
    }
  });
  const user: User = {
    ...res.data,
    token
  };
  return user;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const users: User[] = await axios.get(`${BASE_URL}users`, {
    headers: {
      "x-access-token": token
    }
  });
  console.log(users);
};

getAllUsers();
