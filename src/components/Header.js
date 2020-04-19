import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
//GQL
import { GET_CART_ITEMS_LOCAL } from '../Apollo/gql/getCartItemsLocal';
import { useQuery } from '@apollo/react-hooks';
//Img
import logo from '../assets/Afrodisia logo.png'

//Components
import DrawerList from './DrawerList'
import ShoppingCart from './ShoppingCart'
import Spinner from './Spinner';
//Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Material-ui Core
import {
    AppBar,
    Toolbar,
    makeStyles,
    fade,
    IconButton,
    Button,
    MenuItem,
    Menu,
    Badge,
    Modal,
    InputBase,
    Backdrop
} from '@material-ui/core';
import { Context } from '../Context/Context';
import { auth } from '../firebase/firebaseApp';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color:'white'
    },
    menuButton: {
        marginRight: 'auto',
    },
    title: {
        flexGrow: 1,
        marginRight: '5px',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '40%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '25%',
            minWidth: '100px'
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    btn: {
        background: '#FE6B8B'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline',
        }
    },
    paper: {
        width: '80%',
        backgroundColor: '#f0f0f0',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 2, 3),
        borderRadius: '5px',
        position: 'relative'
    },
    sectionMobile: {
        display: 'inline',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    close: {
        position: 'absolute',
        //marginTop: 3,
        right: 3

    },
    titleCartItems: {
        //margin: theme.spacing(2, 0, 2),
        textAlign: 'center',
        marginTop: 10
    },
}));

const Header = ({ history }) => {

    const { currentUser, loading } = useContext(Context)
    const { data: CartItems } = useQuery(GET_CART_ITEMS_LOCAL)
    let cartItems = CartItems.cartItems

    let quantity = { quantity: 0 }
    if (cartItems.length > 0) {
        quantity = cartItems.reduce((accumulator, currentValue) => ({ quantity: accumulator.quantity + currentValue.quantity }))

    }


    const classes = useStyles();
    const [drawerState, setdrawerState] = useState(false)
    const [openModal, setOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [search, setSearch] = useState('')
    /*
    const handleChange = event => {
      setAuth(event.target.checked);
    };
    */
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const sendSerach = (e) => {
        e.preventDefault()
        console.log(search)
    }
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleList = () => {
        setdrawerState(!drawerState)
    }
    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);

    };
    const logOut=()=>{
        handleMobileMenuClose()
        auth.signOut()
    }
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {
                !!currentUser ?
                    <div>
                        <MenuItem component={Link} to="/account" onClick={handleMobileMenuClose} >
                            <IconButton
                                aria-label="account"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <p>Cuenta</p>
                        </MenuItem>
                        <MenuItem component={Link} to="/favorites" onClick={handleMobileMenuClose}>
                            <IconButton
                                aria-label="Favorites"

                            >
                                <FavoriteIcon />
                            </IconButton>
                            <p>Favoritos</p>
                        </MenuItem>
                        <MenuItem
                            onClick={logOut}
                        >
                            <IconButton
                                aria-label="LogOut"

                            >
                                <ExitToAppIcon />
                            </IconButton>
                            <p>Salir</p>
                        </MenuItem>
                    </div>
                    :
                    <div>
                        <MenuItem component={Link} to="/login" onClick={handleMobileMenuClose}  >
                            <p>Entrar</p>
                        </MenuItem>
                    </div>
            }

        </Menu>
    );
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.bar} >

                <DrawerList
                    drawerState={drawerState}
                    handleList={handleList}
                />
                <Toolbar>
                    <IconButton edge="start" onClick={handleList} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.title}>
                        <Link to="/">
                            <img src={logo} alt="Logo" style={{ width: '200px', minWidth: '150px' }} />
                        </Link>
                    </div>

                    <form className={classes.search} onSubmit={sendSerach}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Buscar…"
                            name="search"
                            onChange={handleChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </form>
                    <div>
                        <IconButton
                            aria-label="items of you cart"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleOpenModal}
                        >
                            <Badge badgeContent={quantity.quantity} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                className={classes.modal}
                disableScrollLock={true}
            >
                <div className={classes.paper}>
                    <IconButton className={classes.close} onClick={handleCloseModal}>
                        <HighlightOffIcon />
                    </IconButton>
                    <h3 className={classes.titleCartItems}>
                        Carrito de compras
                    </h3>
                    <ShoppingCart />
                    <Button
                        variant="contained"
                        component={Link}
                        to="/checkout"
                        onClick={handleCloseModal}
                        fullWidth
                        disabled={quantity.quantity === 0}
                        className={classes.bar}
                    >
                        Comprar
                    </Button>

                </div>
            </Modal>
            <Backdrop open={loading} style={{ zIndex: 9 }} >
                <Spinner />
            </Backdrop>
        </div>
    );
}

export default withRouter(Header)