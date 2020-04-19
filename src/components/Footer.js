import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    footer:{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginBottom:'0px',
        height:'80px',
        padding:'5px',
        marginTop:'40px',
        zIndex:0
    }
}))
const Footer = () => {
    const classes = useStyles();
    return (
    <footer className={classes.footer}>
         <h4 style={{textAlign:'center'}}>Copyright © {(new Date()).getFullYear()}. Todos los Derechos Reservados. </h4>
    </footer>
    );
}
 
export default Footer;