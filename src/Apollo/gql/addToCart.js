import gql from 'graphql-tag';

export default gql`
mutation AddToCart($productInput: Product!, $quantity:Int) {
    addToCart(productInput: $productInput,quantity:$quantity) @client     
}
`