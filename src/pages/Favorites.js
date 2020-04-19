import React from 'react'
import { Container, Grid, CardMedia, CardContent, makeStyles, Card, /* withStyles */ CardActions, IconButton } from '@material-ui/core';
import imagen from '../assets/AOA-3014-6_1000x1400.jpg'
/* import Rating from '@material-ui/lab/Rating'; */
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
/* import { useState } from 'react'; */
let products = [{
    id: '123834556',
    type: 'Mascara',
    name: 'AOA Pure Sanitizing Wipes - Mint',
    color: 'Negro',
    price: 123500,
    quantity: 5
},
{
    id: '12345856',
    type: 'Mascara',
    name: 'AOA Pure Sanitizing Wipes - Mint',
    color: 'Negro',
    price: 3,
    quantity: 5
},]

/* const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating); */
const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        width: '100%'
    },
    content: {
        position: 'relative',
        height: 'auto',
        display: 'flow-root',
        
    },
    cover: {
        width: 130
    },
    container: {

        overflowY: 'auto',
        height: '80vh',
        overflowX: 'hidden'
    },
    list: {
        marginTop: 10,
    },
    /* btn: {
        position: 'absolute',
        left: 5,
        bottom: 2
    }, */
    actions:{
        display:'flex',
        justifyContent:'space-between',
        width:'auto',

    }
}))
const Favorites = () => {
    const classes = useStyles()
    /* const [heart, setheart] = useState(4)
    const changeRating = (e) => {
        console.log(e.target.value);
        setheart(parseInt(e.target.value))
    } */
    return (
        <Container className={classes.container} >
            <Grid container spacing={2} className={classes.list}>

                <Grid item xs={12} >

                    <h1 variant="h4" style={{ margin: 5, color: '#5e5e5e' }} align="center">Mis favoritos</h1>
                </Grid>
                {products.map(({ name, price }, i) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={i} >
                        <Card className={classes.card} >

                            <CardMedia
                                component="img"
                                className={classes.cover}
                                image={imagen}
                            />

                            <CardContent className={classes.content}>
                                <h3 style={{wordWrap:'break-word'}} >{name}</h3>

                                <h3 style={{marginBottom:10}}>${price} c/u</h3>

                                {/* <StyledRating
                                    name="customized-color"
                                    defaultValue={2}
                                    getLabelText={value => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    value={heart}
                                    precision={0.5}
                                    onChange={changeRating}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                /> */}
                                <CardActions className={classes.actions} >
                                    <IconButton className={classes.btn}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                    <IconButton className={classes.btn}>
                                        <FavoriteIcon style={{ color: '#ff6d75' }} />
                                    </IconButton>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Favorites;