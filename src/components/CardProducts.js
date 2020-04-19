import React, { Fragment, useContext } from 'react'
import { 
    Card, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button, 
    makeStyles,
    IconButton
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMutation } from '@apollo/react-hooks';
import ADD_TO_CART from '../Apollo/gql/addToCart'
import setFormatCurrency from './FormatCurrency';
import { Context } from '../Context/Context';
import FavoriteIcon from '@material-ui/icons/Favorite';
import imagen from '../assets/AOA-3014-6_1000x1400.jpg'
import afrodiseasLogo from '../assets/Afrodiseas logo.png'
import { useHistory } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        background:'#f0f0f0'
    },
    media: {
        height: 340,
    },
    actions:{
        display:'flex',
        justifyContent:'space-between',
        background:'#f0f0f0'
    },
    content:{
        backgroundColor:'#94919187',
        position:'absolute',
        bottom:0,
        width:'-webkit-fill-available',
        color:'white'
    },
    area:{
        position:'relative'
    },
    loadingImg:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:100
    }
});
const CardProducts = ({ loading, data }) => {
    const history=useHistory()
    const classes = useStyles();
    const { setNotification } = useContext(Context)
    const [addToCart] = useMutation(ADD_TO_CART, {
        onCompleted(status) {
            console.log(status.addToCart);
            if (status.addToCart === "ADD_TO_CART_SUCCESS") {
                setNotification({
                    open: true,
                    msg: 'Se ha agregado al carrito'
                })
            } else {
                setNotification({
                    open: true,
                    msg: 'Hubo un error'
                })
            }

        }
    })

    const add = (productInput) => {
        addToCart({ variables: { productInput } })

    }
    const goToProduct=()=>{
        history.push(`/product/${data.id}`)
    }
    return (
        <Fragment>

            <Card className={classes.root}>
                <CardActionArea className={classes.area} onClick={goToProduct}>
                    {!loading ? (
                        <CardMedia
                            component="img"
                            alt=""
                            className={classes.media}
                            image={imagen}
                            title={data.name}
                        />) : 
                        <Skeleton variant="rect" width="100%" height={340} className={classes.loadingImg}>
                            <img src={afrodiseasLogo} alt="Loading" className={classes.img}/>
                        </Skeleton>
                            }
                    <CardContent className={classes.content}>
                        {!loading ? (
                            <h2 >
                                {data.name}
                                <br />
                                ${setFormatCurrency(data.price)}
                            </h2>

                        ) : <Skeleton variant="text" height={40} />}
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions} >
                    {!loading  ? (
                        <>
                            <Button size="small" style={{ color: '#696969' }} onClick={() => { add(data) }} >
                                <AddShoppingCartIcon /> Agregar al carrito
                            </Button>
                            <IconButton className={classes.btn}>
                                <FavoriteIcon style={{ color: '#ff6d75' }}  />
                            </IconButton>
                        </>
                    ) : 
                    <>
                        <Skeleton variant="text" width="55%" height={40} />
                        <Skeleton variant="text" width="15%" height={40} />
                    </>
                    }

                </CardActions>
            </Card>
        </Fragment>
    );
}

export default CardProducts;