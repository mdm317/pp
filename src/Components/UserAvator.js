import React from 'react';
import styled  from "styled-components";
import { DefaultUser } from './Icons';
const UserAvator= styled.div`
    img{
        width:${props=> props.size};
        height:${props=> props.size};
        border: 0.5px solid ${props=>props.theme.lightGreyColor};
        border-radius:${props=>props.size};
    }
`;
export default ({avator,size=30})=>(
    <UserAvator>
        {avator ? <img src={avator} />: <DefaultUser size={size}/>}
    </UserAvator>

)