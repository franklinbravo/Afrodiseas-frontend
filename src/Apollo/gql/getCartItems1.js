import gql from 'graphql-tag';

export default gql`
    {
        getCartItems{
            id
            name
            color
            quantity
            type
            price
        }
    }
`