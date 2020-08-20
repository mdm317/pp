import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Logo, DefaultUser } from "./Icons";
import FollowButton from "./FollowButton";
import MessageButton from "./MessageButton";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const Box = styled.div`
    ${props=>props.theme.whiteBox}
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:100%;
`;
const UserAvator= styled.div`
    padding-right:10px;
    img{
        width:30px;
        height:30px;
        border: 0.5px solid ${props=>props.theme.lightGreyColor};
        border-radius:15px;
    }
`;
const Nametag = styled.div`
    font-size:medium;
    font-weight:600;
    color:black;
`;
export default ({user})=>{
    const [amIFollowing, setamIFollowing] = useState(user.amIFollowing);
    console.log(amIFollowing);
    return(<Box>
        {      <UserAvator>
            {user.avator ? <img src={user.avator}/>: <DefaultUser/>}
            </UserAvator>}
        <Link to={user.nickName} >
            <Nametag>{user.nickName}</Nametag>
        </Link>
        {amIFollowing?<MessageButton/>:<FollowButton id={user.id}
        setamIFollowing={setamIFollowing}/>}
    </Box>)
}
