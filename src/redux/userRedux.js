import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    users: [],
    user: null,
    fetchData: false,
  },
  reducers: {
    startUserProcess: (state) => {
      state.isFetching = true;
    },
    //LOGIN
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.isFetching = false;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET USER
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserSuccess: (state, action) => {
      const userIndex = state.users.findIndex(user => user._id === action.payload.id);

      state.users[userIndex] = action.payload.updatedUser;
      state.isFetching = false;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUserSuccess: (state, action) => {
      const userIndex = state.users.findIndex(user => user._id === action.payload.id);

      state.users[userIndex] = action.payload.updatedUser;
      state.isFetching = false;
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.isFetching = false;
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state, action) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.users = [];
      state.user = null;
      state.fetchData = action.payload;
    },
    setFetchData: (state, action) => {
      state.fetchData = action.payload;
    }
  }
});

export const {
  startUserProcess,
  loginSuccess,
  loginFailure,
  getUsersSuccess,
  getUsersFailure,
  getUserSuccess,
  getUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  addUserSuccess,
  addUserFailure,
  logout,
  setFetchData,
} = userSlice.actions;
export default userSlice.reducer;