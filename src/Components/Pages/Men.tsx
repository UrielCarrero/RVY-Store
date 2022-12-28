

import React, {useEffect, useState} from 'react';
import {ClothesCard} from '../ClothesCard';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import '../../Styles/Men.css';

export const Men = ({state, fetchProducts, loadingProducts}:any):JSX.Element => {
    
    
    let products = state.products

    const [subSection, setSubSection]=useState<string>("SETS");
    //cat_id -> hrefTarget
    //adp -> goodsId
    /*const [men, setMen] = useState<Map<string, serverValues>> (new Map([
        ["SHIRTS", {cat_id: "1980", adp: "10170797"}],
        ["BOTTOM", {cat_id: "2045", adp: "10831682"}],
        ["SETS", {cat_id: "1975", adp:"11485739"}]]));*/


    //function  fetchSheinAPI(query:interfaceQuery, parameters?:any):void {

        

        /*const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6c5fee4de1msh43eb41d44d5d065p12af6ejsn30a9218ea8eb',
                'X-RapidAPI-Host': 'unofficial-shein.p.rapidapi.com'
            }
        };*/
        
        //let url = `https://fakestoreapi.com/products/category/${query.path}`;
        //let url = `https://fakestoreapi.com/products`;
    
        /*if(typeof parameters !== "undefined"){
            for (const [key, value] of Object.entries(parameters) ){
                url = url.concat(`${key}=${value}&`);
            }
        }
        else{return}

        
    
        url = url.substring(0,url.length-1)*/
    
        /*fetch(url)
            .then(response => response.json())
            .then(response => {
                //console.log("Function:")
                //console.log(response)
                getProducts(response)
    
            })
            .catch(err => {
                console.error(err);
            });
    }*/


    //useEffect(() => {
    //    fetchSheinAPI(QUERY_PATH.products/*, men.get(subSection)*/)  
    //}, [])


    useEffect(() => {

        fetchProducts("category/men's%20clothing");
        col_filling = products? (4 - (products.length%4))*3: 0; 
    }, [subSection])

    let col_filling = products? (4 - (products.length%4))*3: 0; 

    return(<>
            <div>
                <div className='row'>
                    <div className='col-md-12 bread__crumbs'>
        
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className="breadcrumb__link" color="inherit" href="/home">
                            Home
                            </Link>
                            <Link className="crumb__subsec breadcrumb__link" color="inherit">
                            <strong>Men</strong>
                            </Link>
                        </Breadcrumbs>
        
                    </div>
                </div>
        
                <div className='row'>
        
                    <div className='col-md-12'>
                        <h1 className='product__sec'>Men</h1>
                    </div>
                </div>
                    
                <div className='row cards__cont'>
        
                    {
                    state.isLoading?
                        <span className="card__cont col-md-12">
                            <ClothesCard image={""}
                            index={0}
                            price={""}
                            title={""}
                            isLoading ={ state.isLoading}
                            page="men"/>
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
                                            page = "men"/> 
                                    </span>
                                    //color_img={color_links}
                                    /*<span key={item.goods_id} className="col-md-4">
                                        <ClothesCard image={item.goods_img}
                                            index={item.cat_id}
                                            price={item.salePrice.amountWithSymbol}
                                            name={item.goods_name}
                                            color_img={color_links}
                                            isLoading ={ isLoading}/> 
                                    </span>*/
                                    )
                                })}
                    <span className={`col-md-${col_filling}`}>
                        <div></div>
                    </span>
        
                        
                </div>
            </div>
                    
            </>)

}