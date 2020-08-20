import React from 'react';



export default ({comments})=>
     (<>{comments.map(comment=>comment.user.nickName)}</>)
