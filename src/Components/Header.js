import React, { useCallback } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from '../Hooks/useInput';
import { Logo, Follow, Explore,  LogoutBtn } from "./Icons";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import UserAvator from "./UserAvator";
const Box = styled.div`
    width: 100%;
    border-bottom:  1px solid #e6e6e6;
    background-color : white;
`;

const Wrapper = styled.div`

    display:flex;
    justify-content: space-between;
    height:50px;
    align-items: center; 
    max-width:950px;
    margin: 0 auto;
    padding: 0 10px;
    flex-basis :950px;
`;
const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;

  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;
const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  display :flex;
  flex-direction:column-count;
  justify-content: center;

  &:first-child {
    margin-right: auto;
    text-align: left;
    justify-content: flex-start;
  }
  &:last-child {
    justify-content: flex-end;
    margin-left: auto;
    text-align: right;
  }
`;
const HeaderLink = styled(Link)`
  margin-right: 30px;
`;
const LogoutBtnContainer = styled.div`
  cursor: pointer;
`;
const MY_PROFILE = gql`{
    myProfile{
        nickName
    }
}`;
const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
const Header = ({ history })=>{
  const search = useInput("");
  const {data} = useQuery(MY_PROFILE);
  const [logout] = useMutation(LOG_OUT);

  

  const onSubmit = useCallback(e=>{
      history.push(`/search?term=${search.value}`);
  },[search])
  return (
  <Box>
      <Wrapper>
          <HeaderColumn>
          <HeaderLink to="/">
          <Logo></Logo>
          </HeaderLink>
          </HeaderColumn>
          <HeaderColumn>
              <form onSubmit={onSubmit}>
              <SearchInput {...search} placeholder="Search" />
              </form>
          </HeaderColumn>
          <HeaderColumn>
              <HeaderLink to="/explore">
                  <Explore></Explore>
              </HeaderLink>

              <HeaderLink to="/notifications">
                  <Follow></Follow>
              </HeaderLink>
              {data && data.myProfile?
                <HeaderLink to={data.myProfile.nickName}>  
                <UserAvator size="24" />
                </HeaderLink>
                :
                <HeaderLink to="/">  
                  <UserAvator size="24" />
                </HeaderLink>
              }
              <LogoutBtnContainer onClick={logout}><LogoutBtn /></LogoutBtnContainer>

              

          </HeaderColumn>
      </Wrapper>
  </Box>
)
    }
export default withRouter(Header);