import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import d1 from "./Image/icon2.png";
import d2 from"./Image/icon.png";

const Animation = keyframes`
    0%{
        transform:scale(1);
    }
    50%{
        transform:scale(1.3);

    }
    100%{
        transform:scale(1);
    }
`;

const LikeBox = styled.div`
    height:24px;
    width:24px;


    padding: 0 auto;
    position: relative;
    img{

        position: absolute;
        :hover{
            animation: ${Animation} 0.4s
        }
    }
`;
export default ({localIsLiked})=>{

    return (
    <LikeBox>
    {localIsLiked?
    (<img src={d1}   height={24} width={24}/>):
    (<img src={d2}   height={24} width={24}/>)}
        
    </LikeBox>)
};