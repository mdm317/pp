import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    
    }
    button {
      margin-top: 10px;
    }
  }
`;

const LOGIN = "logIn";
const SIGNUP = "signUp";
const CONFIRM = "confirm";
export default ({
  action,
  userName,
  secretCode,
  firstName,
  lastName,
  email,
  setAction,
  onLogin,
  onSignUp,
  onConfirmSecret
}) => (
  <Wrapper>
    <Form>
      {action === LOGIN ? (
        <form onSubmit={onLogin}>
          <Input placeholder={"Email"} {...email} type="email" />
          <Button text={"Log in"} />
        </form>
      ):<></>}
      {action===SIGNUP?(
        <form onSubmit={onSignUp}>
          <Input placeholder={"First name"} {...firstName}  required={false} />
          <Input placeholder={"Last name"} {...lastName} />
          <Input placeholder={"Email"} {...email} type="email" />
          <Input placeholder={"Username"} {...userName} />
          <Button text={"Sign up"} />
        </form>
      ):<></>}
      {action===CONFIRM?(
        <form onSubmit={onConfirmSecret}>
        <Input placeholder={"SecretCode"} {...secretCode}  />
        <Button text={"Enter SecretCode"} />
      </form>
      ):<></>}
    </Form>
    <StateChanger>
      {action === LOGIN ? (
        <>
          Don't have an account?{" "}
          <Link onClick={() => setAction(SIGNUP)}>Sign up</Link>
        </>
      ) :<></>}
      {action=== SIGNUP?(
        <>
          Have an account?{" "}
          <Link onClick={() => setAction(LOGIN)}>Log in</Link>
        </>
      ):<></> } 
      {action === CONFIRM?(
        <>
          Check SecretCode{" "}
        </>
      ):<></>}
    </StateChanger>
  </Wrapper>
);