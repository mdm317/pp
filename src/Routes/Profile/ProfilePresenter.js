import React from 'react';
import Loader from '../../Components/Loader';
import styled  from "styled-components";
import UserAvator from '../../Components/UserAvator';
import { toast } from 'react-toastify';
import PhotoCard from '../../Components/PhotoCard';

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
`;
const UserContainer = styled.div`
    flex-basis:935px;
    max-width:935px;
`;
const Header = styled.div`
    display:flex;
    margin-bottom:60px; 
    margin-top:10px;
    width:100%;
`;
const HeaderColumn = styled.div`
    margin-right:30px;
    display:flex;
    &:first-child {
        width:33%;
        margin: 0 70px;
    }
    &:last-child {
        width:66%;
    }
`;
const Nickname = styled.div`
    font-size :32px;
`;
const UserInfoContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin : auto 0;
`;
const UserInfoColumn = styled.div`
    margin-top:15px;
    ul{
        display:flex;
        flex-direction:row; 
        li{ 
            font-size:large;
            display:flex;
            flex-direction:row;
            &:not(:first-child) {
                margin-left:40px;
            }
        }
    }
`;
const FatText = styled.div`
    margin-left:5px;
    font-weight:600;
`;
const UserPost = styled.div`
justify-content: space-between;
    border-top :1px solid ${props=>props.theme.lightGreyColor};
    display : flex;
    flex-wrap: wrap;
    width:100%;
    
`;

export default ({data,loading})=>{
    console.log(data, loading);
    if(loading){
        return (<Loader/>);
    }else if(data && data.userProfile){
        console.log(data.userProfile);
        const {
            userProfile: {
              id,
              avator,
              nickName,
              fullName,
              isFollowing,
              isSelf,
              bio,
              followingCount,
              followersCount,
              postsCount,
              posts
            }
        } = data;

        return(
            <Wrapper>
                <UserContainer>
                    <Header>
                        <HeaderColumn>
                            <UserAvator avator={avator} size="150"/>
                        </HeaderColumn>
                        <HeaderColumn>
                            <UserInfoContainer>
                                <Nickname>{nickName}</Nickname>
                                <UserInfoColumn>
                                    <ul>
                                        <li>게시물<FatText>{posts.length}</FatText></li>
                                        <li>팔로워<FatText>{followingCount?followingCount:0}</FatText></li>
                                        <li>팔로우<FatText>{followersCount?followersCount:0}</FatText></li>
                                    </ul>
                                    
                                    
                                    
                                </UserInfoColumn>               
                            </UserInfoContainer>
                        </HeaderColumn>
                    </Header>
                    <UserPost>
                        {posts.map((post,i)=>
                            (<PhotoCard 
                                key = {i}
                                image={post.files[0].url}
                                likeCount= {post.likeCount}
                                commentCount= {post.commentCount}
                                />)
                        )}
                        
                    </UserPost>
                </UserContainer>
            </Wrapper>
        )
    }
    else{
        toast.error("NO RESULT");
        return "NO RESULT";
    }
    
}