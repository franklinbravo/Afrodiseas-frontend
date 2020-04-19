import gql from 'graphql-tag';

export const GET_CART_ITEMS_LOCAL= gql`{
    cartItems @client {
        id
        type
        name
        price
        color
        quantity
    }
}  
`;