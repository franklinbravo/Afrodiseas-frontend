import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, makeStyles, Typography, Divider, AppBar, Toolbar, IconButton, Collapse } from '@material-ui/core';
import imagen from '../assets/AOA-3014-6_1000x1400.jpg'
import ClearIcon from '@material-ui/icons/Clear';
import setFormatCurrency from './FormatCurrency'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(() => ({
    root: {
        //height: '80vh',
        marginTop: 100,
        position: 'fixed',
        backgroundColor: "#f0f0f0",
        zIndex: 9999,
        bottom: 0,
        width: '100%'

    },
    container: {
        overflowY: 'scroll',
        height: '80vh',
        overflowX: 'hidden'
    },
    list: {
        marginTop: 10,
    },
    cover: {
        width: 150,
        cursor: 'pointer'
    },
    card: {
        display: 'flex',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
        height: 150
    },
    head: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

const ListOfCards = ({ details, openDeatails, closeDeatails }) => {
    const history = useHistory()
    const classes = useStyles()
    const cutText = (text, maxLength) => (
        text.length > maxLength
            ?
            `${text.slice(0, maxLength)}...`
            :
            text
    )
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: '100%'
        }}>
            <Collapse className={classes.root} in={openDeatails} >
                <AppBar position="static" style={{ backgroundColor: "#fe6e855e" }}>
                    <Toolbar className={classes.Toolbar}>
                        <h3 style={{ margin: 5 }}>#Orden: {details.order}</h3>
                        <IconButton onClick={closeDeatails} >
                            <ClearIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container className={classes.container} >
                    <Grid container spacing={2} className={classes.list}>

                        <Grid item xs={12} className={classes.head}>
                            <Typography style={{ margin: 5 }} align="center">Fecha: {details.date} </Typography>
                            <Typography style={{ margin: 5 }} align="center">Tasa de cambio: {setFormatCurrency(details.exchangeRate)}</Typography>
                        </Grid>
                        {details.products.map(({ id, name, price, quantity }, i) => (
                            <Grid item xs={12} sm={6} key={i} >
                                <Card className={classes.card} >
                                    <CardMedia
                                        className={classes.cover}
                                        image={imagen}
                                        onClick={() => history.push(`/product/${id}`)}
                                    />
                                    <CardContent className={classes.content}>
                                        <h4 style={{ margin: 0 }}>Producto:</h4>
                                        <h4 style={{ margin: 0 }}>{cutText(name, 20)}</h4>
                                        <Divider />
                                        <h4 style={{ margin: 0 }}>Precio: ${price} c/u </h4>
                                        <Divider />
                                        <h4 style={{ margin: 0 }}>Cantidad:{quantity} </h4>
                                        <Divider />
                                        <div style={{ marginTop: 'auto' }}>
                                            <h4 style={{ margin: 0 }} >Total: </h4>
                                            <h4 style={{ margin: 0 }}>{setFormatCurrency(quantity * details.exchangeRate * price)} bs.S </h4>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Collapse>

        </div>
    )

}

export default ListOfCards;