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
   } from "./productsRedux";

import {
  startUserProcess,
  loginFailure,
  loginSuccess,
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

    dispatch(updateProductSuccess({ id, response }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
}