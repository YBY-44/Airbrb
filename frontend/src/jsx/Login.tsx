import React, {
  useState,
  ChangeEvent,
  useContext,
  LabelHTMLAttributes,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { callAPIpost, meetErrorLog, ErrorContext } from './API';
import { styled } from '@mui/material';
interface QoneShowSelectProps extends LabelHTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
}
const ErrorLabel = styled('p')<QoneShowSelectProps>`
  font-size: 14px;
  width: 90%;
  padding: 0;
  padding-top: 10px;
  margin: 0;
  color: rgb(255, 0, 0);

  ${({ checked }) =>
    checked &&
    `
    color: #009e2d;
  `}
`;
const FormLabel = styled('label')({
  marginBottom: '0.5rem',
  marginLeft: '5px',
  fontSize: '15px',
});
const FormCheckbox = styled('input')({
  '--bs-form-check-bg': 'var(--bs-body-bg)',
  width: '1em',
  height: '1em',
  marginTop: '0.25em',
  verticalAlign: 'top',
  MozAppearance: 'none',
  backgroundColor: 'var(--bs-form-check-bg)',
  backgroundImage: 'var(--bs-form-check-bg-image)',
  backgroundRepeat: 'no-repeat',
  border: 'var(--bs-border-width) solid var(--bs-border-color)',
  borderRadius: '5px',
});
const FormControl = styled('input')({
  display: 'block',
  width: '95%',
  padding: '5px 5px',
  marginTop: '5px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.5',
  color: 'black',
  MozAppearance: 'none',
  backgroundColor: 'white',
  border: '1px solid rgb(220,220,220)',
  borderRadius: '5px',
});
const LoginButton = styled('button')({
  marginTop: '20px',
  marginBottom: '30px',
  backgroundColor: 'rgb(0, 128, 255)',
  fontSize: '17px',
  width: '90%',
  letterSpacing: '0.5px',
  minHeight: '40px',
  height: '40px',
  border: '0px',
  borderRadius: '5px',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgb(0, 109, 218);',
    color: 'white',
  },
});
const LoginOverAll = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px',
  width: '100%',
  height: '100%',
  display: 'flex',
  zIndex: '1',
  position: 'absolute',
  backgroundColor: 'rgb(0, 0, 0)',
  opacity: '0.4',
});
const LoginBlock = styled('div')({
  position: 'absolute',
  top: '50px',
  left: '10%',
  width: '80%',
  height: 'auto',
  maxHeight: '500px',
  zIndex: '2',
  boxShadow: '0px 1px 10px 1px rgba(86, 86, 86, 0.5)',
  backgroundColor: 'white',
  borderRadius: '20px',
  overflowX: 'hidden',
});
const LoginHeader = styled('div')({
  margin: '0px',
  padding: '0px 10px 0px 10px',
  display: 'flex',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  width: '100%',
  borderBottom: '1px solid rgb(222, 222, 222)',
  height: '50px',
});
const LoginInputBlock = styled('div')({
  marginTop: '10px',
  justifyContent: 'start',
  width: '90%',
  textAlign: 'start',
});
const DD = styled('div')({
  width: '100%',
  height: '100%',
});
const LoginCloseButton = styled('button')({
  border: '0px',
  backgroundColor: 'white',
  color: 'rgb(100, 100, 100)',
  margin: '6px 0px 0px 5px',
  padding: '0px',
  height: '30px',
  display: 'flex',
  fontSize: '30px',
  '&:hover': {
    color: 'rgb(0, 0, 0);',
  },
});
const LoginHeadText = styled('p')({
  marginTop: '10px',
  width: '90%',
  textAlign: 'center',
  fontWeight: '500',
});
const LoginCenterPart = styled('div')({
  height: 'auto',
  maxHeight: '430px',
  marginTop: '10px',
  marginBottom: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '100%',
  overflowY: 'scroll',
});
const LoginFormText = styled('div')({
  marginTop: '0.25rem',
  fontSize: '0.875em',
  color: 'var(--bs-secondary-color)',
});
export const LogPage = () => {
  // context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  console.log('LogPage');
  const { setOpenSnackbar } = ErrorValue;
  // inital check state
  const [checked, setChecked] = useState(false);
  // inital login emial
  const currentEmail = localStorage.getItem('RegistedUserEmail');
  const [logEmail, setLogEmail] = useState(currentEmail || '');
  // when email change
  const handleLogEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogEmail(event.target.value);
  };
  // intial password
  const [logPwd, setLogPwd] = useState('');
  // when password change
  const handleLogPwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogPwd(event.target.value);
  };
  // initial error message
  const [contentMsg, setcontentMsg] = useState('');
  const navigate = useNavigate();
  // remove email when focus
  const InputFocus = () => {
    localStorage.removeItem('RegistedUserEmail');
  };
  // remove email when click close button
  const CloseLoginPage = () => {
    localStorage.removeItem('RegistedUserEmail');
    navigate('/');
  };
  // initial see password state
  const [isSee, setIsSee] = useState(false);
  // change see password state
  const ChangeSee = () => {
    setIsSee(!isSee);
  };
  // when click login button
  const LoginClick = () => {
    let LoginFlag = true;
    // check email and password
    const data = {
      email: logEmail,
      password: logPwd,
    };
    // check email and password
    if (data.email.length <= 0) {
      LoginFlag = false;
      setcontentMsg('Email can not be nothing');
    } else if (data.password.length <= 7 || data.password.length >= 21) {
      LoginFlag = false;
      setcontentMsg('Password length incorrect');
    }
    type ApiResponse = {
      token: string;
    };
    // if email and password correct
    if (LoginFlag) {
      // call api to login
      callAPIpost('user/auth/login', data)
        .then((response) => {
          setcontentMsg('Log success');
          // set checked state
          setChecked(true);
          // set token and email to localstorage
          const token = (response as ApiResponse).token;
          console.log(response);
          setTimeout(() => {
            navigate('/user/' + data.email);
          }, 200);
          localStorage.setItem('LoggedUserEmail', data.email);
          localStorage.setItem('token', String(token));
          // set open snackbar
          setOpenSnackbar({
            severity: 'success',
            message: 'Welcome ' + data.email + ' !',
          });
          setOpenSnackbar({
            severity: 'success',
            message: '',
          });
        })
        .catch((error) => {
          // when meet error
          setOpenSnackbar({
            severity: 'error',
            message: meetErrorLog(error),
          });
          setOpenSnackbar({
            severity: 'error',
            message: '',
          });
          // show error message
          setcontentMsg(meetErrorLog(error));
        });
    }
  };
  return (
    <DD>
      <LoginOverAll></LoginOverAll>
      <LoginBlock>
        <LoginHeader>
          <LoginCloseButton type='button' onClick={CloseLoginPage}>
            ×
          </LoginCloseButton>
          <LoginHeadText>Log into Aribrb</LoginHeadText>
        </LoginHeader>
        <LoginCenterPart>
          <LoginInputBlock id='log-email'>
            <FormLabel>Email</FormLabel>
            <FormControl
              id='login-email'
              onFocus={InputFocus}
              onChange={handleLogEmailChange}
              value={logEmail}
            ></FormControl>
            <LoginFormText>
              Your email must be a valid email address so that we can contact
              you if necessary.
            </LoginFormText>
          </LoginInputBlock>
          <LoginInputBlock id='log-pwd'>
            <FormLabel>Password</FormLabel>
            <FormControl
              id='login-pwd'
              type={isSee ? 'text' : 'password'}
              aria-describedby='passwordHelpBlock'
              value={logPwd}
              onChange={handleLogPwdChange}
            ></FormControl>
            <FormCheckbox
              type='checkbox'
              value=''
              onClick={ChangeSee}
            ></FormCheckbox>
            <FormLabel> Show your password</FormLabel>
            <LoginFormText>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </LoginFormText>
          </LoginInputBlock>
          <ErrorLabel id='message' checked={checked}>
            {contentMsg}
          </ErrorLabel>
          <LoginButton id='login-button' type='button' onClick={LoginClick}>
            Login
          </LoginButton>
        </LoginCenterPart>
      </LoginBlock>
    </DD>
  );
};
