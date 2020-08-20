import { gql } from "apollo-boost";

export const GET_PROFILE= gql`
    query userProfile($nickName:String!){
        userProfile(nickName: $nickName){
            avator,
            nickName,
            email,
            firstName,
            lastName,
            followingCount,
            followerCount,
            posts{
                files{
                    url
                },
                likeCount,
                commentCount,
            }
        }
    }
`;