import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';
import { PayloadAction } from '@reduxjs/toolkit'

const initialState:Types.StateStore = {
    isLoading: true,
    errMess: "",
    products: {},
    productPage: ""
  };

export const Products = (state=initialState, action:PayloadAction<any>):Types.StateStore => {

    switch(action.type) {
        case ActionTypes.LOADING_PRODUCTS:
          return {
            ...state,
            isLoading: action.payload, errMess: "", products: null
          };
        case ActionTypes.ERR_PRODUCTS:
          return {
            ...state,
            isLoading: false,
            errMess: action.payload,
            products: null
          };
        case ActionTypes.SET_PRODUCTS:
            return {
              ...state,
              isLoading: false,
              errMess: "",
              products: action.payload
            };
        default:
          return state;
}

}