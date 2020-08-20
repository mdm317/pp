import React from "react";
import styled  from "styled-components";
import { CommentBlack, HeartBlack } from "./Icons";

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    opacity:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    svg {
        fill: white;
    }
`;
const Box = styled.div`
    background-image: url(${props=>props.src});
    background-size: cover;
    width: 30%;
    height:300px;
    margin-bottom:40px;
    :hover{
        ${Overlay} {
            opacity: 1;
        }
    }
`;
const Text = styled.div`
    color:white;
    font-size:x-large;
    margin-left:3px;
`;
const Column  = styled.div`
    display:flex;
    :last-child{
        margin-left:10px;
    }
`;

export default ({image, likeCount, commentCount})=>{
    console.log(image);
    return(
    <Box src = {image}>
        <Overlay>
            <Column>
            <CommentBlack/><Text>{commentCount}</Text>
            </Column>
            <Column>
            <HeartBlack/><Text>{likeCount}</Text>
            </Column>
        </Overlay>
    </Box>


)};


