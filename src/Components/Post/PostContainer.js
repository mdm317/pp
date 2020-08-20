import React, { useState,useEffect  } from "react";
import PropTypes from 'prop-types';
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQuerys";
import useInput from '../../Hooks/useInput';
import { toast } from "react-toastify";

const Post = ({id,caption,location,createdAt, user, files, comments,isLiked, likeCount})=>{

    const [localIsLiked, setLocalIsLiked] = useState(isLiked);
    const [localLikeCount, setLocalLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [commentsList, setCommentsList] = useState([...comments]);
    const commentText =useInput("");
    const slide = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
          setTimeout(() => setCurrentItem(0), 3000);
        } else {
          setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
      };
    useEffect(() => {
    slide();
    }, [currentItem]);
    const [toggleLike] = useMutation(TOGGLE_LIKE,{
        variables:{postId:id}
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables:{postId:id, text:commentText.value}
    });
    const clickLikeBtn = ()=>{
        toggleLike();
        if (localIsLiked === true) {
            setLocalIsLiked(false);
            setLocalLikeCount(localLikeCount - 1);
        } else {
            setLocalIsLiked(true);
            setLocalLikeCount(localLikeCount + 1);
        }
    };
    const addComment = async()=>{
        try {
            const {data:{addComments}}= await addCommentMutation();
            setCommentsList([...commentsList, addComments]);
            commentText.setValue= "";
        } catch (error) {
            console.log(error);
            toast.error('try again');
        }
    };
    return(<PostPresenter       
        user={user}
        files={files}
        location={location}
        caption={caption}
        commentsList={commentsList}
        createdAt={createdAt}
        clickLikeBtn= {clickLikeBtn}
        localIsLiked={localIsLiked}
        localLikeCount={localLikeCount}
        currentItem={currentItem}
        commentText={commentText}
        addComment= {addComment}
        />
    )
}
Post.propTypes= {
id: PropTypes.number.isRequired,
caption: PropTypes.string.isRequired,
createdAt: PropTypes.string.isRequired,
isLiked: PropTypes.bool.isRequired,
likeCount:  PropTypes.number.isRequired,
location:PropTypes.string,
user: PropTypes.shape({
    id:PropTypes.number.isRequired,
    nickName:PropTypes.string.isRequired,
    avator:PropTypes.string.isRequired,
}).isRequired,
files: PropTypes.arrayOf(PropTypes.shape({
    url:PropTypes.string
})).isRequired,
comments: PropTypes.arrayOf(
    PropTypes.shape({
    id:PropTypes.number,
    text:PropTypes.string,
    user:PropTypes.shape({
        id:PropTypes.number,
        nickName:PropTypes.string,
    })
    })
).isRequired
}
export default Post;