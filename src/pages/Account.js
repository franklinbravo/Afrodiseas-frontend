import React, { useState, useEffect, useContext } from 'react'
import Orders from '../components/Orders';
import { Container, Button, makeStyles, Grid } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Address from '../components/Address';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_USER_DATA from '../Apollo/gql/getUserData';
import { auth } from '../firebase/firebaseApp';
import { Skeleton } from '@material-ui/lab';
import SET_ADDRESS from '../Apollo/gql/setAddress';
import omitDeep from 'omit-deep';
import { Context } from '../Context/Context';
import Spinner from '../components/Spinner';


const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        height: '100%',
        marginTop: '100px'
    },
    addressBtn: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    address: {
        marginLeft: 5,
        marginRight: 5
    }
})
const Account = () => {
    const initialState = [{
        name: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        select: ""
    }]

    const { setNotification } = useContext(Context)
    const [address, setAddress] = useState(initialState)
    
    const [setChanges, { loading: loadingSetAddress }] = useMutation(SET_ADDRESS, {
        onCompleted(editStatus) {
            if (editStatus.setAddress === "EDIT_ADDRESS_SUCCESS") {
                setNotification({
                    open: true,
                    msg: "Se han guardado los cambios"
                })
            }else if(editStatus.setAddress==="auth/id-token-expired"){
                auth.signOut()
            }
        }
    })
    const { loading, data } = useQuery(GET_USER_DATA, {
        onCompleted({ getProfile: { SessionStatus, allAddress, shoppingHistory } }) {
            if (SessionStatus !== 'access-allowed') {
                auth.signOut()
            }

            if (allAddress) {
                setAddress(allAddress)
            }
        },
        fetchPolicy: "cache-and-network"
    })
    const classes = useStyles();
    const [showBtn, setShowBtn] = useState(false)
    const addAddress = () => {
        setAddress([...address, {
            name: '',
            lastname: '',
            address: '',
            city: '',
            state: '',
            select: '',
        }])
    }
    const editAddress = (newAddress) => {
        setShowBtn(true)
        setAddress(newAddress)
    }
    const saveChanges = () => {
        setChanges({
            variables: {
                addressInput: address
            }
        })
        setShowBtn(false)
    }
    useEffect(() => {
        setAddress(omitDeep(address, ['__typename']))
    }, [address])

    
    if (loading) return (
        <Container className={classes.root} >
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="rect" width="100%" height={400} style={{ marginTop: 50 }} />
        </Container>
    )
    return (
        <Container className={classes.root} >
            <h3>Mi cuenta</h3>
            <h5>Bienvenido de vuelta {data?.getProfile?.displayName} </h5>
            <div style={{ marginTop: 50, marginBottom: 10 }}>
                <Orders
                    rows={data?.getProfile?.shoppingHistory || []}
                />
            </div>
            <div >
                <Grid container style={{ marginBottom: 10 }}>
                    <Grid item xs={12} >
                        <h2  style={{ display: 'block', width: '100%', textAlign: 'center' }}>Direcciones de envio</h2>
                    </Grid>
                    <Grid item xs={12} className={classes.addressBtn}>
                        <Button variant="outlined" onClick={addAddress}>Agregar dirreccion <AddCircleOutlineIcon style={{ color: '#FE6B8B' }} /></Button>
                    </Grid>
                </Grid>
            </div>
            <Grid container style={{ width: '100%', margin: 0 }} spacing={2}>
                {address.map((_, i) => (
                    <Grid item xs={12} sm={4} xl={3} key={i} >
                        <Address
                            data={address}
                            index={i}
                            setData={editAddress}
                        />
                    </Grid>
                ))}
            </Grid>
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

        </Container>
    );
}

export default Account;