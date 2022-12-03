import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";
import swal from "sweetalert";

const url = "http://localhost:4000/api/v1/users";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      return user;
    },
  },
});

export const createUserAccountThunk = (newUser) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(url, newUser)
    .then((res) => dispatch(setUser(res.data)))
    .catch((error) => {
      swal(`error type: ${error.response.data.message}`, "", "error");
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const loginThunk = (login) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(`${url}/login`, login)
    .then((res) => {
      localStorage.setItem("token", res.data.data.token),
        localStorage.setItem("user", JSON.stringify(res.data.data.user)),
        dispatch(setUser(res.data));
    })
    .catch((error) => {
      swal(`error type: ${error.response.data.message}`, "", "error");
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
