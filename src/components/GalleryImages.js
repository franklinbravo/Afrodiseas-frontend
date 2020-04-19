import React from 'react';
//import { /* makeStyles,  useTheme   */} from '@material-ui/core/styles';
import imagen from '../assets/AOA-3014-6_1000x1400.jpg'
import Slider from "react-slick";
import { useState } from 'react';
import { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import GalleryImagesExpand from './GalleryImagesExpand';
import loadingImagen from '../assets/Afrodiseas loading photo.svg'
const photos = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: imagen,
    },
    {
        label: 'Bird',
        imgPath: imagen,
    },
    {
        label: 'Bali, Indonesia',
        imgPath: imagen,
    },

];

/* const useStyles = makeStyles(theme => ({

}));
 */
const GalleryImages = ({ loading = true }) => {
    /* const classes = useStyles() */
    const [state, setState] = useState({
        nav1: null,
        nav2: null
    })
    let slider1
    let slider2
    useEffect(() => {
        setState({
            nav1: slider1,
            nav2: slider2
        });
    }, [slider1, slider2])
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    //let arr = [1, 2, 3, 4, 5, 6]
    const [index, setindex] = useState(0)
    const [open, setopen] = useState(false)
    const handleBack = () => {
        setindex(index - 1)
    }
    const handleNext = () => {
        setindex(index + 1)
    }
    const handleClose = () => {
        setopen(false)
    }
    const handleOpen = (i) => {
        setopen(true)
        setindex(i)
    }
    const maxSteps = photos.length
    return (
        <div style={{ width: '90%' }}>
            <GalleryImagesExpand
                img={photos[index]?.imgPath}
                handleBack={handleBack}
                handleNext={handleNext}
                maxSteps={maxSteps}
                open={open}
                handleClose={handleClose}
                activeStep={index}
            />
            <Slider
                asNavFor={state.nav2}
                ref={slider => (slider1 = slider)}
                {...settings}
            >
                {
                    loading ?
                        photos.map((a, i) => (
                            <div key={a} >
                                <Skeleton variant="rect" width="100%" height="100%" component="div" style={{transform:"initial"}} >
                                    <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', minHeight: 400, }}>
                                        <img src={loadingImagen} alt="" style={{ width: '100%', height: '100%' }} />
                                    </div>
                                </Skeleton>
                            </div>
                        ))
                        :
                        photos.map((a, i) => (
                            <div key={a} >
                                <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', minHeight: 400, }}>
                                    <img src={a.imgPath} alt="" style={{ width: '100%', height: '100%' }} onClick={() => handleOpen(i)} />
                                </div>

                            </div>
                        ))
                }
            </Slider>
            <br />
            <br />
            <Slider
                asNavFor={state.nav1}
                ref={slider => (slider2 = slider)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                {
                    loading ?
                    photos.map((a) => (
                        <div key={a} >
                            <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: 100}}>
                                <Skeleton  variant="rect" width="100%" height="100%"  />
                            </div>
                        </div>
                    ))
                    :
                    photos.map((a) => (
                        <div key={a} >
                            <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: 100 }}>
                                <img src={a.imgPath} alt="" style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div >
    );

}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none", marginLeft: -10 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none", position: 'float' }}
            onClick={onClick}
        />
    );
}

export default GalleryImages;