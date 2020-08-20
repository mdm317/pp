import React from 'react';
import ProfilePresenter from './ProfilePresenter';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { GET_PROFILE } from './ProfileQuerys';

const ProfileContainer=  ({match:{url}})=>{
    const userName = url.substring(1);
    console.log(userName);
    const {data,loading} = useQuery(GET_PROFILE,{
        skip:url===undefined,
        variables:{nickName:userName}
    });
    return (
        <ProfilePresenter
            data= {data}
            loading={loading}
        />
    )
}
export default withRouter(ProfileContainer);
