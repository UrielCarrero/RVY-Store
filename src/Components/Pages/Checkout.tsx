import React from 'react';
import {CheckoutCard} from '../CheckoutCard';
import {Link } from 'react-router-dom';
import '../../Styles/Checkout.css'
import { FormLabel } from '@mui/material';

interface IPropsCheckout {
    stateCart:any;
    stateUser:any;
    removeFromCart:any;
    increaseQuantity:any;
    decreaseQuantity:any;
}

export const Checkout = (props:IPropsCheckout) => {


    if(props.stateUser.active){
        return(<>
            <div className="row greet__chkcontainer">
                <span className="greet__chk">
                    <h3>Hello {props.stateUser.user?`${props.stateUser.user.name.firstname} 
                    ${props.stateUser.user.name.lastname}`: props.stateUser.user.username} </h3>
                    
                </span>
                <div><span className="triangle"></span></div>
                
            </div>
            <hr/>
            <div className="row">
                <span className="col-md-8">
                    <h3 className="your__cart">Your Cart</h3>
                    <div className='summary__chk'>
                        <span className='order__summarytl'>ORDER SUMMARY</span>
                        <div className="line">
                            <span className='summary__rside chk__items'>{props.stateCart.products.length} ITEMS</span>
                            <span className="chk__results">{props.stateCart.products.length!==0? parseFloat(props.stateCart.total_price).toFixed(2): 0} $</span>
                        </div>

                        <div className="line">
                            <span className='summary__rside'>DELIVERY:</span> 
                            <span className="chk__results">FREE</span>
                        </div>
                        <div className="line"><span className='summary__rside'>Sales tax:</span></div>
                        <div className="line">
                            <span className='summary__rside'>TOTAL</span>
                            <span className="chk__results">{props.stateCart.products.length!==0? parseFloat(props.stateCart.total_price).toFixed(2): 0} $</span>
                        </div>
                        
                    </div>
                    
                    {
                       props.stateCart.products.map((item:any, index:number)=>{
                            return(
                            <div className='card__col' key={index}>
                                <CheckoutCard 
                                    image = {item.image}
                                    index= {index}
                                    price= {item.price}
                                    title= {item.title}
                                    isLoading= {false}
                                    quantity = {item.quantity}
                                    removeFromCart = {props.removeFromCart}
                                    increaseQuantity = {props.increaseQuantity}
                                    decreaseQuantity = {props.decreaseQuantity}
                                    cart = {props.stateCart}
                                />
                            </div>
                                )
                       }) 
                    }
                </span>
                <span className="col-md-4">

                    <h3 className='usertl__chk'>User Info:</h3>
                    <label><strong>USER NAME:</strong></label><p>{props.stateUser.user.username}</p>
                    <label><strong>PHONE:</strong></label><p >{props.stateUser.user.phone}</p>
                    <label><strong>EMAIL:</strong></label><p>{props.stateUser.user.email}</p>
                    <hr/>
                    <h3 className='usertl__chk'>Delivery Info:</h3>
                    <label><strong>CITY:</strong></label><p>{props.stateUser.user.address.city}</p>
                    <label><strong>ADDRESS:</strong></label><p > {props.stateUser.user.address.street} {props.stateUser.user.address.number}</p>
                    <label><strong>ZIP-CODE:</strong></label><p >{props.stateUser.user.address.zipcode}</p>
                    
                    <Link to="/userinfo"><button className='btn btn-dark' type="button">MODIFY INFO</button></Link>
                    
                </span>

            </div>
            <br/>
        </>)
    }
    else{
        
        return(<>
        <div className='page__message'>
            <p>You're not logged please log in to check your products or <Link to='/home'>check our products and offers</Link></p>
        </div>
        
        </>)
    }
}