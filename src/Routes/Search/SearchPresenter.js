import React, { useState,useEffect  } from "react";
import Loader from "../../Components/Loader";
import styled  from "styled-components";
import Usercard from "../../Components/Usercard";
const Wrapper = styled.div`
    display:flex;
    justify-content:center;
`;
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width:575px;
    flex-basis:575px;
`;

const Item = styled.div`
    width: 32%;
    height:200px; 
    margin-bottom: 2%; /* (100-32*3)/2 */
    position: relative;
`;
export default ({data, loading})=>{
    return (
        <Wrapper>
        <Container> 
        {loading && <Loader/>}
        {!loading && data && data.searchUser && 
                   
            data.searchUser.map(user=>{
                if(!user.itsMe){
                    return (<Item key = {user.id}><Usercard user={user}/></Item>)
                }

            }
            )
           

        }
        </Container>
        </Wrapper>)
}