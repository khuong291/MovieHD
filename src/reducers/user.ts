export const SAVE_USER = "SAVE_USER";
export const CLEAR_USER = "CLEAR_USER";

export interface Action {
  type: string;
  payload: any;
}

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: number;
  favoriteGenres: number[];
}

const initialState = {
  id: "",
  name: "",
  age: 0,
  email: "",
  gender: 0,
  favoriteGenres: []
};

export const user = (state = initialState, action: Action): User => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...action.payload.user
      };
    case CLEAR_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
