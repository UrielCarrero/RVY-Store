
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import '../../Styles/ProductDetails.css'
import {Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {Vortex} from 'react-loader-spinner';



export const ProductDetails = ({total_price,product, page, addToCart, userIsActive, setAddFlag, added, isInCart, addFavorite, removeFavorite, isInFavorites,isLoading}:any) => {
    console.log(isLoading)
    if(isLoading===false){

    const [isModelOpen, setIsModelOpen]=useState(false)

    useEffect(()=>{
        console.log(product)
        if(added==="clicked"){
            toggleModal()
        }
    },[added])

    const valAddToCart = () => {
        if(userIsActive&&(added!=="clicked")){
            addToCart({
                id: product.id,
                quantity: 1,
                price: product.price,
                image: product.image,
                title: product.title
            }, total_price, isInCart )
        } 
        toggleModal()          
    }

    const Favorites = () => {
        if(!isInFavorites && userIsActive){
            addFavorite({
                id: product.id,
                price: product.price,
                image: product.image,
                title: product.title,
                page: page
            })
        } 
        else if(isInFavorites && userIsActive){
            removeFavorite({
                id: product.id,
                price: product.price,
                image: product.image,
                title: product.title,
                page: page
            })
        }
        else{
            toggleModal()
        }
                  
    }

    const toggleModal = () => {
        setIsModelOpen(!isModelOpen)
    }

    
        return (<>
            <h1 className="det__title">Product Details</h1>
            <div className='col-md-12 bread__crumbs'>
                
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                    Home
                    </Link>
                    <Link underline="hover" color="inherit" href={`/${page}`}>
                    <span className="page__details">{page}</span>
                    </Link>
                    <Link underline="hover" color="inherit">
                    <h3 className="crumb__subsec"><strong>{product.title}</strong></h3>
                    </Link>
                </Breadcrumbs>
        
            </div>
        
            <Card>
                <div className='row'>
                    <div className="col-md-6 imgdetails__container">
                        <img src={product.image} alt={`${product.title} image`} />
                        
                    </div>
                    <div className="col-md-6">
                        <CardContent>
                            <Typography className="dettitle__container">
                                <span><strong>{product.title}</strong></span> <br/><br/>
                                <span><strong>${product.price} US</strong></span>
                            </Typography>
                            
                            <Typography className="detdescription__container">
                                <span>{product.description}</span>
                            </Typography>
        
                            <button className="col-md-6 detadd__button"
                                    type="button" 
                                    onClick={()=>{
                                        setAddFlag("clicked")
                                        valAddToCart()}
                                    }>
                                Add to Cart
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                            <button className={`col-md-2 det__favorites ${isInFavorites?"selected__favorite":""}`}
                                    type="button"
                                     onClick={()=>{
                                        Favorites()
                                     }}>
                                <i className="ri-heart-fill"></i>
                            </button>
                        </CardContent>
                    </div>
                </div>
                
                
        
            </Card>
            <div>
                <Modal isOpen={isModelOpen} toggle={toggleModal} onClosed={()=>{setAddFlag("false")}}>
                    <ModalHeader className="modal__header" toggle={toggleModal}>
                        {userIsActive?
                            <label>Successful Operation</label>:
                            <label>You're Not Logged</label>
                        }
                        </ModalHeader>
                    <ModalBody>
                        <form name="myform">
                            {userIsActive?
                                <label className='modal__message'> <strong>{`${product.title}`}</strong> was Successfully Added to the Cart </label>:
                                <label className='modal__message'> Please Log In Before to Pick Your Products </label> 
                            }
                        </form> 
                    </ModalBody>
                </Modal>
            </div>
            </>)
    }
    else{
        return(
            <div className='row cards__cont'>
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
            </div>
            )
    }

    
}