import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
    Grid,
    IconButton,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
    FormHelperText,
    Typography,
    TextField,
    MenuItem,
    Button,
    CardContent,
    CardActions,
    Card,
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'relative',
        background:'#f0f0f0'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    delete: {
        position: 'absolute',
        marginTop: 3,
        right: 3

    },
    formControl: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const getStates = () => (['Amazonas', 'Anzoategui', 'Apure',
    'Aragua', 'Barinas', 'Bolivar', 'Carabobo',
    'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcon',
    'Guarico', 'Lara', 'Merida', 'Miranda',
    'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre',
    'Tachira', 'Trujillo', 'Vargas', 'Yaracuy', 'Zulia'])
const Address = ({ data, index, setData }) => {
    let initStateEdit = (data[index].name === '' || data[index].lastname === '' || data[index].address === '' || data[index].city === '' || data[index].state === '')
    const { errors, control, handleSubmit, watch } = useForm()
    const classes = useStyles();

    useEffect(()=>{
        const setEditFalse=()=>{
            setEdit(false)
        }

        if(data[index].name === '' || data[index].lastname === '' || data[index].address === '' || data[index].city === '' || data[index].state === ''){
            setEditFalse()
        }
    },[data,index])
    const onSubmit = async (newForm) => {

        //Agregando la propiedad select para que coinsida con la data que vienen de Props
        const newData = {
            ...newForm,
            select: data[index].select
        }
        if (JSON.stringify(data[index]) === JSON.stringify(newData)) return;
        setEdit(false)
        data[index] = newData;
        setData(data)

    }
    const [edit, setEdit] = useState(initStateEdit)

    const deleteAddress = (i) => {
        setData(data.filter((e, index) => (i !== index)))
    }
    const toggleEdit = () => {
        console.log(initStateEdit,edit);
        if (initStateEdit) {
            deleteAddress(index)
        } else {
            setEdit(!edit)
        }
    }
    const handleChange = (e) => {
        setData(data.map((dataForm, i) => (
            i === index ?
                {
                    ...dataForm,
                    select: 'Default'
                } : {
                    ...dataForm,
                    select: ''
                }
        )))
    }
    const cutText = (text, maxLength) => (
        text.length > maxLength
            ?
                `${text.slice(0, maxLength)}...`
            :
                text
    )
    return (
        <div>
            <Card className={classes.root}>
                <IconButton className={classes.delete} onClick={() => deleteAddress(index)}>
                    <HighlightOffIcon />
                </IconButton>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', position: 'static' }}>
                        <Grid container style={{ width: '100%' }} spacing={3} >
                            <Grid item sm={6} xs={6}  >
                                {
                                    (edit || initStateEdit) ?
                                        <>
                                            <Controller
                                                as={
                                                    <TextField 
                                                        label="Nombre"
                                                        fullWidth
                                                        color="secondary"
                                                        error={!!errors.name}
                                                    />
                                                }
                                                control={control}
                                                name="name"
                                                rules={
                                                    {
                                                        required: { value: true, message: 'Direccion requerida' },
                                                        minLength: { value: 3, message: 'Debe tener un minimo de 3 letras' },
                                                        maxLength: { value: 20, message: 'No debe ser mayor a 20 letras' }
                                                    }
                                                }
                                                defaultValue={data[index].name}
                                            />
                                            <FormHelperText error>{errors?.name?.message}</FormHelperText>
                                        </>
                                        :
                                        <div >
                                            <FormHelperText >Nombre</FormHelperText>
                                            <Typography >{cutText(data[index].name,10)}</Typography>
                                        </div>
                                }


                            </Grid>
                            <Grid item sm={6} xs={6}>
                                {
                                    (edit || initStateEdit) ?
                                        <>
                                            <Controller
                                                as={
                                                    <TextField 
                                                        label="Apellido"
                                                        color="secondary"
                                                        fullWidth
                                                        error={!!errors.lastname}
                                                    />
                                                }
                                                control={control}
                                                name="lastname"
                                                rules={
                                                    {
                                                        required: { value: true, message: 'Direccion requerida' },
                                                        minLength: { value: 3, message: 'Debe tener un minimo de 3 letras' },
                                                        maxLength: { value: 20, message: 'No debe ser mayor a 20 letras' }
                                                    }
                                                }
                                                defaultValue={data[index].lastname}
                                            />
                                            <FormHelperText error>{errors?.lastname?.message}</FormHelperText>
                                        </>
                                        :
                                        <div >
                                            <FormHelperText >Apellido</FormHelperText>
                                            <Typography  >{cutText(data[index].lastname,10)}</Typography>
                                        </div>

                                }


                            </Grid>
                            <Grid item xs={12}>
                                {
                                    (edit || initStateEdit) ?
                                        <>
                                            <Controller
                                                as={
                                                    <TextField 
                                                        label="Direccion"
                                                        color="secondary"
                                                        fullWidth
                                                        error={!!errors.address}
                                                    />
                                                }
                                                control={control}
                                                name="address"
                                                rules={
                                                    {
                                                        required: { value: true, message: 'Direccion requerida' },
                                                        minLength: { value: 5, message: 'Debe tener un minimo de 5 letras' }
                                                    }
                                                }
                                                defaultValue={data[index].address}
                                            />
                                            <FormHelperText error>{errors?.address?.message}</FormHelperText>
                                        </>
                                        :
                                        <div >
                                            <FormHelperText >Direccion</FormHelperText>
                                            <Typography  >{cutText(data[index].address,15)}</Typography>
                                        </div>

                                }


                            </Grid>
                            <Grid item xs={6}>
                                {
                                    (edit || initStateEdit) ?
                                        <>
                                            <Controller
                                                as={
                                                    <TextField 
                                                        label="Ciudad"
                                                        color="secondary"
                                                        fullWidth
                                                        error={!!errors.city}
                                                    />
                                                }
                                                control={control}
                                                name="city"
                                                rules={
                                                    {
                                                        required: { value: true, message: 'Ciudad requerida' },
                                                        minLength: { value: 3, message: 'Debe tener un minimo de 3 letras' },
                                                        maxLength: { value: 15, message: 'No debe ser mayor a 15 letras' }
                                                    }
                                                }
                                                defaultValue={data[index].city}
                                            />
                                            <FormHelperText error>{errors?.city?.message}</FormHelperText>
                                        </>
                                        :
                                        <div >
                                            <FormHelperText >Ciudad</FormHelperText>
                                            <Typography  >{cutText(data[index].city,10)}</Typography>
                                        </div>
                                }
                            </Grid>
                            <Grid item xs={6}>
                                {
                                    (edit || initStateEdit) ?
                                        <>
                                            <Controller
                                                as={
                                                    <TextField
                                                        select
                                                        label="Estado"
                                                        error={!!errors.state}
                                                        fullWidth
                                                    >
                                                        <MenuItem value=''>Ninguno</MenuItem>
                                                        {getStates().map((state, index) => (
                                                            <MenuItem value={state} key={index}>{state}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                }
                                                name="state"
                                                rules={{
                                                    required: { value: true, message: "Estado requerido" }
                                                }}
                                                control={control}
                                                defaultValue={data[index].state}
                                            />

                                            <FormHelperText error>{errors?.state?.message}</FormHelperText>
                                        </>
                                        :
                                        <div >
                                            <FormHelperText >Estado</FormHelperText>
                                            <Typography  >{cutText(data[index].state,8)}</Typography>
                                        </div>
                                }
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl component="fieldset" className={classes.formControl} >
                                    <RadioGroup value={data[index].select} onChange={handleChange} >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={event => event.stopPropagation()}
                                            onFocus={event => event.stopPropagation()}
                                            control={<Radio />}
                                            value="Default"
                                            label="Predeterminado"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            (edit || initStateEdit) ?
                                <>
                                    <Button size="small" type="submit" {
                                        ...(JSON.stringify(data[index]) === JSON.stringify({ ...watch(), select: data[index].select }) ? { disabled: true } : null)}>Guardar</Button>
                                    <Button size="small" onClick={toggleEdit}>Cancelar</Button>
                                </>
                                :
                                <Button size="small" onClick={toggleEdit}>Editar</Button>
                        }

                    </CardActions>
                </form>
            </Card>

        </div>

    );
}

export default Address;