import React, { useState, useContext } from 'react'
import {
    TextField,
    Button,
    FormHelperText,
    Grid,
    OutlinedInput,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm, Controller } from 'react-hook-form'
import googleIcon from '../assets/Google__G__Logo.svg'
import { auth, RegisterLoginWithGoogle } from '../firebase/firebaseApp';
import { Context } from '../Context/Context';


const Login = () => {
    const { errors, handleSubmit, control } = useForm()
    const [showPwd, setShowPwd] = useState(false)
    const { setNotification, setLoading } = useContext(Context)
    const handleClickShowPassword = () => {
        setShowPwd(!showPwd)
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const onSubmit = data => {
        setLoading(true)
        const { email, pwd } = data;
        auth.signInWithEmailAndPassword(email, pwd)
            .then(async ({ user }) => {
                setNotification({
                    open: true,
                    msg: `Bienvenido/a ${user.displayName}`
                })
                setLoading(false)
            }).catch(({ code }) => {
                console.log(code);
                if (code === "auth/wrong-password") {
                    setNotification({
                        open: true,
                        msg: 'Contraseña incorrecta'
                    })
                } else if (code === "auth/user-not-found") {
                    setNotification({
                        open: true,
                        msg: 'Este usuario no existe'
                    })
                } else {
                    setNotification({
                        open: true,
                        msg: 'Hubo un error'
                    })
                }
            })
    };
    const loginWithGoogle = async () => {
        setLoading(true)
        const {code, displayName }= await RegisterLoginWithGoogle()
        if(code==="LOGIN_SUCCESS"){
            setNotification({
                open: true,
                msg: `Bienvenido/a ${displayName}`
            })
            setLoading(false)
        }else{
            setLoading(false)
            setNotification({
                open: true,
                msg: "Hubo un error"
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ textAlign: 'center' }}>Iniciar sesion</h2>
            <Grid container spacing={2}>
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
                    />
                    <FormHelperText error>{errors?.pwd?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" type="submit" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color:'white' }} >Ingresar</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color:'white' }}
                        onClick={loginWithGoogle}
                    >
                        <img src={googleIcon} alt="Logo google" style={{ height: 25, marginRight: 10 }} />  Ingresa con google
                    </Button>
                </Grid>
            </Grid>



        </form>
    );
}

export default Login;