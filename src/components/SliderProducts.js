import React from 'react'
import Slider from "react-slick";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block",position:'float'}}
			onClick={onClick}
		/>
	);
}
const SliderProducts = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 10000,
        nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />
    };
    const arr=[1,2,3,4,5]
    return (
        <Slider {...settings}>
            {arr.map((a)=>(
                <div key={a} onClick={()=>console.log(a)}>
                    <h1>{a}</h1>
                </div>
            ))}   
        </Slider>
    );
}
 
export default SliderProducts;