import React from 'react';

import {Route, Routes, Navigate, BrowserRouter, useParams} from 'react-router-dom';
import {Home} from './Pages/Home';
import {Men} from './Pages/Men';
import {Women} from './Pages/Women';
import {Accessories} from './Pages/Accesories';
import {Electronics} from './Pages/Electronics';
import {Checkout} from './Pages/Checkout';
import {Favorites} from './Pages/Favorites';
import {UserInfo} from './Pages/UserInfo';
import { ProductDetails } from './Pages/ProductDetails';



export const Routers = (props:any):JSX.Element => {

    const fetchLinks = new Map([
        ["men", "category/men's%20clothing"],
        ["women", "category/women's%20clothing"],
        ["electronics", "category/electronics"],
        ["accessories", "category/jewelery"]
      ]);

    const Details = (items:any) => {
        const {productId, page} = useParams();
        
        if(productId!==undefined && items.items.products !== undefined && items.items.products !== null){
            const selectedProduct = items.items.products.filter((product:any)=> product.id === parseInt(productId,10))[0]
            if(selectedProduct!==undefined && page!==undefined){
                const isInCart = props.props.state.cart.products.find((product:any)=>
                                                                    product.title === selectedProduct.title)?true:false

                let isInFavorites = props.props.state.user.favorites.find((product:any)=>
                                                                    product.title === selectedProduct.title)?true:false
                return( <ProductDetails product={selectedProduct} 
                                        page={page}
                                        addToCart={props.props.addToCart} 
                                        total_price={props.props.state.cart.total_price}
                                        userIsActive={props.props.state.user.active}
                                        setAddFlag={props.props.setAddFlag}
                                        added={props.props.state.cart.added}
                                        addFavorite = {props.props.addFavorite}
                                        removeFavorite = {props.props.removeFavorite}
                                        isInCart={isInCart}
                                        isInFavorites={isInFavorites}
                                        isLoading={false}/> )
            } 
            else if(selectedProduct===undefined && page!==undefined){
                props.props.fetchProducts(fetchLinks.get(page))
                return(<></>)
            }
            else{
                return(<></>)
            }
        }
        else{
            return(<ProductDetails product={null} 
                page={page}
                addToCart={props.props.addToCart} 
                total_price={props.props.state.cart.total_price}
                userIsActive={props.props.state.user.active}
                setAddFlag={props.props.setAddFlag}
                added={props.props.state.cart.added}
                addFavorite = {props.props.addFavorite}
                removeFavorite = {props.props.removeFavorite}
                isInCart={false}
                isInFavorites={false}
                isLoading={true}/>)
        }
        
    } 

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/home'/> } />
                <Route path='/home' element={<Home />}/>
                <Route path='/men' element={<Men state={props.props.state.products} 
                                                 fetchProducts={props.props.fetchProducts} 
                                                 loadingProducts={props.props.loadingProducts}/>}/>
                <Route path='/women' element={<Women state={props.props.state.products} 
                                                 fetchProducts={props.props.fetchProducts} 
                                                 loadingProducts={props.props.loadingProducts}/>}/>
                <Route path='/accessories' element={<Accessories state={props.props.state.products} 
                                                 fetchProducts={props.props.fetchProducts} 
                                                 loadingProducts={props.props.loadingProducts}/>}/>
                <Route path='/electronics' element={<Electronics state={props.props.state.products} 
                                                 fetchProducts={props.props.fetchProducts} 
                                                 loadingProducts={props.props.loadingProducts}/>}/>                                 
                <Route path="/productdetails/:productId/:page" element={ <Details items={props.props.state.products}/> }/>
                <Route path="/checkout" element={<Checkout stateCart={props.props.state.cart} stateUser={props.props.state.user}
                                                    removeFromCart={props.props.removeFromCart}
                                                    increaseQuantity={props.props.increaseQuantity} decreaseQuantity={props.props.decreaseQuantity}/>} />
                <Route path="/favorites" element={<Favorites products={props.props.state.user.favorites} userIsActive={props.props.state.user.active}/>}/>
                <Route path="/userinfo" element={<UserInfo userfields={props.props.state.user.user} updateUser={props.props.updateUser}
                                                    userIsActive={props.props.state.user.active}/>}/>
            </Routes>
        </BrowserRouter>)
}

export default Routers