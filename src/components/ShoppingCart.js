import React, { useState, useEffect, useContext } from 'react'
import {
    makeStyles,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Divider,
    TextField
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CART_ITEMS_LOCAL } from '../Apollo/gql/getCartItemsLocal';
import DELETE_ITEM from '../Apollo/gql/deleteItem';
import { Context } from '../Context/Context';
import setFormatCurrency from './FormatCurrency';
import copy from './CopyText';
import UPDATE_CART from '../Apollo/gql/updateCart';



const useStyles = makeStyles(theme => ({
    root: {
        //flexGrow: 1,
        //maxWidth: 752,
        //position: 'relative',
        //padding: theme.spacing(0, 2, 3),
        background: '#f0f0f0'
    },
    item: {
        backgroundColor: '#f0f0f0',
    },
    title: {
        //margin: theme.spacing(2, 0, 2),
        textAlign: 'center',
        marginTop: 10
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 2, 0),
        marginBottom: 10
    },
    text:{
        textAlign:'center', 
        margin:0,
        color:'#696969'
    }
}));

const ShoppingCart = () => {
    const classes = useStyles();
    const [dense] = useState(false);
    const [updateCart] = useMutation(UPDATE_CART)
    const [deleteID] = useMutation(DELETE_ITEM)
    const { data: { cartItems } } = useQuery(GET_CART_ITEMS_LOCAL)
    const [total, setTotal] = useState(0)
    const [dolar] = useState(75000)
    const [priceBs, setPriceBs] = useState(0)
    const { setNotification } = useContext(Context)
    useEffect(() => {
        const calculateTotal = () => {
            let number = 0
            for (let { quantity, price } of cartItems) {
                number += quantity * price;
            }
            setTotal(number)
            setPriceBs(number * dolar)
        }
        calculateTotal()
    }, [cartItems, dolar])

    const changeQuantity = (e, prev) => {
        let quantity = parseInt(e.target.value)
        updateCart({
            variables: {
                quantity,
                prev
            }
        })
    }

    const deleteItem = ({ id }) => {
        deleteID({
            variables: {
                id
            }
        })
    }
    const copyText = (input) => {
        copy(input)
        setNotification({
            open: true,
            msg: "Copiado"
        })
    }
    const cutText = (text, maxLength) => (
        text.length > maxLength
            ?
            `${text.slice(0, maxLength)}...`
            :
            text
    )
    return (
        <div className={classes.root} >
            <div className='shippingCart'>
                {cartItems.length > 0
                    ?
                    <div className={classes.item}>
                        <List dense={dense}>
                            {cartItems.map(({ id, name, price, quantity }, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography
                                        primary={cutText(name, 10)}
                                        secondary={
                                            <>
                                                <p style={{ margin: 0 }}>
                                                    ${setFormatCurrency(price)}
                                                </p>
                                                <p style={{ margin: 0 }}>
                                                    Bs.S {setFormatCurrency(price * dolar)}
                                                </p>
                                                <Divider />
                                            </>
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        <TextField
                                            type='number'
                                            name={name}
                                            style={{ width: '35px', borderRadius: '5px' }}
                                            onChange={(e) => changeQuantity(e, cartItems[index])}
                                            value={quantity}
                                            min={0}
                                        />
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(cartItems[index])}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                    </div>
                    :
                    <p style={{
                        textAlign: 'center',
                        marginTop: 10
                    }} >No hay nada en el carrito</p>
                }
            </div>
            <div className={classes.total}>
                <div >
                    <h3 style={{margin:0, textAlign:'center'}}  >
                        En Bs.
                        <IconButton onClick={() => copyText(setFormatCurrency(priceBs))}>
                            <FileCopyIcon />
                        </IconButton>
                    </h3>
                    <h4 className={classes.text} >
                        {setFormatCurrency(priceBs)}
                    </h4>

                </div>
                <div  >
                    <h3 style={{margin:0, textAlign:'center'}} >Total
                        <IconButton onClick={() => copyText(setFormatCurrency(total))}>
                            <FileCopyIcon />
                        </IconButton>
                    </h3>
                    <h4 className={classes.text} >${setFormatCurrency(total)}</h4>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;