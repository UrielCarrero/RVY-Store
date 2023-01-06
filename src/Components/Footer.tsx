import React from 'react';
import '../Styles/Footer.css';

export const Footer = ():JSX.Element => {
    return(<>
    <div className='container-fluid footer__cmp'>
        <div className='row'>


            <div className='col-md-3 col-sm-6'>
                <h5 className="brand__name">RVY Store</h5>
                <p className='revery__desc'> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
            </div>

            <div className='col-md-3 col-sm-6 contact__info'>
                <div className="contact__us">Contact Us:</div>
                <span className='col-3'><i className="ri-map-pin-line contact__icon"></i></span>
                <p className='col-9'> Colombia, Bogotá D.C. <br/>
                 Car 12A #34B 56 Sur </p>
                <br/>

                <span><i className="ri-mail-line contact__icon"></i></span>
                <p className='email__contact'>example@email.com</p>
                <br/>

                <span><i className="ri-phone-line contact__icon"></i></span>
                <p >+57 123 4567890</p>
            </div>

            <div className='col-md-3 col-sm-6'>
                <span className='messages__ft'>We'll be pleased to receive you in our stores during our service hours!</span>
                <p> Monday - Friday: 8:00 A.M - 6:00 P.M. </p>
                <p> Saturday: 10:00 A.M - 5:00 P.M. </p>
                <p> Sunday Off</p>
            </div>

            <div className='col-md-3 col-sm-6 social__media'>
                <span className='messages__ft'>Follow us to keep up to date with our awesome events and promotions!</span> <br/>
                <div>
                    <a href='https://www.instagram.com/'><i className="ri-instagram-line social__icon"></i></a> 
                    <a href='https://www.facebook.com/'><i className="ri-facebook-fill social__icon"></i></a> 
                    <a href='https://www.youtube.com/'><i className="ri-youtube-line social__icon"></i></a> 
                    <a href='https://twitter.com//'><i className="ri-twitter-fill social__icon"></i></a> 
                </div>
                
            </div>
        </div>
        <div className='row'>
            Copyright Uriel Carrero - 2022 
        </div>
    </div>
        

    </>)
}