


import React, {useEffect, useState} from 'react';
import {ClothesCard} from '../ClothesCard';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import '../../Styles/Men.css';

export const Electronics = ({state, fetchProducts, loadingProducts}:any):JSX.Element => {
    
    
    let products = state.products

    let col_filling = products? (4 - (products.length%4))*3: 0;

    useEffect(() => {

        fetchProducts("category/electronics");
        col_filling = products? (4 - (products.length%4))*3: 0;
    }, [])

    return(<>
            <div>
                <div className='row'>
                    <div className='col-md-12 bread__crumbs'>
        
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/home">
                            Home
                            </Link>
                            <Link className="crumb__subsec" underline="hover" color="inherit" href="/electronics">
                            <strong>Electronics</strong>
                            </Link>
                        </Breadcrumbs>
        
                    </div>
                </div>
                
        
                <div className='row'>
        
                    <div className='col-md-12'>
                        <h1 className='product__sec'>Electronics</h1>
                    </div>
                </div>
                    
                <div className='row cards__cont'>
        
                    {
                    state.isLoading!?
                        <span className="card__cont col-md-12">
                            <ClothesCard image={""}
                            index={0}
                            price={""}
                            title={""}
                            isLoading ={ state.isLoading}
                            page="electronics"/>
                        </span>
                        
                        :
        
                        products.map((item:any):JSX.Element => {
                
                                    return(
                                    <span key={item.id} className="card__cont col-md-4">
                                        <ClothesCard image={item.image}
                                            index={item.id}
                                            price={item.price}
                                            title={item.title}
                                            isLoading ={ state.isLoading}
                                            page="electronics"/> 
                                    </span>
                                    )
                                })
                    }
                    <span className={`col-md-${col_filling}`}>
                        <div></div>
                    </span>
                        
                </div>
            </div>
                    
            </>)

}