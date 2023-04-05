import {
  publicRequest,
  userRequest,
} from "../requestMethods";
import {
  startProductProcess,
  getProductFailure,
  getProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  updateProductSuccess,
  updateProductFailure,
  addProductSuccess,
  addProductFailure,
   } from "./productsRedux";

import {
  startUserProcess,
  loginFailure,
  loginSuccess,
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
} from "./userRedux"

//USERS
export const login = async (dispatch, user) => {
  dispatch(startUserProcess());

  try {
    const response = await publicRequest.post('/auth/login', user);

    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
}

export const getUsers = async (dispatch) => {
  dispatch(startUserProcess());

  try {
    const response = await userRequest.get('/users');

    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    dispatch(getUsersFailure());
  }
}

export const getUser = async (dispatch, id) => {
  dispatch(startUserProcess());

  try {
    const response = await userRequest.get(`/users/find/${id}`);

    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
}

export const updateUser = async (dispatch, id, updatedUser) => {
  dispatch(startUserProcess());

  try {
    const response = await userRequest.put(`/users/${id}`, updatedUser);

    dispatch(updateUserSuccess({ id, updatedUser: response.data }));
  } catch (error) {
    dispatch(updateUserFailure());
  }
}

export const deleteUser = async (dispatch, id) => {
  dispatch(startUserProcess());

  try {
    const response = await userRequest.delete(`/users/${id}`);

    dispatch(deleteUserSuccess(response.data._id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
}

export const addUser = async (dispatch, newUser) => {
  dispatch(startUserProcess());

  try {
    const response = await userRequest.post("/auth/register", newUser);

    dispatch(addUserSuccess(response.data));
  } catch (error) {
    dispatch(addUserFailure());
  }
}

//PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(startProductProcess());

  try {
    const response = await publicRequest.get('/products');

    dispatch(getProductSuccess(response.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
}

export const deleteProduct = async (dispatch, id) => {
  dispatch(startProductProcess());

  try {
    const response = await userRequest.delete(`/products/${id}`);

    dispatch(deleteProductSuccess(response.data._id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
}

export const updateProduct = async (dispatch, id, updatedProduct) => {
  dispatch(startProductProcess());

  try {
    const response = await userRequest.put(`/products/${id}`, updatedProduct);

    dispatch(updateProductSuccess({ id, updatedProduct: response.data }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
}

export const addProduct = async (dispatch, newProduct) => {
  dispatch(startProductProcess());

  try {
    const response = await userRequest.post("/products", newProduct);

    dispatch(addProductSuccess(response.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
}