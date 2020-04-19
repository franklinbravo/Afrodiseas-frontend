import gql from 'graphql-tag';
export default gql`
    mutation UpdateCart($quantity:Int, $prev:Product){
        updateCart(quantity:$quantity,prev:$prev) @client
    }
`