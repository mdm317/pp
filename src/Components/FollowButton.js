import React, { useCallback } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { TOGGLE_LIKE } from "./Post/PostQuerys";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

const TOGGLE_FOLLOW = gql`
    mutation follow($userId:Int!){
        follow(userId:$userId)
    }
`;


const Box = styled.div`
    margin-top :10px;
    background-color:${props=>props.theme.blueColor};
    color : white;
    border-radius:10px;
    padding: 3px 5px ;
`;

export default ({id, setamIFollowing})=>{
    const [followMutation] = useMutation(TOGGLE_FOLLOW,{
        variables:{userId:id}
    });
    const clickFollow = async()=>{
        try {
            const {data:{follow}} = await followMutation();
            console.log(follow);
            setamIFollowing(follow);
        } catch (error) {
            console.log(error);
            toast.error("TRY AGAIN");
        }
    }
    return(
        <Box onClick = {clickFollow}>
            팔로우
        </Box>
    )
};