import { gql } from "apollo-boost";

export const SEARCH = gql`
    query searchUser($term:String!){
        searchUser(term:$term){
            nickName,
            id,
            avator,
            itsMe,
            amIFollowing
        }
    }
`;