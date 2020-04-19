import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from './ShoppingCart';
import copy from './CopyText';
import { Context } from '../Context/Context';

//Hacer un seleccionador de dirreccion
const useStyles = makeStyles({
    root: {
        width: '100%',
        background:'#f0f0f0'
    },
    expansionPanel:{
        background:'#f0f0f0'
    }
});

const StepTwo = ({ errors, Controller, control, form, setForm }) => {
    const { setNotification } = useContext(Context)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('');
    const handleChangePanel = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : '');
        setForm({ ...form, bank: newExpanded ? panel : '' })
    };
    const handleChange = event => {
        setExpanded(event.target.value)
        setForm({ ...form, bank: event.target.value })
    };
    const copyText = (input) => {
        copy(input)
        setNotification({
            open:true,
            msg: "Copiado"
        })
    }
    return (
        <div className={classes.root}>
            <ShoppingCart />
            <ExpansionPanel square expanded={expanded === 'Pago Movil'} 
            onChange={handleChangePanel('Pago Movil')}
            className={classes.expansionPanel}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <FormControl component="fieldset" className={classes.formControl} id='form1'>
                        <RadioGroup value={expanded} onChange={handleChange} >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                                value="Pago Movil"
                                control={<Radio />}
                                label="Pago movil"
                            />
                        </RadioGroup>
                    </FormControl>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <h3>Mercantil</h3>
                            <h3 color="textSecondary" >
                                Tlf: 0426-1002620
                                <IconButton onClick={() => copyText('1002620')} >
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                            <h3 color="textSecondary" >
                                C.I.: 26653012
                                <IconButton onClick={() => copyText('26653012')}>
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                as={
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        {...errors.refTransfer ? { error: true } : null}
                                    />
                                }
                                control={control}
                                name="refTransfer"
                                rules={
                                    {
                                        required: { value: true, message: 'Numero de referencia requerido' },
                                        minLength: { value: 8, message: 'Debe tener un minimo de 8 digitos' },
                                        maxLength: { value: 20, message: 'No debe ser mayor a 20 digitos' }
                                    }
                                }
                                defaultValue={form.refTransfer}
                            />
                            <FormHelperText error>{errors?.refTransfer?.message}</FormHelperText>
                        </Grid>
                    </Grid>

                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'Banesco'} 
            onChange={handleChangePanel('Banesco')}
            className={classes.expansionPanel}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Pago Movil"
                    aria-controls="additional-actions2-content"
                    id="additional-actions2-header"
                >
                    <FormControl component="fieldset" className={classes.formControl} >
                        <RadioGroup value={expanded} onChange={handleChange} name="bank">
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                                value="Banesco"
                                control={<Radio />}
                                label="Transferencia desde banesco"
                            />
                        </RadioGroup>
                    </FormControl>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <h3 color="textSecondary" style={{wordWrap:'break-word'}} >
                                0134-0946-390001314475<IconButton onClick={() => copyText('01340946390001314475')} ><FileCopyIcon /></IconButton>
                            </h3>
                            <h3 color="textSecondary" >
                                C.I.: 5289613
                                <IconButton onClick={() => copyText('5289613')}>
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                            <h3 color="textSecondary" >
                                Vivian Dávila
                                <IconButton onClick={() => copyText('Vivian Dávila')}>
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                as={
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        {...errors.refTransfer ? { error: true } : null}
                                    />
                                }
                                control={control}
                                name="refTransfer"
                                rules={
                                    {
                                        required: { value: true, message: 'Numero de referencia requerido' },
                                        minLength: { value: 8, message: 'Debe tener un minimo de 8 digitos' },
                                        maxLength: { value: 20, message: 'No debe ser mayor a 20 digitos' }
                                    }
                                }
                                defaultValue={form.refTransfer}
                            />
                            <FormHelperText error>{errors?.refTransfer?.message}</FormHelperText>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'Mercantil'} 
            onChange={handleChangePanel('Mercantil')}
            className={classes.expansionPanel}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions3-content"
                    id="additional-actions3-header"
                >
                    <FormControl component="fieldset" className={classes.formControl} >
                        <RadioGroup value={expanded} onChange={handleChange}  >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                                value="Mercantil"
                                control={<Radio />}
                                label="Transferencia desde mercantil"
                            />
                        </RadioGroup>
                    </FormControl>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <h3 color="textSecondary" style={{wordWrap: 'break-word'}} >
                                0105-0104-130104390123
                                <IconButton onClick={() => copyText('01050104130104390123')} >
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                            <h3 color="textSecondary" >
                                C.I.: 26653012
                                <IconButton onClick={() => copyText('26653012')}>
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                            <h3 color="textSecondary" >
                                Franklin Bravo
                                <IconButton onClick={() => copyText('Franklin Bravo')}>
                                    <FileCopyIcon />
                                </IconButton>
                            </h3>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                as={
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        {...errors.refTransfer ? { error: true } : null}
                                    />
                                }
                                control={control}
                                name="refTransfer"
                                rules={
                                    {
                                        required: { value: true, message: 'Numero de referencia requerido' },
                                        minLength: { value: 8, message: 'Debe tener un minimo de 8 digitos' },
                                        maxLength: { value: 20, message: 'No debe ser mayor a 20 digitos' }
                                    }
                                }
                                defaultValue={form.refTransfer}
                            />
                            <FormHelperText error>{errors?.refTransfer?.message}</FormHelperText>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );
}

export default StepTwo;