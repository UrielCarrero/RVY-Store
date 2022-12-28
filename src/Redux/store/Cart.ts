import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';
import { PayloadAction } from '@reduxjs/toolkit'
import { Products } from './Products';

const initialState:Types.CartState = {
    total_price: 0,
    products: [],
    date: undefined,
    userId: undefined,
    errMess: undefined,
    added: undefined
  };

  let newArray = <any>[]

export const Cart = (state=initialState, action: PayloadAction<any>) => {
    switch(action.type){
        case ActionTypes.SET_CART:
            return {...state, products:action.payload.products, date:action.payload.date, 
                userId: action.payload.userId, total_price:action.payload.total_price}
        case ActionTypes.CLEAN_CART:
            return {...state, ...initialState}
        case ActionTypes.SET_ADDFLAG:
            return {...state, added:action.payload}
        case ActionTypes.ADDTO_CART:
            newArray = <any>[]
            for(let item of state.products){
                newArray.push({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                    title: item.title
                }) 
            }

            newArray.push(action.payload.product)

            return {...state, products: newArray, total_price: action.payload.total_price}
        case ActionTypes.REMOVEFROM_CART:
            return {...state, products: action.payload.newproducts, total_price:action.payload.total_price}
        case ActionTypes.INCREASE_QUANTITY:
            newArray = <any>[]
            for(let item of state.products){
                newArray.push({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                    title: item.title
                }) 
            }
            
            let selectedItem = newArray.filter((product:any) => {
                return (product.title === action.payload.productName)})[0]
            let index = newArray.indexOf(selectedItem)
        
            console.log(`price${newArray[index].price}`)
            let newtotal_price = action.payload.total_price + newArray[index].price
            newArray[index].quantity++;

        
            return {...state, products:newArray , total_price: newtotal_price }
        case ActionTypes.DECREASE_QUANTITY:
            newArray = <any>[]
            for(let item of state.products){
                newArray.push({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                    title: item.title
                }) 
            }
            
            selectedItem = newArray.filter((product:any) => {
                return (product.title === action.payload.productName)})[0]
            index = newArray.indexOf(selectedItem)
            newtotal_price = action.payload.total_price - newArray[index].price
            if(newArray[index].quantity===1){
                newArray.splice(index,1);
            }
            else{
                newArray[index].quantity--;
            }

            return {...state, products:newArray , total_price: newtotal_price }
        case ActionTypes.ERR_CART:
            return {...state, errMess:action.payload}
        default:
            return state
    }
}