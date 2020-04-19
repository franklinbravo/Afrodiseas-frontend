import gql from "graphql-tag";
import { GET_CART_ITEMS_LOCAL } from "./gql/getCartItemsLocal";


export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Product]!
    dataUser: Boolean!
    snackbar: SnackBar
    user: User
  }
  extend type User{
    displayName: String
    email: String
  }
  extend type dataUser{
    name: String!
    lastname: String
    address: [Address]
    shoppingHistory: [Purchases]
    favorites:[Product]
    token: String
  }
  extend type Purchases{
    order: String
    exchangeRate: Int
    products:[Product]
    date:String
    time:String
  }
  extend type SnackBar{
    open:Boolean
    msg: String
  }
  extend type Product{
    id:ID!
    type:String
    name:String
    color:String
    price:Int
    quantity: Int
  }
  extend type Launch {
    isInCart: Boolean!
  }
  extend type Mutation {
    updateCart(quantity:Int, prev:Product): String
    addToCart(productInput:Product,quantity:Int):String
    deleteItem(id:ID!): String
  }
`;

export const resolvers = {
  Query: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
    getUserData(_root, product, { cache }) {
      /* app.auth().onAuthStateChanged(user=>{
        console.log(user);
      }) */
    },
  },
  Mutation: {
    updateCart(_root, { quantity, prev }, { cache }) {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS_LOCAL })
      const mapped = cartItems.map(data => {
        if (parseInt(data.id) === parseInt(prev.id)) {
          return {
            ...prev,
            quantity,
            __typename:data.id
          }
        }
        else {
          return {...data, __typename:data.id};
        }
      })
      try{
        cache.writeQuery({
          query: GET_CART_ITEMS_LOCAL,
          data: { cartItems: mapped }
        })
        return "CHANGE_SUCCESS"
      }catch(err){
        console.error(err);
        return "CHANGE_FAILED"
      }
      
    },
    addToCart(_, { productInput, quantity=1 }, { cache }) {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS_LOCAL })
      let exist = false
      const newCartItems = cartItems.map((product) => {
        if (product.id === productInput.id) {
          exist = true;
          return {
            ...product,
            quantity: product.quantity+quantity,
          }
        } else {
          return product
        }
      })

      if (!exist) {
        newCartItems.push({ ...productInput, quantity })
      }
      try{
        cache.writeQuery({
          query: GET_CART_ITEMS_LOCAL,
          data: {
            cartItems: [...newCartItems]
          }
        })
        return "ADD_TO_CART_SUCCESS"
      }catch(err){
        console.error(err);
        return "ADD_TO_CART_FAILED"
      }
      
    },
    deleteItem: (_root, { id }, { cache, getCacheKey }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS_LOCAL })
      const newCartItems = cartItems.filter(item => item.id !== id)
      try{
        cache.writeQuery({
          query: GET_CART_ITEMS_LOCAL,
          data: {
            cartItems: newCartItems
          }
        })
        return "DELETE_ITEM_SUCCESS"
      }catch(err){
        console.error(err);
        return "DELETE_ITEM_FAILED"
      }
      

    },

  }
};