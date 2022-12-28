import React from 'react';
import Slider from 'react-slick';

import '../Styles/Carrousel.css'

const Home_Messages = [
    {
        title: 'Shop Now, Relax Later',
        subtitle: 'Make your December extra easy. Plus, Members get free shipping. Shop Now.'
    },
    {
        title: 'Free Shipping + Returns, Free Membership, Exclusive Products',
        subtitle: 'Join Now.'
    },
    {
        title: 'Member Days Sale | 20% Off Select Styles',
        subtitle: 'Log in and use our special code at checkout.'
    }
]

export const Carrousel = ():JSX.Element => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1, 
        autoplaySpeed: 10000,
        autoplay: true,
        draggable: false,
      };
      return (
      <>
        <div className="homeslider__container">
            <Slider {...settings}>
                {Home_Messages.map((item, index):JSX.Element => {
                    return(
                        <div className="homeslider__content" key={index}>
                            <div >{item.title}</div>
                            <div>{item.subtitle}</div>
                        </div>)
                })}
            </Slider>
        </div>
        
      </>
      );
}