import React from 'react';
import SliderPromo from '../components/SliderPromo';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import BBCreamsMuestra from '../assets/Mask Group aoa bb creams muestra.png'
import BBCreams from '../assets/Mask Group aoa bb creams.png'
//import AOALips from '../assets/Mask Group aoa lips.png'
import AOAPowder from '../assets/Mask Group aoa powder.png'
import envios from '../assets/offer 20 dollars over.png'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    img: {
        width: '100%',
        height: '300px'
    },
    imgWetnWild: {
        width: '33%',
        height: '180px'
    }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SliderPromo />

            <Container style={{ marginTop: '30px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <div >
                            <img src={BBCreamsMuestra} alt="Muestra de Base" className={classes.img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div >
                            <img src={BBCreams} alt="Bases" className={classes.img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div >
                            <img src={AOAPowder} alt="Muestra de Base" className={classes.img} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ width: '100%', height: '400px' }}>
                            <img src={envios} alt="Offer" className={classes.img} />
                        </div>
                    </Grid>

                </Grid>
                
            </Container>
           
        </div>
    );
}

export default Home;