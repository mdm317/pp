import React from "react";
import styled from "styled-components";

const Box = styled.div`
    ${props=>props.theme.whiteBox}
    margin-top :10px;
    background-color:white;
    border-radius:10px;
    padding: 3px 5px ;
`;
export default ()=>{
    return(
        <Box>
            메세지 보내기
        </Box>
    )
};