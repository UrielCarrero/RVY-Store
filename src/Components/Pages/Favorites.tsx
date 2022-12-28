import React from 'react'
import {ClothesCard} from '../ClothesCard';
import {Link} from 'react-router-dom';

export const Favorites = ({products, userIsActive}:any) => {
    if(products.length!==0 && userIsActive){
        return(<>
    
            <h1 className='product__sec'>Favorites</h1>

            <div className='row cards__cont'>

            {products.map((item:any,index:number)=>{
                return(
                    <span key={index} className="card__cont col-md-4">
                    <ClothesCard image={item.image}
                        index={item.id}
                        price={item.price}
                        title={item.title}
                        isLoading ={ false}
                        page = {item.page}/>  
                    </span>  
            )})}

            </div>
            </>)
    }
    else if(products.length===0&&userIsActive){
        return(
            <>
                <div className='page__message'>You don't have favorite products yet</div>
            </>
        )
    }
    else if(!userIsActive){

        return(<>
        <div className='page__message'>
        <p>You're not logged please log in to check your products or <Link to='/home'>check our products and offers</Link></p>
        </div>
        </>)
    }
    else{
        return <></>
    }
    
}