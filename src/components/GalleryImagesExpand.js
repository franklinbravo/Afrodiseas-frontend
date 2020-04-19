import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IconButton } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import CancelIcon from '@material-ui/icons/Cancel';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        //position:'relative'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    imgContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    btnContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    btnLeft: {
        marginRight: '-200px',
        zIndex: 9
    },
    btnRight: {
        marginLeft: '-200px',
        zIndex: 9
    },
    btnGroup: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        bottom: 10,
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    close: {
        position: 'absolute',
        marginTop:'15px',
        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
        },
        top: 6,
        right: 3,
        zIndex: 9

    }
}));
const GalleryImagesExpand = ({ img, handleBack, handleNext, activeStep, maxSteps, open, handleClose }) => {

    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={open} onClick={()=>console.log('hola')} >
            <div >
                <div style={{ position: 'relative', height: '100vh', zIndex: 9999 }} >
                    <TransformWrapper
                        defaultScale={1}
                        defaultPositionX={200}
                        defaultPositionY={100}

                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <CancelIcon color="action" fontSize="large" />
                                </IconButton>
                                <div className={classes.btnContent}>
                                    <Fab className={classes.btnLeft} onClick={() => {
                                        resetTransform()
                                        setTimeout(handleBack, 500)
                                    }} disabled={activeStep === 0}>
                                        <ArrowLeftIcon fontSize="large" color="secondary" />
                                    </Fab>
                                    <TransformComponent  >
                                        {/* <div className={classes.imgContent}> */}
                                            <img src={img} alt="test" className={classes.img} />
                                        {/* </div> */}
                                    </TransformComponent>
                                    <Fab className={classes.btnRight} onClick={() => {
                                        resetTransform()
                                        setTimeout(handleNext, 500)
                                    }}
                                        disabled={activeStep === maxSteps - 1}>
                                        <ArrowRightIcon fontSize="large" color="secondary" />
                                    </Fab>
                                </div>
                                <div className={classes.btnGroup} >

                                    <IconButton onClick={zoomIn}>
                                        <ZoomInIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton onClick={resetTransform}>
                                        <ZoomOutMapIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton onClick={zoomOut}>
                                        <ZoomOutIcon fontSize="large" />
                                    </IconButton>

                                </div>
                            </>
                        )}
                    </TransformWrapper>
                </div>
            </div>
        </Backdrop>
    )
}

export default GalleryImagesExpand;