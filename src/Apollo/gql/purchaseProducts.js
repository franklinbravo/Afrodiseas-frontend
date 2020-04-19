import gql from 'graphql-tag';

export default gql`
mutation PurchaseProducts($purchseInput:PurchseInput){
    purchaseProducts(purchseInput:$purchseInput)
}
`