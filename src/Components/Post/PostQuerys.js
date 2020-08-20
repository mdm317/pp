import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
    mutation toogleLike($postId:Int!){
        toggleLike(postId:$postId)
    }
`;
export const ADD_COMMENT = gql`
    mutation addComments($postId: Int! $text:String!){
        addComments(postId:$postId text:$text){
            id
            text
            user{
                id
                nickName
            }
        }
    }
`;