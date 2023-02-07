import { Product } from "../../utils/types";
import { AppDispatch } from "../store";
import { getProductsAPI } from "./app.api";
import * as types from "./app.types";

export interface IProductRequest {
  type: typeof types.PRODUCT_REQUEST;
}

export interface IProductError {
  type: typeof types.PRODUCT_ERROR;
}

export interface IGetProductSuccess {
  type: typeof types.GET_PRODUCTS_SUCCESS;
  payload: Product[];
}

export type AppAction = IProductRequest | IProductError | IGetProductSuccess;

//action creators
const productRequest = (): IProductRequest => {
  return { type: types.PRODUCT_REQUEST };
};

const productError = (): IProductError => {
  return { type: types.PRODUCT_ERROR };
};

const getProductSuccess = (data: Product[]): IGetProductSuccess => {
  return { type: types.GET_PRODUCTS_SUCCESS, payload: data };
};

export const getProducts = (): any => async (dispatch: AppDispatch) => {
  dispatch(productRequest());
  try {
    let data = await getProductsAPI();
    if (data) {
      dispatch(getProductSuccess(data));
    }
  } catch (e) {
    dispatch(productError());
  }
};
