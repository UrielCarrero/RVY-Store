import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Vortex} from 'react-loader-spinner';
import '../Styles/ClothesCard.css';
import { Link } from 'react-router-dom';

interface interfaceCard {
    image:string;
    index: number;
    price:string;
    title:string;
    //color_img?: string[];
    isLoading: boolean;
    page:string;
}

export const ClothesCard = (props: interfaceCard):JSX.Element => {

    if(!props.isLoading){
        return (<>
            <Card variant="outlined" sx={{ width: 290, height: 390 }}>
                <CardActionArea>
                    <Link className="card__link" to={`/productdetails/${props.index}/${props.page}`}>
                        <div className="img__container">
                            <img src={props.image} alt={`product_${props.index}`} className="card__media"/>
                            <Typography gutterBottom variant="h5" component="div" className="price__container">
                                <span className="card__price">{props.price}$ USD</span>
                            </Typography>
                        </div>
                    </Link>
                    <CardContent className="card__content">
                    
                    <Typography className="card__name" variant="body2" color="text.secondary">
                        {props.title}
                    </Typography>
    
                    
                    </CardContent>
                </CardActionArea>
            </Card>
        </>)
    }
    else{
        return(
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
        )
    }

    
    
}

/*<span>
{
    props.color_img.map((item:any,index:number):JSX.Element=>{
    return(
        <span key={index}>
            <img src={item} alt={`color_${index}`} />
        </span>
    )
})}

</span>*/