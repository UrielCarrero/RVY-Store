
import React,{Component, useEffect} from 'react';
import {NavigationBar} from './NavigationBar';
import {Routers} from './Routers';
import {Footer} from './Footer';
import { connect } from 'react-redux';
import { fetchProducts, loadingProducts, emailValidation, setValidationState, passwordValidation, logout,
  postUser, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setAddFlag, addFavorite, removeFavorite, updateUser } from '../Redux/ActionCreator';
import { RootState, AppDispatch } from '../Redux/store/ConfigureStore';
import * as Types from '../Redux/Types';

interface IPropsMain {
    state: any;
    fetchProducts: (path:string) => void;
    loadingProducts: (payload:boolean) => void;
    emailValidation: (email:string) => void;
    setValidationState: (state:string) => void;
    passwordValidation: ({email,password}:any) => void;
    logout: () =>void;
    postUser : ({email,password}:any) => void;
    addToCart : (product:{}, total_price:number, isInCart:boolean) => void;
    removeFromCart : (productName:string, cart:any) => void;
    increaseQuantity : (total_price:number, productName:string) => void;
    decreaseQuantity : (total_price:number, productName:string) => void;
    setAddFlag: (value:string) => void;
    addFavorite: (product:any) => void;
    removeFavorite: (product:any) => void;
    updateUser: (user:any, id:number) => void;
}

const mapStateToProps = (state:RootState) => {
    return ({
      state: state
    });
  };
const mapDispatchToProps = (dispatch:AppDispatch) => {
    return ({
        fetchProducts: (path:string) => {dispatch(fetchProducts(path))},
        emailValidation: (email:string) => {dispatch(emailValidation(email))},
        loadingProducts: (payload:boolean) => {dispatch(loadingProducts(payload))},
        setValidationState: (state:string) => {dispatch(setValidationState(state))},
        passwordValidation: ({email,password}:any) => {dispatch(passwordValidation({email,password}))},
        logout: () => {dispatch(logout())},
        postUser: ({email,password}:any) => {dispatch(postUser({email,password}))},
        addToCart : (product:any, total_price:number, isInCart:boolean) => {dispatch(addToCart(product, total_price, isInCart))},
        removeFromCart : (productName:string, cart:any) => {dispatch(removeFromCart(productName, cart))},
        increaseQuantity : (total_price:number, productName:string) => {dispatch(increaseQuantity(total_price, productName))},
        decreaseQuantity : (total_price:number, productName:string) => {dispatch(decreaseQuantity(total_price, productName))},
        setAddFlag: (value:string) => {dispatch(setAddFlag(value))},
        addFavorite: (product:any) => {dispatch(addFavorite(product))},
        removeFavorite: (product:any) => {dispatch(removeFavorite(product))},
        updateUser: (user:any, id:number) => {dispatch(updateUser(user, id))}
    });
  };

const MainPage = (props:IPropsMain) => {
    useEffect(() => {
        //men's%20clothing
        //women's%20clothing
        //fetchProducts("category/men's%20clothing");
    }, []);
  
    return (
        <>
            <NavigationBar state={props.state.user} emailValidation={props.emailValidation} 
                            setValidationState={props.setValidationState} passwordValidation={props.passwordValidation}
                            logout={props.logout} postUser={props.postUser}/>
            <div>
                <Routers props={props} />
            </div>
            <Footer />
        </>
      )
  };

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);