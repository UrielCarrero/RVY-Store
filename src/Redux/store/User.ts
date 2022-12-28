import { PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';
import { truncate } from 'fs';

const initialUserState = {
    active:false,
    registered_email: false,
    user: {
        id: undefined,
        email:"",
        username:"",
        password:"",
        name:{
            firstname:"",
            lastname:"",
        },
        address:{
            city:"",
            street:"",
            number:-1,
            zipcode:"",
            geolocation:{
                lat:"",
                long:"",
            }
        },
        phone:""
    },
    errMess: "",
    validationProcess:"not started",
    favorites: []
}

export const User = (state = initialUserState  , action:PayloadAction<any>):Types.IUserState => {

    switch(action.type){

        case ActionTypes.SET_USER:
            return {...state, user:action.payload, active:true, errMess:""}
        case ActionTypes.SET_EMAILSTATE:

            return {...state, registered_email:action.payload.result, user:{...state.user, email:action.payload.email}}
        case ActionTypes.ADDFAVORITE:
            let copyFavorites = <any>[]
            let item:any
            if(state.favorites.length!==0){
                for(item of state.favorites){
                    copyFavorites.push({
                        id: item.id,
                        price: item.price,
                        image: item.image,
                        title: item.title, 
                        page: item.page
                    }) 
                }
    
                copyFavorites.push(action.payload)
            }
            else{
                copyFavorites[0]={...action.payload}
            }
            
            

            return {...state, favorites:copyFavorites}
        case ActionTypes.REMOVEFAVORITE:
            copyFavorites = []
 
            for(item of state.favorites){
                copyFavorites.push({
                    id: item.id,
                    price: item.price,
                    image: item.image,
                    title: item.title,
                    page: item.page
                }) 
            }
            
            let selectedItem = copyFavorites.filter((product:any) => {
                return (product.title === action.payload.title)})[0]
            let index = copyFavorites.indexOf(selectedItem)

            copyFavorites.splice(index,1);

            return {...state, favorites:copyFavorites}

        case ActionTypes.SET_VALIDATIONSTATE:
            return {...state, validationProcess:action.payload}
        case ActionTypes.LOGOUT_USER:
                return {...state, ...initialUserState}
        case ActionTypes.ERR_USER:
            return {...state, errMess:action.payload}
        default:
            return state
    }

}