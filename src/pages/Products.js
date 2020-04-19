import React, { useState} from 'react'
import { makeStyles,Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import CardProducts from '../components/CardProducts'
import getProducts from '../Apollo/gql/getProducts'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles(theme=>({
    root:{
        minHeight:'90vh',
        overflowX:'hidden',
        height:'100%'
    },
    tittle:{
        textAlign:'center',
        marginTop:'50px',
        color:'Black',
        fontSize:'20px'
    },
    tittleSkeleton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20px'
    },
    productsTools:{
        position:'sticky',
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        height:'50px',
        zIndex:2,
        borderColor:'black'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));
  


const Products = () => {
    //let type='shadows'
    const {id}=useParams()
    const [fromTo,setFromTo]=useState(0)
    const [sortType,setSortType] = useState('A-Z')
    const [listProducs, setlistProducs]= useState({getProducts:{
        products:[],
        more:false
    }})
    
    let TypeProduct=`${id}&&${sortType}%%${fromTo}`;

    const { 
        loading, 
        error, 
        refetch,
        data,
        fetchMore
    } = useQuery(getProducts,{
        variables: {
            TypeProduct
        },
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange:true,
        onCompleted(data){
            console.log(data);
            if(fromTo===0 && (data)){
                setlistProducs(data)
            }
        }
    })
   // const [loadMore, setLoadMore]= useState(data?.getProducts?.more || false)                                            
    const classes = useStyles();
    if(fromTo===0)window.scrollTo(0,0)
    if (loading){
        
        return (
            <div >
                <h1 className={classes.tittle}>Cargando...</h1>
                <div className='contenedor-grid'  >
                    {(listProducs.getProducts.products.length===0) ?
                    Array.from(new Array(10)).map((_,index)=>(
                         <CardProducts 
                         key={index}     
                         loading={loading}
                     />
                    ))
                    :
                    listProducs?.getProducts?.products.map((data,index)=>(
                            <CardProducts 
                                key={index} 
                                data={data}    
                                loading={false}
                            />
                        ))}
                </div>
                <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px'}}>
                    <Spinner />
                </div>

            </div>
        )
    }

    if (error){ 
        console.log(error);
        return `Error! ${error}`};
    
    const reOrder=(e)=>{

        setSortType(e.target.value)
        setlistProducs({getProducts:{
            products:[]
        }})
        setFromTo(0)
        refetch({
            TypeProduct:`${id}&&${sortType}%%${fromTo}`,
        })
        
    }
    

    return (
        <Container className={classes.root} >
            <div className={classes.tittle}>
                <h1>{id}</h1>
            </div>
            <br/>
            <div style={{width:'100%',justifyContent:'flex-end',display:'flex'}} >
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel >Ordenar Por</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        //value={age}
                        defaultValue={sortType}
                        onChange={reOrder}
                    >
                        <MenuItem value="none"> 
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="LowToHigh">Precio (Menor a Mayor)</MenuItem>
                        <MenuItem value="HighToLow">Precio (Mayor a Menor)</MenuItem>
                        <MenuItem value="A-Z">Alfabetico (A-Z)</MenuItem>
                        <MenuItem value="Z-A">Alfabetico (Z-A)</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='contenedor-grid'> 
                {
                listProducs?.getProducts?.products.map((data,index)=>(
                    <CardProducts 
                        key={index} 
                        data={data}    
                        loading={loading}
                    />
                ))} 
            </div>
            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px'}}>
            {
                (data?.getProducts?.more)?
                <Button onClick={()=>{
                    setFromTo(fromTo+10)
                    fetchMore({
                        variables:{
                            TypeProduct:`${id}&&${sortType}%%${fromTo}`
                        },
                        updateQuery(prev,{fetchMoreResult }){
                            setlistProducs({getProducts:{
                                products:[
                                    ...prev.getProducts.products,
                                    ...fetchMoreResult.getProducts.products
                                ]
                            }});
                            
                        }
                    })
                }}>
                    Cargar mas
                </Button>
                    :null
            }
            </div>
            
            
        </Container>
    )
    
}
 
export default Products;