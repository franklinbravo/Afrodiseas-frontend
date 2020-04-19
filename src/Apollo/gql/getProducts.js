import gql from 'graphql-tag';

export default gql`
query products($TypeProduct:String!){
        getProducts(TypeProduct:$TypeProduct){
            products{
                id
                type
                name
                price
                quantityExist
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
            more
        }
    }
`;