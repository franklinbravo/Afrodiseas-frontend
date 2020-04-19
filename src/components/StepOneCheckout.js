import React  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import Address from './Address';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Spinner from '../components/Spinner';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },

        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },

    },
    addressBtn: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',

    },
    content: {
        overflowY: 'auto',
        maxHeight: 600
    },
}));

const StepOne = ({ data, setData, saveChanges, loadingSetAddress, showBtn}) => {

    const classes = useStyles();
    //const inputLabel = React.useRef();
    //const labelWidth = inputLabel.current ? inputLabel.current.clientWidth : 0
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const addAddress = () => {
        setData([...data, {
            name: '',
            lastname: '',
            address: '',
            city: '',
            state: '',
            select: ''
        }])
    }
    return (
        <div style={{ height: '95%', zIndex:1 }} >
            {
                data.length > 0 ?
                    <h2>Selecione su direccion de envio</h2>
                    :
                    <h2>Ingrese una direccion de envio</h2>
            }
            <div >
                <Grid container style={{ marginBottom: 10 }}>
                    <Grid item xs={12} >
                        <h2 component="h1" style={{ display: 'block', width: '100%', textAlign: 'center' }}>Direcciones de envio</h2>
                    </Grid>
                    <Grid item xs={12} className={classes.addressBtn}>
                        <Button variant="outlined" onClick={addAddress}>Agregar dirreccion <AddCircleOutlineIcon style={{ color: '#FE6B8B' }} /></Button>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.content}>
                <Grid container style={{ width: '100%', margin: 0 }} spacing={2}>
                    {data.map((e, i) => (
                        <Grid item xs={12} sm={4} key={i}>
                            <Address
                                data={data}
                                index={i}
                                setData={setData}
                            />
                        </Grid>
                    ))}
                    <div className={classes.addressBtn}>
                        {
                            showBtn ?
                                <Button onClick={saveChanges} >Guardar cambios</Button>
                                : null
                        }
                        {
                            loadingSetAddress ?
                                <Spinner />
                                : null
                        }
                    </div>
                </Grid>
            </div>
        </div>
    );
}

export default StepOne;