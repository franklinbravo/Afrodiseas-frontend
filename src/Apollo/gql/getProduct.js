import gql from 'graphql-tag';

export default gql`
query getProduct($id:ID!){
        getProduct(id:$id){
            id
            type
            name
            price
            color
            details
            photos{
                url
                tittle
            }
            colors{
                id
                color
            }
        }
    }
`;