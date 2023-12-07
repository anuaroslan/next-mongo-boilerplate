// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Function to get user data from local storage
const getUserDataFromLocalStorage = () => {
  const storedData = localStorage.getItem("userName");
  return storedData !== null ? JSON.parse(storedData) : "";
};

// Function to get isLogged from local storage
const getIsLoggedFromLocalStorage = () => {
  const storedIsLogged = localStorage.getItem("isLogged");
  return storedIsLogged !== null ? JSON.parse(storedIsLogged) : false;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: getIsLoggedFromLocalStorage(),
    userName: getUserDataFromLocalStorage(),
  },
  reducers: {
    setUserAuth: (state, action) => {
      state.userName = action.payload;
      state.isLogged = true;

      localStorage.setItem("userName", JSON.stringify(action.payload));
      localStorage.setItem("isLogged", "true");
    },
    resetUserAuth: (state) => {
      state.userName = null;
      state.isLogged = false;

      localStorage.removeItem("userName");
      localStorage.removeItem("isLogged");
    },
  },
});

export const { setUserAuth, resetUserAuth } = userSlice.actions;
export default userSlice.reducer;

// // userSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const getUserDataFromLocalStorage =
//   localStorage.getItem("userName") !== null
//     ? JSON.parse(localStorage.getItem("userName")!)
//     : "";

// const getIsLoggedFromLocalStorage =
//   localStorage.getItem("isLogged") !== null
//     ? JSON.parse(localStorage.getItem("isLogged")!)
//     : false;

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     isLogged: getIsLoggedFromLocalStorage,
//     userName: getUserDataFromLocalStorage,
//   },
//   reducers: {
//     setUserAuth: (state, action) => {
//       state.userName = action.payload;
//       state.isLogged = true;

//       localStorage.setItem("userName", JSON.stringify(action.payload));
//       localStorage.setItem("isLogged", "true");
//     },
//     resetUserAuth: (state) => {
//       state.userName = null;
//       state.isLogged = false;

//       localStorage.removeItem("userName");
//       localStorage.removeItem("isLogged");
//     },
//   },
// });

// export const { setUserAuth, resetUserAuth } = userSlice.actions;
// export default userSlice.reducer;
