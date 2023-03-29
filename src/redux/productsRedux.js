import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    startProductProcess: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    //GET ALL
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.products.splice(
         state.products.findIndex(item => item._id === action.payload),
         1,
      );
      state.isFetching = false;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProductSuccess: (state, action) => {
      const productIndex = state.products.findIndex(item => item._id === action.payload.id);

      state.products[productIndex] = action.payload.updatedProduct;
      state.isFetching = false;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.isFetching = false;
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const {
  startProductProcess,
  getProductSuccess,
  getProductFailure,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductSuccess,
  updateProductFailure,
  addProductSuccess,
  addProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;