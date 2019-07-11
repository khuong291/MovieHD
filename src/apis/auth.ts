import axios from "axios";
import { User } from "src/reducers/user";

const BASE_URL = "https://radiant-dusk-57430.herokuapp.com/";

export const register = async (user: User, password: string) => {
  const res = await axios.post(`${BASE_URL}api/auth/register`, {
    name: user.name,
    age: user.age,
    email: user.email,
    gender: user.gender,
    favoriteGenres: user.favoriteGenres,
    password
  });
  const data = res.data;
  return data;
};

export const login = async (userName: string, password: string) => {
  return true;
};
