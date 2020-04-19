import gql from 'graphql-tag';

export default gql`
mutation DeleteItemID($id: ID!) {
    deleteItem(id: $id) @client
}
`