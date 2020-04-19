import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
//import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { Context } from '../Context/Context';
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '60vh',
        display: 'flex',
        //alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50,
        paddingBottom:200,
        
    },
    root: {
        backgroundColor: '#f0f0f0'/* theme.palette.background.paper */,
        width:'50ch',
        height:'100%',
        borderRadius:10,
        
    },
    bar:{

    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

/* function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
} */

const views = [<Register />  ,<Login />]
const LoginRegister = () => {
    const { currentUser }=useContext(Context)
    const classes = useStyles()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(!!currentUser) return <Redirect to="/" />

    
    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <div className={classes.bar}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        aria-label="simple tabs example"
                        centered
                         >
                        <Tab label="Registrarse" /* {...a11yProps(0)} */ />
                        <Tab label="Iniciar sesion" /* {...a11yProps(1)} */ />

                    </Tabs>
                </div>
                {
                    views.map((component, i) => (
                        <TabPanel value={value} index={i} key={i}>
                            {component}
                        </TabPanel>
                    ))
                }
            </div>
        </div>
    );
}

export default LoginRegister;