import React from 'react';

import Card from '@mui/material/Card';
import {Vortex} from 'react-loader-spinner';
import '../Styles/CheckoutCard.css';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../Redux/ActionCreator';

interface interfaceCard {
    image:string;
    index: number;
    price:string;
    title:string;
    isLoading: boolean;
    quantity: number;
    removeFromCart: any;
    increaseQuantity: any;
    decreaseQuantity: any;
    cart: any;
}

export const CheckoutCard = (props: interfaceCard):JSX.Element => {

    if(!props.isLoading){
        return (<>
            <Card className="checkoutcard__container" sx={{ width: 0.9, margin:3, border: 1 }}>

                    <div className="row">
                        <span className="col-sm-5 card__img">
                            <img src={props.image} alt={`product_${props.index}`} className="checkout__img"/>
                        </span>
                        <span className="col-sm-7 chkcard__cont">
                        
                            <div className="headerchk__container">
                                <div className="card__name2 col-10">{props.title}</div>
                                <div className="col-4" onClick={() => {props.removeFromCart(props.title, props.cart.products)}}>
                                    <i className="icon__remove ri-close-line"></i></div>
                            </div>
                            <div className="price__container">
                                <span className="">{`${(parseFloat(props.price)*props.quantity).toFixed(2)}`}$ USD</span>
                            </div>
                            <div  className="quantity__container">
                                <span className="">Quantity: {props.quantity}</span>
                            </div>
                            
                            <div className="moreless__container">
                                <div className="icons__container">
                                    <span onClick={() => {props.increaseQuantity( props.cart.total_price, props.title)}}>
                                        <i className="icon__check ri-add-fill"></i></span>
                                    <span onClick={() => {props.decreaseQuantity( props.cart.total_price, props.title)}}>
                                        <i className="icon__check ri-subtract-line"></i></span>
                                </div>
                            </div>
                            
                            
                        </span>
                    </div>
                    
            </Card>
        </>)
    }

    else{
        return(
        <div className="vortex">
            <Vortex
            visible={true}
            height="180"
            width="180"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['gray', 'black', 'gray','black', 'black', 'grey']}
          />
          <h3>Loading...</h3>
        </div>
        )
    }

    
    
}
