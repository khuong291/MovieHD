import axios from "axios";
import { API_KEY } from "../constants/keys";

const MOVIE_BASE_URL = "https://api.themoviedb.org/3/";

export const getPopular = async (page: number) => {
  const res = await axios.get(`${MOVIE_BASE_URL}movie/popular`, {
    params: {
      api_key: API_KEY
    }
  });
  const data = res.data;
  const results = data["results"];
  console.log(results);
};
