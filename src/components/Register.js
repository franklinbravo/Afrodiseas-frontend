import React, { useState, useContext } from 'react'
import {
    TextField,
    Button,
    FormHelperText,
    OutlinedInput,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    Grid,
    makeStyles
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm, Controller } from 'react-hook-form'
import googleIcon from '../assets/Google__G__Logo.svg'
import { auth, firestore, RegisterLoginWithGoogle } from '../firebase/firebaseApp';
import { Context } from '../Context/Context';

const useStyles = makeStyles(() => ({
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color:'white'
    }
}))

const Register = () => {
    const classes = useStyles()
    const { errors, handleSubmit, control } = useForm()
    const { setNotification,setLoading  } = useContext(Context)
    const onSubmit = async ({ name, lastname, email, pwd }) => {
        setLoading(true)
        auth.createUserWithEmailAndPassword(email, pwd)
            .then(async ({ user }) => {
                await user.updateProfile({
                    displayName: `${name} ${lastname}`
                })
                await firestore.collection('users').doc(user.uid).set({
                    displayName: `${name} ${lastname}`,
                    email
                })
                setNotification({
                    open: true,
                    msg: `Bienvenido/a ${name} ${lastname}`
                })
                setLoading(false)
            }).catch(({ code }) => {
                if (code === "auth/email-already-in-use") {
                    setNotification({
                        open: true,
                        msg: "Ya existe una cuenta con este correo"
                    })
                    setLoading(false)
                } else {
                    setNotification({
                        open: true,
                        msg: "Hubo un error"
                    })
                    setLoading(false)
                }
            })
    };
    const [showPwd, setShowPwd] = useState(false)

    const handleClickShowPassword = () => {
        setShowPwd(!showPwd)
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const RegisterWithGoogle = async () => {
        setLoading(true)
        const {code, displayName}= await RegisterLoginWithGoogle()
        if(code==="LOGIN_SUCCESS"){
            setNotification({
                open: true,
                msg: `Bienvenido/a ${displayName}`
            })
            setLoading(false)
        }else{
            setNotification({
                open: true,
                msg: "Hubo un error"
            })
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ textAlign: 'center' }}>Registrate</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <Controller as={
                        <TextField
                            variant="outlined"
                            label="Nombre"
                            fullWidth
                            error={!!errors?.name}
                        />
                    }
                        name="name"
                        rules={
                            {
                                required: { value: true, message: 'Nombre requerido' },
                                minLength: { value: 3, message: 'Debe tener un minimo de 3 letras' },
                                maxLength: { value: 20, message: 'No debe ser mayor a 20 letras' }
                            }
                        }
                        control={control}
                        defaultValue=""
                    />
                    <FormHelperText error>{errors?.name?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller as={
                        <TextField
                            variant="outlined"
                            label="Apellido"
                            fullWidth
                            error={!!errors?.lastname}
                        />
                    }
                        name="lastname"
                        rules={
                            {
                                required: { value: true, message: 'Apellido requerido' },
                                minLength: { value: 3, message: 'Debe tener un minimo de 3 letras' },
                                maxLength: { value: 20, message: 'No debe ser mayor a 20 letras' }
                            }
                        }
                        control={control}
                        defaultValue=""
                    />
                    <FormHelperText error>{errors?.lastname?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField
                            variant="outlined"
                            label="Correo"
                            fullWidth
                            error={!!errors?.email}
                        />
                    }
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={
                            {
                                required: {
                                    value: true,
                                    message: 'Ingrese su correo'
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Ingrese el correo correctamente'
                                }
                            }
                        }
                    />
                    <FormHelperText error>{errors?.email?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        as={
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Clave</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPwd ? 'text' : 'password'}
                                    error={!!errors?.pwd}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPwd ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        }
                        name="pwd"
                        control={control}
                        rules={
                            {
                                required: {
                                    value: true,
                                    message: 'Ingrese su contraseña'
                                },
                            }
                        }
                        defaultValue=""
                    />
                    <FormHelperText error>{errors?.pwd?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" type="submit" className={classes.btn} >Registrar</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" className={classes.btn} onClick={RegisterWithGoogle} >
                        <img src={googleIcon} alt="Logo google" style={{ height: 25, marginRight: 10 }} />
                    Registrate con google
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Register;