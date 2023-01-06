
import React,{useState, useEffect} from 'react';
import { Carrousel } from '../Carrousel';
import '../../Styles/Home.css'

export const Home = ():JSX.Element => {


    return (<>
        <div className='container-fluid'>
            
            <div className='col-md-12'>
                <div className='row'>
                <Carrousel />
                </div>
            </div>
            <div className="mainimages__container col-md-12">
                <img className=" main__images" src="https://imgs.search.brave.com/K-XAy_4TS1TezizUv6y0uuMr9dT0rewoTN5u4cgUfYE/rs:fit:1200:1200:1/g:ce/aHR0cDovL21lZGlh/LnRpbWVvdXQuY29t/L2ltYWdlcy8xMDE3/MTQ2MDcvaW1hZ2Uu/anBn" alt="taken from timeout.com" />
                <div>
                    <p className="messages__home">Pay with our card and enjoy 40% off in clothes of our selected brands</p>
                </div>
            </div>

            <div className=" mainimages__container col-md-12">
                <img className="align-items-center main__images" src="https://imgs.search.brave.com/sCP4Xw8ZQY5BGSTiAzMQnNVaUXq5JxmhzHwVikZXKU4/rs:fit:1200:840:1/g:ce/aHR0cHM6Ly9zdGF0/aWMxLm1ha2V1c2Vv/ZmltYWdlcy5jb20v/d29yZHByZXNzL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzEw/L3NpdGVzLWNoZWFw/LWVsZWN0cm9uaWNz/LmpwZw" alt="taken from www.makeuseof.com" />
                <div>
                    <p className="messages__home">Black Friday's Offer! 45% off in our accesories</p>
                </div>
            </div>

            <div className="mainimages__container col-md-12">
                <img className="align-items-center main__images" src="https://imgs.search.brave.com/vjACIeZUN6VuqtRBJ6z7mr5da5dl43aCrhMYXDIj2dw/rs:fit:970:643:1/g:ce/aHR0cHM6Ly93d3cu/Z2xvYmFsYmx1ZS5j/b20vYnVzaW5lc3Mv/aW1hZ2VzL2FydGlj/bGU5MjY4NTEuZWNl/L0JJTkFSWS9URlNf/QXJ0aWNsZV8yMDE5/Xzk3MHg2NDMuanBn" alt="taken from www.globalblue.com" /> 
                <div>
                    <p className="messages__home">Enjoy Free Delivery paying online with our card</p>
                </div>
            </div>



        </div>

        
    </>)
}