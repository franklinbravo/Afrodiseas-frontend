import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import logo from '../assets/Afrodiseas_logo_Dark.png'
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


const DrawerList = ({ drawerState, handleList }) => {
    const classes = useStyles();
    //const [open, setOpen] = React.useState(true);
    const [list, setList] = useState([
        { 
            text: 'Ojos', open: false, subItem: [
            { name: 'Rimel', id: 'Mascara' }, 
            { name: 'Sombras', id: 'Shadows' }, 
            { name: 'Delineador', id: 'Eyeliner' }
        ]},
        { text: 'Cara', open: false, subItem: [
            { name: 'Rubor', id: 'Blush' }, 
            { name: 'Corrector', id: 'Concealer' }, 
            { name: 'Contorno', id: 'Contour' }, 
            { name: 'Base', id: 'Fundation' }, 
            { name: 'Glitter', id: 'Glitter' }, 
            { name: 'Iluminador', id: 'Highlighter' }, 
            { name: 'Polvo', id: 'Powder' }
        ] },
        { text: 'Labios', open: false, subItem: [
            { name: 'Dinamon Lip Gloss', id: 'Dinamon-Lip-Gloss' }, 
            { name: 'Lil Pop Gloss', id: 'Lil-Pop-Gloss' }, 
            { name: 'Labial', id: 'So-Smooth-Lipstick' }, 
            { name: 'Labial liquido Mate', id: 'Wonder-Matte' }
        ] }
    ])

    const handleClick = (inputText) => {
        const Nuevalista = list.map(({ text, open, subItem }) => {
            if (text === inputText) {
                open = !open
                return {
                    text,
                    open,
                    subItem
                }
            } else {
                return {
                    text,
                    open,
                    subItem
                }
            }

        })
        setList(Nuevalista)
    };

    const selectItem = () => {
        handleList()
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            //onClick={handleList}
            onKeyDown={handleList}
        >
            <List>
                <ListItem>
                    <Link to="/">
                        <img src={logo} alt="Logo" style={{ width: '200px' }} />
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                {list.map(({ text, subItem, open }, index) => (

                    <Fragment key={text}>
                        <ListItem button onClick={() => handleClick(text)}>

                            <ListItemText primary={text} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {subItem.map(({ name, id }, index) => (
                            <Collapse in={open} key={index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} onClick={selectItem} component={Link} to={`/products/${id}`}>
                                        <ListItemText primary={name} style={{ marginLeft: 20 }} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        ))}

                    </Fragment>
                ))}

            </List>
            <Divider />
            <List>
                {['Brochas', 'Esmalte de uñas', 'Esponjas'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <div>
            <Drawer open={drawerState} onClose={handleList}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

export default DrawerList;