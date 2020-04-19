import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { resolvers, typeDefs } from './Apollo/resolvers'
import { persistCache } from 'apollo-cache-persist';
import { GET_CART_ITEMS_LOCAL } from './Apollo/gql/getCartItemsLocal';


const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    return object.id
  }
})

const createApolloClient= async ()=>{

  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    console.log(token);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${JSON.parse(token)}` : "",
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    typeDefs,
    resolvers
  });
  try{
    cache.readQuery({
      query:GET_CART_ITEMS_LOCAL
    })
    //console.log(a)
  }catch(err){
    cache.writeData({
      data: {
        isLoggedIn: !!localStorage.getItem("token"),
        dataUser:false,
        cartItems: [],
      }
    });
  }
  


  const ApolloApp = () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  ReactDOM.render(<ApolloApp />, document.getElementById('root'));
}


createApolloClient()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
