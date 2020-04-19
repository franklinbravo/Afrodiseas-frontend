import React from 'react'
import Slider from "react-slick";
import enviosGratis from '../assets/Envios Gratis.png'
import aoaPerfect from '../assets/AOA Perfect.png'
import banner from '../assets/Mask Group other.png'
import { makeStyles } from '@material-ui/core';

const useStyles= makeStyles((theme)=>({
    imgSliders:{
        width:'100%',
        height:'300px',
        [theme.breakpoints.up('sm')]: {
            height:'450px'
        },
    }
}))
 const imagenes=[
     {
         tittle:'Envios gratis',
         img:enviosGratis
     },
     {
        tittle:'Bases',
        img:aoaPerfect
     },
     {
        tittle:'Promo',
        img:banner
    }
 ]
function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "none", background: "red" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
    
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "none",position:'float', background: "green" }}
			onClick={onClick}
		/>
	);
}
const SliderPromo = () => {
    const classes=useStyles()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />
    };
   
    return (
        <Slider {...settings}>
            {imagenes.map(({img,tittle},index)=>(
                <div key={index}>
                    <img src={img} alt={tittle}  className={classes.imgSliders}/>
                </div>
            ))}
        </Slider>

    );
}

export default SliderPromo;