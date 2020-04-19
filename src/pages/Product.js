import React, { useContext, useEffect } from 'react';
import GalleryImages from '../components/GalleryImages';
import { Container, Grid, TextField, MenuItem, IconButton, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import SliderProducts from '../components/SliderProducts';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import getProduct from '../Apollo/gql/getProduct'
import { Context } from '../Context/Context';
import { Skeleton } from '@material-ui/lab';
import ADD_TO_CART from '../Apollo/gql/addToCart'
const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const useStyles = makeStyles(theme => ({
    btnQuantity: {
        borderRadius: 50,
        //border: '1px solid black',
        width: 150,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 10,
    },
    numberBox: {
        width: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft: '1px solid rgb(200, 200, 200)',
        borderRight: '1px solid rgb(200, 200, 200)'
    },
    container: {
        width: '100%',
        height: '100%',
        minHeight: '80vh'
    },
    btnBuy: {
        marginTop: 15,
        height: 50,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: '#ffffff'
    }
}));

const Product = () => {
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
    const history = useHistory()
    const { id } = useParams()
    const { data, loading } = useQuery(getProduct, {
        variables: {
            id
        },
        fetchPolicy: "cache-and-network",
    })
    const [quantity, setQuantity] = useState(1)
    const classes = useStyles()
    const changeColor = (e) => {
        if (e.target.value) {
            history.push(`/product/${e.target.value}`)
        }

    }

    useEffect(() => {
        /* setLoading(loading) */
    }, [/* setLoading, loading */])

    const add = () => {
        addToCart({
            variables: {
                productInput: data.getProduct,
                quantity
            }
        })
    }

    return (
        <Container className={classes.container}>
            <Grid container style={{ marginTop: 30 }} >
                <Grid item xs={12} sm={7} lg={6} style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <GalleryImages
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={5} lg={6} style={{
                    padding: 10,
                    paddingTop: 50
                }}>

                    {
                        loading ?
                            <Skeleton style={{ marginLeft: 5, marginTop: 10 }} variant="text" width={200} height={50} />
                            :
                            <h1 style={{ marginLeft: 5 }}>{data.getProduct.name}</h1>
                    }

                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <StyledRating
                            name="customized-color"
                            defaultValue={2}
                            getLabelText={value => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                        />
                    </Box>
                    <TextField
                        select
                        label="Color"
                        fullWidth
                        variant="outlined"
                        style={{ backgroundColor: 'white' }}
                        onChange={changeColor}
                        value={!loading ? data?.getProduct?.id : ""}

                    >
                        <MenuItem value="">Ninguno</MenuItem>

                        {
                            !loading ?
                                data.getProduct.colors.map(({ id, color }, index) => (
                                    <MenuItem value={id} key={index}>{color}</MenuItem>
                                ))
                                : null
                        }
                    </TextField>
                    {!loading ?
                    <h2  variant="h5" style={{ margin: 10 }}> ${data.getProduct.price}</h2>
                    : null
                    }
                        <div className={classes.btnQuantity} >
                            <IconButton onClick={() => setQuantity(quantity - 1)} disabled={quantity < 1 || loading}>
                                <RemoveIcon />
                            </IconButton>
                            <div className={classes.numberBox} >
                                <p style={{ fontSize: 30, margin: 0 }}>{quantity}</p>
                            </div>
                            <IconButton onClick={() => setQuantity(quantity + 1)} disabled={loading} >
                                <AddIcon />
                            </IconButton>
                        
                    </div>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={quantity < 1 || loading}
                        className={classes.btnBuy}
                        onClick={add}
                    >
                        Agregar al carrito
                        </Button>
                    <Button
                        fullWidth
                        disabled={quantity < 1 || loading}
                        style={{ marginTop: 15, height: 50 }}
                    >
                        <FavoriteIcon fontSize="large" style={{ color: '#ff6d75' }} />
                        Agregar a favoritos
                        </Button>

                    {
                        loading ?
                            <>
                                <Skeleton variant="text" width={100} />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                            </>
                            :
                            //Colocar datos del backend
                            <>

                                <h1>Detalles</h1>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi ipsam voluptates vel praesentium impedit? Tempore eaque possimus, reiciendis illum, officiis enim quasi inventore molestias esse error odio iure assumenda ipsam.</p>
                            </>
                    }

                </Grid>
                <Grid item xs={12} >
                    <SliderProducts />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Product
