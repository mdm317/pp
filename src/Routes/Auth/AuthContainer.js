import React, { useState, useCallback } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_USER, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";

import { toast } from "react-toastify";

const CONFIRM = "confirm";
const SIGNUP = "signUp";
const LOGIN = "logIn";


export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("a");
  const firstName = useInput("f");
  const lastName = useInput("f");
  const email = useInput("a@x");
  const secretCode = useInput("");
  const checkOverlapError= useCallback((errorMessage) => {
    console.log(errorMessage);
    if(errorMessage.indexOf('nickName')!==-1){
      toast.error(`Change NickName`);
      return true;
    }else if(errorMessage.indexOf('email')!==-1){
      toast.error(`Change Email`);
      return true;
    }
    return false;
  }, [])
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      if(data){
        const { requestSecret } = data;
        if (requestSecret === false) {
          toast.error("You dont have an account yet, create one");
          setTimeout(() => setAction("signUp"), 3000);
        }else {
          toast.error("check your Email");
          setTimeout(() => setAction(CONFIRM), 3000);
        }
      }else{
        toast.error("Try Again");
      }

    },
    variables: { email: email.value }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,{
    variables:{email: email.value, secretCode:secretCode.value}
  });
  const onLogin =  e => {
    e.preventDefault();
    if (email.value !== "") {
      requestSecret();
    }
  };
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const onConfirmSecret = async e=>{
    e.preventDefault();
    if(secretCode.value!== ""){
      try {
        const {data} = await confirmSecretMutation();
        const {confirmSecret:token} = data;
        console.log(token);
        if(token!==null){
          console.log(token);    
          localLogInMutation({variables:{token}});
        }else{
          toast.error('check your secretCode');
        }
      } catch (error) {
        console.log(error);
        toast.error('Try Again!');
      }
    }
  }
  const [createUserMutation] = useMutation(CREATE_USER,{
    variables:{userName:userName.value,
      firstName:firstName.value,
      lastName:lastName.value,
      email:email.value,
    }
  });
  const onSignUp = async(event)=>{
    event.preventDefault();
    if(userName.value=== "" && lastName.value=== "" && email.value=== "" ){
      console.log(userName.value,
        lastName.value,
        email.value)
      toast.error("fill blank");
    }else{
      try {
        const {data:{createUser}} = await createUserMutation();
        toast.success('create Acoount!! Try Log In');
        setTimeout(() => setAction(CONFIRM), 3000);

      } catch (error) {
        if(checkOverlapError(error.message)===false){
          toast.error(`Can't create Account Try again`);
        }
      }
    }

  }
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onLogin={onLogin}
      onSignUp={onSignUp}
      secretCode={secretCode}
      onConfirmSecret={onConfirmSecret}
    />
  );
};