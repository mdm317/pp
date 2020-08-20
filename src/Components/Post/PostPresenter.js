import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-autosize-textarea';

import { Heart, Comment, DefaultUser, HeartFill } from "../Icons";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
const Box = styled.div`
    ${props => props.theme.whiteBox}
    max-width:614px;
    width:100%;
    margin: 30px 0px;
    display:flex;
    flex-direction:column;
`;
const Top = styled.div`
    height:60px;
    width:100%;
    padding-left:5px;
    display:flex;
    flex-direction:row;
    padding-left:10px;
    align-items:center;
`
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
const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;
const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;
const BottomContainer = styled.div`
    flex-direction : column;
    display :flex;
    padding:10px;
`;
const Bottomnavi= styled.div`
    height:40px;
    width:100%;
    margin-top:2px;
    display:flex;
    align-items:center;
    svg{
        margin-left:15px;
    }
`;
const LikeCountBox= styled.div`
    display:flex;
    align-items:center;
    height:17px;
    font-weight:800;
    font-size:small;

`;
const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const CommentsBox= styled.div`
    display:flex;
    margin-top:10px;
    flex-direction:column;

`;
const CommentLine = styled.div`

    align-items: flex-end; 
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    
`;
const CommentWrapper = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:10px;
    justify-content: space-between; 
    align-items: center;
`;
const Textarea = styled(TextareaAutosize)`

    border: none;
    width: 80%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;
const SubmitBtn = styled.div`
    color:${props => props.theme.blueColor};
    font-size:small;
    font-weight:700;
`;
export default ({
    user,
    files,
    location,
    caption,
    commentsList,
    createdAt,
    clickLikeBtn,
    localIsLiked,
    localLikeCount,
    currentItem,
    commentText,
    addComment
})=> {
    return (
    <Box>
        <Top>
            <UserAvator>
            {user.avator ? <img src={user.avator}/>: <DefaultUser/>}
            </UserAvator>
            <Link to={user.nickName}>
                <Nametag>
                    {user.nickName}
                </Nametag>
            </Link>
        </Top>  
        <Files> {files &&
            files.map((file, index) => (
              <File key={index} src={file.url} showing={index === currentItem} />
            ))}</Files>
        <BottomContainer>
            <Bottomnavi>
                <div onClick={clickLikeBtn}><LikeButton localIsLiked={localIsLiked}/></div>
                

                <Comment/>

            </Bottomnavi>
            <LikeCountBox>
                좋아요 {localLikeCount}개
            </LikeCountBox>
            <CommentsBox>
                {commentsList.map((comment,i)=>{
                    return (
                        <CommentLine key={i}>
                        <Nametag>{comment.user.nickName}</Nametag>
                        &nbsp; {comment.text}
                        </CommentLine>
                        )
                    })}
            </CommentsBox>
            <CommentWrapper>
                <Textarea placeholder="댓글 달기..." onChange={commentText.onChange}/>
                <SubmitBtn onClick={addComment}>게시</SubmitBtn>
            </CommentWrapper>

        </BottomContainer>
        
        
    </Box>
)}


    


