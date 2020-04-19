import gql from 'graphql-tag';

export default gql`
mutation SetAddress($addressInput:[AddressInput]){
  setAddress(addressInput:$addressInput)
}
`