import React from "react";
import Post from "../Components/Post/index";
import styled from "styled-components";
import Header from "../Components/Header";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;
const EmptyBox = styled.div`
    ${props=>props.theme.whiteBox}
    height:120px;
    max-width:614px;
    width:100%;
    margin-top:35px;
`
const SEE_FEED_QUERY = gql`{
    seeFeed{
        id,
        caption,
        createdAt,
        user{
            id,
            nickName,
            avator
        },
        files{
            url
        },
        comments{
            id,
            text,
            user{
                id,
                nickName
            }
        },
        isLiked,
        likeCount
    }
}`;

export default () => {
    const {data, loading} = useQuery(SEE_FEED_QUERY);
    
    return(
        <Wrapper>
            <EmptyBox></EmptyBox>
            {loading && <Loader/>}
            {!loading && data && data.seeFeed && 
                data.seeFeed.map((post)=>{
                    return (<Post key ={post.id} 
                        {...post}
                    />)
                })}
        </Wrapper>
    )
}