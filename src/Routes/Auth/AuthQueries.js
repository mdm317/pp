import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
export const CREATE_USER=gql`
  mutation createUser($userName:String! $email:String! $firstName:String $lastName:String! $bio:String){
    createUser(nickName:$userName email:$email firstName:$firstName lastName:$lastName bio:$bio)
  }
`;
export const CONFIRM_SECRET=gql`
  mutation confirmSecret($email:String! $secretCode:String!){
    confirmSecret(email:$email secretcode:$secretCode)
  }
`
export const LOCAL_LOG_IN=gql`
  mutation logUserIn($token:String!){
    logUserIn(token:$token) @client
  }
`