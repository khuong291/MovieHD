import {
  Action,
  User,
  SAVE_USER,
  CLEAR_USER,
  SAVE_TOKEN
} from "src/reducers/user";

export const saveToken = (token: string): Action => ({
  type: SAVE_TOKEN,
  payload: { token }
});

export const saveUser = (user: User): Action => ({
  type: SAVE_USER,
  payload: { ...user }
});

export const clearUser = (): Action => ({
  type: CLEAR_USER,
  payload: {}
});
