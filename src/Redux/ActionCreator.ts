import * as Types from './Types';
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../Assets/baseURL';
import { json } from 'stream/consumers';
import { Type } from 'typescript';

export const loadingProducts = (payload:boolean):Types.ActionStore => {
    const action = {
        type : ActionTypes.LOADING_PRODUCTS,
        payload : payload,
    }
    return action;
}

export const setProducts = (products:any):Types.ActionStore => {

    const action = {
        type: ActionTypes.SET_PRODUCTS,
        payload : products
    }
    return action;
}


export const errMessage = (message:string):Types.ActionStore => {
    const action = {
        type: ActionTypes.ERR_MESSAGE,
        payload: message
    }
    return action
}

export const fetchProducts = (path:string) => (dispatch:any) => {

    dispatch(loadingProducts(true))
    fetch("https://fakestoreapi.com/products/".concat(path))
            .then(response => response.json())
            .then(response => {
                dispatch(setProducts(response))      
            })
            .catch(err => {
                console.log(err)
                dispatch(errMessage(err));
            });
} 

export const setUser = (user:any) => {
    const action={
        type: ActionTypes.SET_USER,
        payload: user
     }
    return action
}

export const logoutUser = () => {
    const action={
        type: ActionTypes.LOGOUT_USER,
        payload: null
     }
    return action
}

export const cleanCart = () => {
    const action={
        type: ActionTypes.CLEAN_CART,
        payload: null
     }
    return action
}

export const logout = () => (dispatch:any) => {
    dispatch(logoutUser())
    dispatch(cleanCart())
}

export const errUser = (err:string) =>{
    const action={
        type: ActionTypes.ERR_USER,
        payload: err
     }
    return action
} 

export const setEmailState = (result:boolean, email:string) => {
    const action={
        type: ActionTypes.SET_EMAILSTATE,
        payload: {result: result, email: email}
     }
    return action
}

export const setValidationState = (state:string) => {
    const action={
        type: ActionTypes.SET_VALIDATIONSTATE,
        payload: state
     }
    return action
}

export const postUser = ({email ,password}:any) => (dispatch:any) => {
    let newuser:Types.IUserProps = {
        email:email,
        username:email.split('@',1),
        password:password,
        name:{
            firstname:'',
            lastname:''
        },
        address:{
            city:'',
            street:'',
            number: undefined,
            zipcode:'',
            geolocation:{
                lat:'',
                long:''
            }
        },
        phone:''}
    fetch('https://fakestoreapi.com/users',{
        method:"POST",
        body:JSON.stringify(newuser)
    })
        .then((response)=>response.json())
        .then((response)=>{
            newuser.id=response.id
            dispatch(setUser(newuser))
            dispatch(getsetCart(response.id))
            dispatch(setValidationState("validated user"))
        })
        .catch(err => {
            dispatch(errUser(err));
        });
}

export const updateUser = (user:any, id:number) => (dispatch:any) => {

    if(id<10){
        fetch(`https://fakestoreapi.com/users/${id}`,{
        method:"PUT",
        body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(res=>dispatch(setUser({...user, id:id})))
        .catch(err => {
        console.log(err)
        dispatch(errUser(err));
    })
    }
    
}

export const emailValidation = (email:string) => (dispatch:any) => {
    fetch("https://fakestoreapi.com/users")
    .then(response => response.json())
    .then(response => {
        const validation = response.find(( user:Types.IUserProps)=>{
            if(user.email===email){
                return true;
            }
            })
        dispatch(setEmailState(validation===undefined?false:true, email))
        dispatch(setValidationState(validation===undefined?"email not found":"found email"))
    })
    .catch(err => {
        console.log(err)
        dispatch(errUser(err));
    });
}

export const passwordValidation = ({email ,password}:any) => (dispatch:any) => {
    
    fetch("https://fakestoreapi.com/users")
    .then(response => response.json())
    .then(response => {
        const user = response.find(( user:Types.IUserProps)=>{return (user.email === email)})
        if (user.password === password){
            dispatch(setUser(user))
            dispatch(setValidationState("validated user"))
            dispatch(getsetCart(user.id))
        }
        else{
            dispatch(errUser("Wrong password, please ingress it again."))
        }

    })
    .catch(err => {
        console.log(err)
        dispatch(errUser(err));
    });
}

export const assignCart = (car:Types.CartState) => {
    const action = {
        type: ActionTypes.SET_CART,
        payload: car
    }
    return action
}

export const getsetCart = (userId: number) => (dispatch:any) => {
    fetch("https://fakestoreapi.com/carts/user/".concat(userId.toString(10)))
        .then(response => response.json())
        .then((response => {
            if(response.length === 0)
            {dispatch(assignCart({
                total_price:0,
                products:[],
                date: new Date().toJSON().slice(0, 10),
                userId: userId
            }))}
            else{
                let total_price = dispatch(updateCartPrice(response[0]))
                
            }
        }))
}

export const updateCartPrice = (cart:Types.CartState) => (dispatch:any) => {
    let total_price = 0;
    let products:Array<any>=[];
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(res=>{
        for (let item of cart.products){
            total_price += (res[item.productId+1].price  * item.quantity)
            products.push({id:item.productId, 
                            quantity: item.quantity,
                            price:res[item.productId+1].price, 
                            image:res[item.productId+1].image, 
                            title:res[item.productId+1].title})
        }
        cart.products = products
        dispatch(assignCart({...cart, total_price:total_price}))
    })
}

export const addToCart = (product:any, total_price:number, isInCart:boolean) => (dispatch:any) => {

    if(!isInCart){
        
        let newtotal_price = total_price===0?parseFloat(product.price):total_price + parseFloat(product.price)
        const action = {
            type: ActionTypes.ADDTO_CART,
            payload: {product: product, total_price:parseFloat(newtotal_price.toFixed(2)), isInCart: isInCart}
        }
        dispatch(action)
    }
    else{
        dispatch(increaseQuantity(total_price, product.title))
    }
    

}

export const setAddFlag = (value:string) => {

    const action = {
        type: ActionTypes.SET_ADDFLAG,
        payload: value
    }
    return action
}

export const removeFromCart = (productName:string, products:any)  => {


    let newproducts= products.filter((product:any) => {return (product.title !== productName)})
    let newtotal_price = 0;
    newproducts.map((item:any)=>{
        newtotal_price += item.price*item.quantity
    })
    const action = {
        type: ActionTypes.REMOVEFROM_CART,
        payload: {newproducts:newproducts, total_price:newtotal_price}
    }
    return action
}

export const increaseQuantity = (total_price:number, productName:string) => {

    const action = {
        type:ActionTypes.INCREASE_QUANTITY,
        payload: {productName:productName, total_price:parseFloat(total_price.toFixed(2))}
    }
    return action
}

export const decreaseQuantity = ( total_price:number, productName:string) => {
    const action = {
        type:ActionTypes.DECREASE_QUANTITY,
        payload: {productName:productName, total_price:parseFloat(total_price.toFixed(2))}
    }
    return action
}

export const addFavorite = (product:any) => {
    const action = {
        type: ActionTypes.ADDFAVORITE,
        payload: product
    }
    return action
}

export const removeFavorite = (product:any) => {
    const action = {
        type: ActionTypes.REMOVEFAVORITE,
        payload: product
    }
    return action
}