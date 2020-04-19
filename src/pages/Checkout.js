import React, { useState, useContext } from 'react'
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  FormHelperText,
  Backdrop,
  Container
} from '@material-ui/core';
import StepOne from '../components/StepOneCheckout'
import StepTwo from '../components/StepTwoCheckout';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_USER_DATA from '../Apollo/gql/getUserData';
import { auth } from '../firebase/firebaseApp';
import SET_ADDRESS from '../Apollo/gql/setAddress';
import omitDeep from 'omit-deep';
import { Context } from '../Context/Context';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { GET_CART_ITEMS_LOCAL } from '../Apollo/gql/getCartItemsLocal';
import PURCHASE_PROODUCTS from '../Apollo/gql/purchaseProducts';
import * as moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '90vh',
    background: '#f0f0f0'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color:'white'
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    zIndex: 0,
    marginTop: 35
  },
  resetContainer: {
    padding: theme.spacing(3),
    background: '#f0f0f0'
  },
  stepContent: {
    position: 'relative',
  },
  msgError: {

  }
}));
function getSteps() {
  return ['Seleccione su direccion', 'Metodo de pago'];
}


const Checkout = () => {
  const { setNotification, setLoading } = useContext(Context)
  const initialState = [{
    name: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    select: ""
  }]
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    refTransfer: "",
    bank: "",
    select: ""
  })
  
  const [address, setAddress] = useState(initialState)
  const [showBtn, setShowBtn] = useState(false)
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { errors, control, triggerValidation, getValues } = useForm()
  const [errorNoBank, setErrorNoBank] = useState('')
  const steps = getSteps();
  const { data: { cartItems } } = useQuery(GET_CART_ITEMS_LOCAL)
  const { loading } = useQuery(GET_USER_DATA, {
    onCompleted({ getProfile: { SessionStatus, allAddress } }) {
      if (SessionStatus !== 'access-allowed') {
        auth.signOut()
      }
      if (allAddress) {
        setAddress(allAddress)
      }
    },
    fetchPolicy: "cache-and-network"
  })
  const [setChanges, { loading: loadingSetAddress }] = useMutation(SET_ADDRESS, {
    onCompleted(editStatus) {
      if (editStatus.setAddress === "EDIT_ADDRESS_SUCCESS") {
        setNotification({
          open: true,
          msg: "Se han guardado los cambios"
        })
      } else if (editStatus.setAddress === "auth/id-token-expired") {
        auth.signOut()
      }
    }
  })
  const [ sendPurchase, { loading:loadingPurchase } ]=useMutation(PURCHASE_PROODUCTS,{
    update(cache,{data:{purchaseProducts}}){
      if(purchaseProducts==="PURCHASE_SUCCESS"){
        cache.writeQuery({
          query:GET_CART_ITEMS_LOCAL,
          data:{
            cartItems:[]
          }
        })
        setNotification({
          open: true,
          msg: "Compra realizada con exito"
        })
      }else if(
        purchaseProducts==="auth/id-token-expired" ||
        purchaseProducts==='auth/id-token-not-exist' ||
        purchaseProducts==='auth/other-error'
      ){
        auth.signOut()
          .then(()=>{
            setNotification({
              open: true,
              msg: "Inicia sesion de nuevo"
            })
          })
      }else{
        setNotification({
          open: true,
          msg: "Hubo un error"
        })
      }
      
    }
  })
  const saveChanges = () => {
    setChanges({
      variables: {
        addressInput: address
      }
    })
    setShowBtn(false)
  }
  const editAddress = (newAddress) => {
    setShowBtn(true)
    setAddress(newAddress)
  }


  const handleNext = async () => {
    if (activeStep === 0) {
      const formSelected = address.filter((unicForm) => {
        if (unicForm.name !== '' && unicForm.lastname !== '' && unicForm.address !== '' && unicForm.city !== '' && unicForm.state !== '' && unicForm.select !== '') {
          return unicForm
        } else {
          return null;
        }
      })
      if (formSelected.length === 0) {
        setErrorNoBank("Agregre una direccion o selecciona una existente")
        return
      };
      setForm({ ...form, ...formSelected[0] })
      setErrorNoBank("")
      setActiveStep(prevActiveStep => prevActiveStep + 1);

    } else if (activeStep === 1) {
      await triggerValidation('refTransfer')
      if (Object.keys(errors).length > 0 || form.bank === "") {
        setErrorNoBank("Seleccione el tipo de pago e ingrese el numero de referencia")
        return
      };
      setForm({ ...form, ...getValues() })
      setErrorNoBank("")
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      PurchaseProducts()
    }
  };

  const PurchaseProducts =()=>{
    const purchseInput={
      ...form, 
      ...getValues(),
      date:moment(new Date()).format('DD/MM/YYYY hh:mm a'),
      products:omitDeep(cartItems, ['__typename'])
    }
    sendPurchase({
      variables:{
        purchseInput
      }
    })
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepOne
            data={address}
            setData={editAddress}
            form={form}
            saveChanges={saveChanges}
            loadingSetAddress={loadingSetAddress}
            showBtn={showBtn}
          />
        )
      case 1:
        return (
          <StepTwo
            errors={errors}
            Controller={Controller}
            control={control}
            form={form}
            setForm={setForm}
          />
        )
      default:
        return 'Unknown step';
    }
  }


  useEffect(() => {
    setAddress(omitDeep(address, ['__typename']))
    setLoading(loadingPurchase)
  }, [address,loadingPurchase,setLoading])


  return (
    <Container className={classes.root}>
      <Backdrop open={loading} style={{ zIndex: 9 }} >
        <Spinner />
      </Backdrop>
      <Stepper activeStep={activeStep} orientation="vertical" style={{ height: '100%', background: '#f0f0f0' }}>
        {steps.map((label, index) => (
          <Step key={label}  >
            <StepLabel >{label}</StepLabel>
            <StepContent >
              <div className={classes.stepContent}>
                {getStepContent(index)}
              </div>

              <div className={classes.actionsContainer}>
                {
                  errorNoBank !== ""
                    ?
                    <FormHelperText error className={classes.msgError}>{errorNoBank}</FormHelperText>
                    :
                    null
                }
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Atras
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <div style={{ width: '100%', height: '80vh', background:'#f0f0f0' }}>

          </div>
          <Button component={Link} to="/account" className={classes.button}>
            Ir al perfil
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default Checkout;