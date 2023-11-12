import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ListingDetailSmall, ListingDetailLarge } from './jsx/detail';
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  LabelHTMLAttributes,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import {
  useNavigate,
  BrowserRouter as Router,
  // useParams,
  Route,
  Routes,
} from 'react-router-dom';
import { callAPIpost, CallAPIPostWithToken, errorMessage } from './jsx/API';
import {
  SmallHostPage,
  LargeHostPage,
  CreateHosting,
  EditHosting,
} from './jsx/Host';
import { PublishPage } from './jsx/publish';
import TextField from '@mui/material/TextField';
import { GetAllListing } from './jsx/get_all_listing';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material';
// when meet error then show the error
export const meetError = (error: string) => {
  console.log(error);
  let errorText = '';
  switch (error) {
    case 'info':
      errorText = 'Input error!';
      break;
    case 'access':
      errorText = 'Access error!';
      break;
    default:
      errorText = 'Network error! Please try again.';
      break;
  }
  errorMessage(String(errorText));
  return errorText;
};

interface LoginModels {
  isOpen: boolean;
  close: () => void;
}

const HiddenBtn = styled('button')({
  color: 'rgb(79, 79, 79)',
  textAlign: 'start',
  fontSize: '13px',
  margin: '0px 0px 10px 0px',
  padding: '10px 0px 10px 10px',
  backgroundColor: 'white',
  border: '0px',
  '&:hover': { backgroundColor: 'rgb(247, 247, 247)', border: '0px' },
});
const FilterBar = styled('img')({
  display: 'flex',
  width: '40px',
  height: '40px',
  padding: '10px',
  marginRight: '10px',
  objectFit: 'cover',
  borderRadius: '30px',
  border: '1px solid rgb(112, 112, 112)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 240)',
  },
});
const HiddenBtnBlack = styled('button')({
  textAlign: 'start',
  fontSize: '13px',
  margin: '0px 0px 10px 0px',
  padding: '10px 0px 10px 10px',
  backgroundColor: 'white',
  border: '0px',
  fontWeight: '500',
  color: 'black',
  '&:hover': { backgroundColor: 'rgb(247, 247, 247)', border: '0px' },
});
const LogHidden = styled('div')({
  zIndex: '1',
  padding: '10px 0px 0px 0px',
  borderRadius: '10px',
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  boxShadow: '0px 1px 10px 1px rgba(164, 164, 164, 0.5)',
  position: 'absolute',
  right: '50px',
  '@media (max-width: 760px)': {
    bottom: '55px',
  },
  '@media (min-width: 760px)': {
    top: '70px',
  },
});
const LogoutHidden = styled('div')({
  zIndex: '1',
  padding: '10px 0px 0px 0px',
  borderRadius: '10px',
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  boxShadow: '0px 1px 10px 1px rgba(164, 164, 164, 0.5)',
  position: 'absolute',
  right: '50px',
  top: '70px',
});
export const LoginModel: React.FC<LoginModels> = ({ isOpen, close }) => {
  const navigate = useNavigate();
  console.log(isOpen);
  const showLoginPage = () => {
    close();
    navigate('/login');
  };
  const showRegistPage = () => {
    close();
    navigate('/register');
  };
  const componment = (
    <div>
      <LogHidden id='log' role='group' aria-label='Vertical button group'>
        <HiddenBtnBlack type='button' onClick={showLoginPage}>
          Log in
        </HiddenBtnBlack>
        <HiddenBtn type='button' onClick={showRegistPage}>
          Sign up
        </HiddenBtn>
      </LogHidden>
    </div>
  );
  return isOpen ? componment : null;
};
interface LogoutModels {
  isOpen: boolean;
  close: () => void;
}
export const LogoutModelHost: React.FC<LogoutModels> = ({ isOpen, close }) => {
  const navigate = useNavigate();
  console.log(isOpen);
  const LogoutClick = () => {
    close();
    let token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      token = '';
    }
    CallAPIPostWithToken('user/auth/logout', {}, token)
      .then(() => {
        console.log('logout');
        navigate('/');
        localStorage.clear();
      })
      .catch((error) => {
        meetError(error);
      });
  };
  const componment = (
    <div>
      <LogoutHidden id='log' role='group' aria-label='Vertical button group'>
        <HiddenBtnBlack type='button' onClick={LogoutClick}>
          Log out
        </HiddenBtnBlack>
      </LogoutHidden>
    </div>
  );
  return isOpen ? componment : null;
};

export const LogoutModel: React.FC<LogoutModels> = ({ isOpen, close }) => {
  const navigate = useNavigate();
  console.log(isOpen);
  const LogoutClick = () => {
    close();
    let token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      token = '';
    }
    CallAPIPostWithToken('user/auth/logout', {}, token)
      .then(() => {
        console.log('logout');
        navigate('/');
        localStorage.clear();
      })
      .catch((error) => {
        meetError(error);
      });
  };
  const componment = (
    <div>
      <LogHidden id='log' role='group' aria-label='Vertical button group'>
        <HiddenBtnBlack type='button' onClick={LogoutClick}>
          Log out
        </HiddenBtnBlack>
      </LogHidden>
    </div>
  );
  return isOpen ? componment : null;
};

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
  left: '20%',
  width: '60%',
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
const LoginCloseButton = styled('button')({
  border: '0px',
  backgroundColor: 'white',
  color: 'rgb(100, 100, 100)',
  margin: '0px 0px 0px 0px',
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
  maxHeight: '440px',
  marginTop: '10px',
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
  width: '1em', // 添加单引号
  height: '1em', // 添加单引号
  marginTop: '0.25em', // 添加单引号
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
  width: '100%',
  padding: '0.375rem 0.75rem',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: 'var(--bs-body-color)',
  MozAppearance: 'none', // 同上
  backgroundColor: 'var(--bs-body-bg)',
  border: 'var(--bs-border-width) solid var(--bs-border-color)',
  borderRadius: 'var(--bs-border-radius)',
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
const LogPage = () => {
  const [checked, setChecked] = useState(false);
  const currentEmail = localStorage.getItem('RegistedUserEmail');
  const [logEmail, setLogEmail] = useState(currentEmail || '');
  const handleLogEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogEmail(event.target.value);
  };
  const [logPwd, setLogPwd] = useState('');
  const handleLogPwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogPwd(event.target.value);
  };
  const [contentMsg, setcontentMsg] = useState('');
  const navigate = useNavigate();
  const InputFocus = () => {
    localStorage.removeItem('RegistedUserEmail');
  };
  const CloseLoginPage = () => {
    localStorage.removeItem('RegistedUserEmail');
    navigate('/');
  };
  const [isSee, setIsSee] = useState(false);
  const ChangeSee = () => {
    setIsSee(!isSee);
  };
  const LoginClick = () => {
    let LoginFlag = true;

    const data = {
      email: logEmail,
      password: logPwd,
    };
    if (data.email.length <= 0) {
      LoginFlag = false;
      setcontentMsg('Email can not be nothing');
    } else if (data.password.length <= 7 || data.password.length >= 21) {
      LoginFlag = false;
      setcontentMsg('Password length incorrect');
    }
    type ApiResponse = {
      token: string;
      // 可以添加其他属性，以匹配实际响应的数据结构
    };
    if (LoginFlag) {
      callAPIpost('user/auth/login', data)
        .then((response) => {
          setChecked(true);
          const token = (response as ApiResponse).token;
          console.log(response);
          setTimeout(() => {
            navigate('/user/' + data.email);
          }, 200);
          localStorage.setItem('LoggedUserEmail', data.email);
          localStorage.setItem('token', String(token));
        })
        .catch((error) => {
          console.log(error);
          setcontentMsg(meetError(error));
        });
    }
  };
  return (
    <div>
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
    </div>
  );
};

const RegistPage = () => {
  const [checked, setChecked] = useState(false);
  const [pwd, setPWD] = useState('');
  const handlepwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPWD(event.target.value);
  };
  const [pwdcfm, setPWDCFM] = useState('');
  const handlecfmpwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPWDCFM(event.target.value);
  };
  const [email, setEmail] = useState('');
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [name, setName] = useState('');
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const navigate = useNavigate();
  const CloseRegistPage = () => {
    navigate('/');
  };
  const [contentMsg, setcontentMsg] = useState('');
  const [isSeePWD, setIsSeePWD] = useState(false);
  const ChangeSeePWD = () => {
    setIsSeePWD(!isSeePWD);
  };
  const [isSeeCPWD, setIsSeeCPWD] = useState(false);
  const ChangeSeeCPWD = () => {
    setIsSeeCPWD(!isSeeCPWD);
  };
  const registClick = () => {
    let registFlag = true;
    const data = {
      email,
      password: pwd,
      name,
    };
    if (data.email.length <= 0) {
      registFlag = false;
      setcontentMsg('Email can not be nothing');
    } else if (data.name.length <= 0) {
      registFlag = false;
      setcontentMsg('Name can not be nothing');
    } else if (data.password.length <= 7 || data.password.length >= 21) {
      registFlag = false;
      setcontentMsg('Password length incorrect');
    } else if (data.password !== pwdcfm) {
      registFlag = false;
      setcontentMsg('Two password entered is different');
    }
    if (registFlag) {
      callAPIpost('user/auth/register', data)
        .then(() => {
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          setChecked(true);
          localStorage.setItem('RegistedUserEmail', email);
          setcontentMsg(
            'Register successfully and we will login for you in 3 seconds.'
          );
        })
        .catch((error) => {
          console.log(error);
          setcontentMsg('This email has been Registed');
        });
    }
  };
  return (
    <div>
      <LoginOverAll></LoginOverAll>
      <LoginBlock>
        <LoginHeader>
          <LoginCloseButton type='button' onClick={CloseRegistPage}>
            ×
          </LoginCloseButton>
          <LoginHeadText>Sign up for Aribrb</LoginHeadText>
        </LoginHeader>
        <LoginCenterPart>
          <LoginInputBlock id='email-part'>
            <FormLabel>Email</FormLabel>
            <FormControl
              id='email'
              onChange={handleEmailChange}
              value={email}
            ></FormControl>
            <LoginFormText>
              Your email must be a valid email address so that we can contact
              you if necessary.
            </LoginFormText>
          </LoginInputBlock>
          <LoginInputBlock id='name-part'>
            <FormLabel>Name</FormLabel>
            <FormControl
              id='name'
              onChange={handleNameChange}
              value={name}
            ></FormControl>
            <LoginFormText>What do you want us to call you?</LoginFormText>
          </LoginInputBlock>
          <LoginInputBlock id='pwd-part'>
            <FormLabel>Password</FormLabel>
            <FormControl
              type={isSeePWD ? 'text' : 'password'}
              aria-describedby='passwordHelpBlock'
              onChange={handlepwdChange}
              value={pwd}
              id='pwd'
            ></FormControl>
            <FormCheckbox
              type='checkbox'
              value=''
              onClick={ChangeSeePWD}
            ></FormCheckbox>
            <FormLabel>Show your password</FormLabel>
            <LoginFormText>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </LoginFormText>
          </LoginInputBlock>
          <LoginInputBlock id='pwdcfm-part'>
            <FormLabel>Confirm your Password</FormLabel>
            <FormControl
              type={isSeeCPWD ? 'text' : 'password'}
              id='pwdcfm'
              onChange={handlecfmpwdChange}
              value={pwdcfm}
            ></FormControl>
            <FormCheckbox
              type='checkbox'
              value=''
              onClick={ChangeSeeCPWD}
            ></FormCheckbox>
            <FormLabel>Show your password</FormLabel>
            <LoginFormText>
              Repeat the password you entered in the previous field.
            </LoginFormText>
          </LoginInputBlock>
          <ErrorLabel id='message' checked={checked}>
            {contentMsg}
          </ErrorLabel>
          <LoginButton onClick={registClick} id='regist-button' type='button'>
            Sign up
          </LoginButton>
        </LoginCenterPart>
      </LoginBlock>
    </div>
  );
};

export const SmallHomePagecss = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});
export const SmallHomeHead = styled('div')({
  width: '100%',
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgb(230, 230, 230)',
});
const SmallHomeHeadInputOuter = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const SmallHomeHeadInputInner = styled('div')({
  boxShadow: '0px 1px 5px 1px rgba(202, 202, 202, 0.5)',
  transition: '0.3s',
  border: '1px solid rgb(221, 221, 221)',
  borderRadius: '30px',
  padding: '7px',
  width: '90%',
  height: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '0px 1px 10px 1px rgba(164, 164, 164, 0.5)',
    transition: '0.3s',
  },
});
const SmallHomeHeadInput = styled('input')({
  fontSize: '15px',
  borderRadius: '10px',
  width: '90%',
  height: '100%',
  padding: '8px 8px 10px 10px',
  border: '0px',
  justifyContent: 'center',
  '&::placeholder': {
    color: 'rgb(131, 131, 131)',
  },
});
const SmallHomeHeadsearch = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  marginLeft: '7px',
  borderRadius: '30px',
  backgroundColor: 'rgb(0, 149, 255)',
});

const SmallHomeHeadsearchimg = styled('img')({
  height: '100%',
  cursor: 'pointer',
  padding: '8px',
});

const SmallHomeCenter = styled('div')({
  zIndex: '0',
  width: '100%',
  paddingTop: '20px',
  display: 'flex',
  height: 'calc(100vh - 140px)',
  justifyContent: 'center',
  overflow: 'hidden',
  overflowY: 'scroll',
});

export const SmallHomeBottom = styled('div')({
  padding: '10px 0px 0px 0px',
  display: 'flex',
  justifyContent: 'space-around',
  height: '50px',
  borderTop: '1px solid rgb(230, 230, 230)',
  fontWeight: '300',
});
export const SmallBottomButtonOuter = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'rgb(58, 58, 58)',
  fontSize: '10px',
  cursor: 'pointer',
});
export const SmallButtomButton1 = styled('img')({
  marginBottom: '3px',
  filter: 'brightness(0.4)',
  width: '25px',
  height: '25px',
});
export const SmallButtomButton2 = styled('img')({
  marginBottom: '3px',
  filter: 'brightness(1)',
  width: '25px',
  height: '25px',
});
interface ConfirmCreatProps {
  isOpen: boolean;
  close: () => void;
}
const FilterBlock = styled('div')({
  '@media (max-width: 760px)': {
    width: '100%',
    left: '0%',
  },
  '@media (min-width: 760px)': {
    width: '70%',
    left: '15%',
  },
  position: 'absolute',
  top: '50px',
  height: 'calc(100vh - 50px)',
  zIndex: '2',
  boxShadow: '0px 1px 10px 1px rgba(86, 86, 86, 0.5)',
  backgroundColor: 'white',
  borderRadius: '15px',
  overflowX: 'hidden',
});
const FliterCenterPart = styled('div')({
  height: 'calc(100vh - 210px)',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '100%',
  overflowY: 'scroll',
  borderBottom: '1px solid rgb(200,200,200)',
});
const FliterBottomPart = styled('div')({
  height: '90px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '100%',
  overflowY: 'scroll',
});
const PriceTextField = ({ ...props }) => {
  return (
    <TextField
      {...props}
      inputProps={{
        maxLength: 5,
      }}
      InputProps={{
        startAdornment: <InputAdornment position='start'>$</InputAdornment>,
      }}
    />
  );
};
const BedTextField = ({ ...props }) => {
  return (
    <TextField
      {...props}
      inputProps={{
        maxLength: 2,
        sx: { width: '50px' },
      }}
    />
  );
};
const Filtertitle = styled('p')({
  textAlign: 'center',
  fontWeight: '700',
  fontSize: '20px',
  width: '100%',
  marginTop: '10px',
});
const Filterblock = styled('div')({
  width: '100%',
  display: 'flex',
  borderBottom: '1px solid rgb(200,200,200)',
  padding: '30px',
  flexDirection: 'column',
});
const FilterT1 = styled('div')({
  fontWeight: '500',
  fontSize: '25px',
  padding: '0px',
  margin: '0px',
});
const FilterT2 = styled('div')({
  fontWeight: '300',
  fontSize: '16px',
  padding: '0px 0px 30px 0px',
  margin: '0px',
});
const PriceP = styled('div')({
  '@media (max-width: 450px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 450px)': {
    flexDirection: 'row',
  },
  width: '100%',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const TO = styled('p')({
  margin: '0px 20px 0px 20px',
  padding: '0px',
});
const FirstButton = styled('div')({
  margin: '20px 0px 0px 0px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const ContainerForFilter = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  borderBottom: '1px solid rgb(220,220,220)',
});
const LargeFilter = styled('button')({
  right: '0px',
  backgroundColor: 'rgb(255,255,255)',
  margin: '10px 20px 10px 0px',
  color: 'black',
  border: '2px solid black',
  borderRadius: '10px',
  height: '40px',
  minHeight: '40px',
  width: '100px',
  fontSize: '15px',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 240)',
  },
});
const FilterLeftBtn = styled('button')({
  marginLeft: '20px',
  color: 'black',
  backgroundColor: 'white',
  border: '0px',
  borderRadius: '10px',
  fontSize: '20px',
  height: '55px',
  width: '120px',
  fontWeight: '500',
  letterSpacing: '0.5px',
  textDecoration: 'underline',
  '&:hover': {
    backgroundolor: 'rgb(245, 245, 245)',
  },
});
const FilterRightBtn = styled('button')({
  backgroundColor: 'rgb(35, 35, 35)',
  marginRight: '20px',
  color: 'white',
  border: '0px',
  borderRadius: '10px',
  height: '60px',
  width: '200px',
  fontSize: '20px',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: 'rgb(0, 0, 0)',
  },
});
const BedBlock = styled('div')({
  width: '100%',
  margin: '25px 0px 0px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const IntervalContent = styled('div')({
  '@media (max-width: 520px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 520px)': {
    flexDirection: 'row',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});
const minimumOne = (num1: number | null, num2: number | null) => {
  if (num1 === null) {
    num1 = 1;
  }
  if (num2 === null) {
    num2 = 99999;
  }
  if (num1 - num2 > 0) {
    return num2;
  }
  return num1;
};
const maximumOne = (num1: number | null, num2: number | null) => {
  if (num1 === null) {
    num1 = 1;
  }
  if (num2 === null) {
    num2 = 99999;
  }
  if (num1 - num2 > 0) {
    return num1;
  }
  return num2;
};
interface ConfirmFilterProps {
  isOpen: boolean;
  close: () => void;
  reloadMethod: () => void;
}
const FilterPage: React.FC<ConfirmFilterProps> = ({
  reloadMethod,
  isOpen,
  close,
}) => {
  const numberPattern = /^([1-9]\d{0,4})?$/;
  const numberPattern2 = /^([1-9]\d{0,1})?$/;
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const {
    MinPrice,
    MaxPrice,
    Checkin,
    Checkout,
    MinBed,
    MaxBed,
    sortWay,
    setSortWay,
    setMinPrice,
    setMaxPrice,
    setCheckin,
    setCheckout,
    setMinbed,
    setMaxbed,
  } = FilterValue;
  const handdleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern.test(event.target.value)) {
      setMinPrice(Number(event.target.value));
    }
  };
  const handdleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern.test(event.target.value)) {
      setMaxPrice(Number(event.target.value));
    }
  };
  const handdleMinbedChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern2.test(event.target.value)) {
      setMinbed(Number(event.target.value));
    }
  };
  const handdleMaxbedChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern2.test(event.target.value)) {
      setMaxbed(Number(event.target.value));
    }
  };
  const handlePriceBlur = () => {
    if (MinPrice && MaxPrice && MinPrice > MaxPrice) {
      setMaxPrice(MinPrice);
      setMinPrice(MaxPrice);
    }
  };
  const handleBedBlur = () => {
    if (MinBed && MaxBed && MinBed > MaxBed) {
      setMaxbed(MinBed);
      setMinbed(MaxBed);
    }
  };
  const handleCheckinChange = (date: Date | null) => {
    // 在这里处理用户选择"Check in"日期的逻辑
    setCheckin(date);
    // 如果"Check out"日期已经选择，并且"Check in"日期晚于"Check out"日期，则将"Check in"日期调整为"Check out"日期
    if (date && Checkout && date > Checkout) {
      setCheckout(date);
    }
  };

  const handleCheckoutChange = (date: Date | null) => {
    // 在这里处理用户选择"Check out"日期的逻辑
    setCheckout(date);

    // 如果"Check in"日期已经选择，并且"Check out"日期早于"Check in"日期，则将"Check out"日期调整为"Check in"日期
    if (date && Checkin && date < Checkin) {
      setCheckin(date);
    }
  };
  const ResetFilter = () => {
    setSortWay(null);
    setMinPrice(1);
    setMaxPrice(99999);
    setCheckin(null);
    setCheckout(null);
    setMinbed(1);
    setMaxbed(99);
  };
  const content = (
    <div>
      <LoginOverAll></LoginOverAll>
      <FilterBlock>
        <LoginHeader>
          <LoginCloseButton type='button' onClick={close}>
            ×
          </LoginCloseButton>
          <Filtertitle>Filters</Filtertitle>
        </LoginHeader>
        <FliterCenterPart>
          <FirstButton>
            <ToggleButtonGroup
              value={sortWay !== null ? String(sortWay) : ''}
              color='primary'
              exclusive
              aria-label='Platform'
            >
              <ToggleButton
                value=''
                sx={{
                  color: 'black',
                  textTransform: 'none',
                }}
                onClick={() => {
                  setSortWay(null);
                }}
              >
                Default
              </ToggleButton>
              <ToggleButton
                value='true'
                sx={{
                  color: 'black',
                  textTransform: 'none',
                }}
                onClick={() => {
                  setSortWay(true);
                }}
              >
                Highest rated
              </ToggleButton>
              <ToggleButton
                value='false'
                sx={{
                  color: 'black',
                  textTransform: 'none',
                }}
                onClick={() => {
                  setSortWay(false);
                }}
              >
                Lowest rated
              </ToggleButton>
            </ToggleButtonGroup>
          </FirstButton>
          <Filterblock>
            <FilterT1>Price range</FilterT1>
            <FilterT2>Prices for each night including fees and taxes</FilterT2>
            <PriceP>
              <PriceTextField
                label='Minimum'
                value={MinPrice ? String(MinPrice) : ''}
                onChange={handdleMinPriceChange}
                onBlur={handlePriceBlur}
              />
              <TO> - </TO>
              <PriceTextField
                label='Maximum'
                value={MaxPrice ? String(MaxPrice) : ''}
                onChange={handdleMaxPriceChange}
                onBlur={handlePriceBlur}
              />
            </PriceP>
          </Filterblock>
          <Filterblock>
            <FilterT1>Date range</FilterT1>
            <FilterT2>The listing would available for whole range</FilterT2>
            <IntervalContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='Check in'
                    value={Checkin}
                    onChange={handleCheckinChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TO> - </TO>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='Check out'
                    value={Checkout}
                    onChange={handleCheckoutChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </IntervalContent>
          </Filterblock>
          <Filterblock>
            <FilterT1>Bedrooms</FilterT1>
            <BedBlock>
              <BedTextField
                label='Min'
                value={MinBed ? String(MinBed) : ''}
                onChange={handdleMinbedChange}
                onBlur={handleBedBlur}
              />
              <TO> - </TO>
              <BedTextField
                label='Max'
                value={MaxBed ? String(MaxBed) : ''}
                onChange={handdleMaxbedChange}
                onBlur={handleBedBlur}
              />
            </BedBlock>
          </Filterblock>
        </FliterCenterPart>
        <FliterBottomPart>
          <FilterLeftBtn
            onClick={() => {
              ResetFilter();
            }}
          >
            Clear all
          </FilterLeftBtn>
          <FilterRightBtn
            onClick={() => {
              reloadMethod();
              close();
            }}
          >
            Search now
          </FilterRightBtn>
        </FliterBottomPart>
      </FilterBlock>
    </div>
  );
  return isOpen ? content : null;
};

const SmallHomePage = () => {
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { searchcontent, setcontent } = FilterValue;
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  const [reload, setReload] = useState(true);
  const reloading = () => {
    setReload((prevReload) => !prevReload);
  };
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  // const ClickOther = (event: React.MouseEvent) => {
  //   if (
  //     TargetMenu.current &&
  //     !TargetMenu.current.contains(event.target as Node)
  //   ) {
  //     setOpen(false);
  //   }
  // };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  const openfilter = () => {
    setFilter(true);
  };
  const closefilter = () => {
    setFilter(false);
  };
  return (
    <SmallHomePagecss>
      <div ref={TargetMenu}>
        <Routes>
          <Route
            path='/'
            element={<LoginModel isOpen={isOpen} close={close} />}
          />
          <Route
            path='/user/:userId'
            element={<LogoutModel isOpen={isOpen} close={close} />}
          />
          <Route path='*' element={NaN} />
        </Routes>
      </div>
      <div>
        <FilterPage
          reloadMethod={reloading}
          isOpen={isFilter}
          close={closefilter}
        />
      </div>
      <SmallHomeHead>
        <SmallHomeHeadInputOuter>
          <SmallHomeHeadInputInner>
            <SmallHomeHeadInput
              onChange={handdlesearch}
              value={searchcontent}
              placeholder=' Anywhere   |   Any week   |   Add guests '
            ></SmallHomeHeadInput>
            <SmallHomeHeadsearch>
              <SmallHomeHeadsearchimg
                src='/img/search.png'
                onClick={() => {
                  reloading();
                }}
              ></SmallHomeHeadsearchimg>
            </SmallHomeHeadsearch>
          </SmallHomeHeadInputInner>
        </SmallHomeHeadInputOuter>
        <FilterBar
          src='/img/filter.png'
          onClick={() => {
            openfilter();
          }}
        ></FilterBar>
      </SmallHomeHead>
      <SmallHomeCenter>
        <GetAllListing key={reload.toString()} />
      </SmallHomeCenter>
      <SmallHomeBottom>
        <SmallBottomButtonOuter>
          <SmallButtomButton1 src='/img/search.png'></SmallButtomButton1>
          <p>Explore</p>
        </SmallBottomButtonOuter>
        <SmallBottomButtonOuter onClick={goesHost}>
          <SmallButtomButton1 src='/img/hosting.png'></SmallButtomButton1>
          <p>Hosting</p>
        </SmallBottomButtonOuter>
        <Routes>
          <Route
            path='/user/:userId'
            element={
              <SmallBottomButtonOuter onClick={ClickProfile}>
                <SmallButtomButton2 src='/img/logged.png'></SmallButtomButton2>
                <p>Profile</p>
              </SmallBottomButtonOuter>
            }
          />
          <Route
            path='*'
            element={
              <SmallBottomButtonOuter onClick={ClickProfile}>
                <SmallButtomButton2 src='/img/profile.png'></SmallButtomButton2>
                <p>Log in</p>
              </SmallBottomButtonOuter>
            }
          />
        </Routes>
      </SmallHomeBottom>
    </SmallHomePagecss>
  );
};
export const LargeHomePagecss = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});
export const LargeHomeHead = styled('div')({
  width: '100%',
  height: '80px',
  display: 'flex',
  borderBottom: '1px solid rgb(230, 230, 230)',
});
export const LargeHomeHeadLogo = styled('div')({
  width: '70px',
  height: '100%',
  display: 'flex',
  borderBottom: '1px solid rgb(230, 230, 230)',
});
export const LargeHomeHeadLogoContent = styled('img')({
  height: '110%',
  objectFit: 'cover',
});
export const LargeHomeHeadSearchContent = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  display: 'flex',
  flex: '1',
});
export const LargeHomeHeadInputInner = styled('div')({
  boxShadow: '0px 1px 5px 1px rgba(202, 202, 202, 0.5)',
  transition: '0.3s',
  border: '1px solid rgb(221, 221, 221)',
  borderRadius: '30px',
  padding: '7px',
  width: '90%',
  maxWidth: '500px',
  height: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '0px 1px 10px 1px rgba(164, 164, 164, 0.5)',
    transition: '0.3s',
  },
});
export const LargeHomeHeadInput = styled('input')({
  fontSize: '15px',
  borderRadius: '10px',
  width: '90%',
  height: '100%',
  padding: '8px 8px 10px 10px',
  border: '0px',
  justifyContent: 'center',
  '&::placeholder': {
    color: 'rgb(131, 131, 131)',
  },
});
export const LargeHomeHeadsearch = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  marginLeft: '7px',
  borderRadius: '30px',
  backgroundColor: 'rgb(0, 149, 255)',
});
export const LargeHomeHeadsearchimg = styled('img')({
  height: '100%',
  cursor: 'pointer',
  padding: '8px',
});
export const LargeHomeSwitchBar = styled('div')({
  maxWidth: '180px',
  minWidth: '180px',
});
export const SwitchContent = styled('p')({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  height: '40px',
  cursor: 'pointer',
  fontWeight: '500',
  letterSpacing: '0.2px',
  backgroundColor: 'rgb(255, 255, 255)',
  margin: '20px 0px 10px 0px',
  padding: '0px 10px 0px 10px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 240)',
  },
});
export const LargeProfile = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  height: '100%',
  width: '110px',
  margin: '0px 20px 0px 15px',
});
export const LargeProfileOuter = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  height: '60%',
  minWidth: '110px',
  cursor: 'pointer',
  borderRadius: '30px',
  margin: '0px 20px 0px 15px',
  border: '1px solid rgb(221, 221, 221)',
  '&:hover': {
    boxShadow: '0px 0px 10px 0px rgba(200, 200, 200, 0.5)',
    transition: '0.3s',
  },
});
export const LargeProfileLeftImage = styled('img')({
  height: '40%',
});
export const LargeProfileRightImage = styled('img')({
  height: '80%',
  marginLeft: '15px',
});
export const LargeHomeCenter = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
});
const LargeHomePage = () => {
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { searchcontent, setcontent } = FilterValue;
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  const [reload, setReload] = useState(true);
  const reloading = () => {
    setReload((prevReload) => !prevReload);
  };
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const openfilter = () => {
    setFilter(true);
  };
  const closefilter = () => {
    setFilter(false);
  };
  const close = () => {
    setOpen(false);
  };
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  // const ClickOther = (event: React.MouseEvent) => {
  //   if (
  //     TargetMenu.current &&
  //     !TargetMenu.current.contains(event.target as Node)
  //   ) {
  //     setOpen(false);
  //   }
  // };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };

  return (
    <LargeHomePagecss>
      <div ref={TargetMenu}>
        <Routes>
          <Route
            path='/'
            element={<LoginModel isOpen={isOpen} close={close} />}
          />
          <Route
            path='/user/:userId'
            element={<LogoutModel isOpen={isOpen} close={close} />}
          />
          <Route path='*' element={NaN} />
        </Routes>
      </div>
      <div>
        <FilterPage
          reloadMethod={reloading}
          isOpen={isFilter}
          close={closefilter}
        />
      </div>
      <LargeHomeHead>
        <LargeHomeHeadLogo>
          <LargeHomeHeadLogoContent src='/img/logo_p.png'></LargeHomeHeadLogoContent>
        </LargeHomeHeadLogo>
        <LargeHomeHeadSearchContent>
          <LargeHomeHeadInputInner>
            <LargeHomeHeadInput
              onChange={handdlesearch}
              value={searchcontent}
              placeholder=' Anywhere   |   Any week   |   Add guests '
            ></LargeHomeHeadInput>
            <LargeHomeHeadsearch>
              <LargeHomeHeadsearchimg
                src='/img/search.png'
                onClick={() => {
                  reloading();
                }}
              ></LargeHomeHeadsearchimg>
            </LargeHomeHeadsearch>
          </LargeHomeHeadInputInner>
        </LargeHomeHeadSearchContent>
        <LargeHomeSwitchBar>
          <SwitchContent onClick={goesHost}>Switch to hosting</SwitchContent>
        </LargeHomeSwitchBar>
        <LargeProfile>
          <LargeProfileOuter onClick={ClickProfile}>
            <LargeProfileLeftImage src='/img/more.png'></LargeProfileLeftImage>
            <Routes>
              <Route
                path='/user/:userId'
                element={
                  <LargeProfileRightImage src='/img/logged.png'></LargeProfileRightImage>
                }
              />
              <Route
                path='*'
                element={
                  <LargeProfileRightImage src='/img/profile.png'></LargeProfileRightImage>
                }
              />
            </Routes>
          </LargeProfileOuter>
        </LargeProfile>
      </LargeHomeHead>
      <ContainerForFilter>
        <LargeFilter onClick={openfilter}>Filter</LargeFilter>
      </ContainerForFilter>
      <LargeHomeCenter>
        <GetAllListing key={reload.toString()} />
      </LargeHomeCenter>
    </LargeHomePagecss>
  );
};
interface FilterComp {
  MinPrice: number | null;
  MaxPrice: number | null;
  Checkin: Date | null;
  Checkout: Date | null;
  MinBed: number | null;
  MaxBed: number | null;
  sortWay: boolean | null;
  searchcontent: string;
  setSortWay: (value: boolean | null) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  setCheckin: (value: Date | null) => void;
  setCheckout: (value: Date | null) => void;
  setMinbed: (value: number) => void;
  setMaxbed: (value: number) => void;
  setcontent: (value: string) => void;
}
export const AppContext = createContext<FilterComp | null>(null);
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [MinPrice, setMinPrice] = useState<number | null>(null);
  const [MaxPrice, setMaxPrice] = useState<number | null>(null);
  const [Checkin, setCheckin] = useState<Date | null>(null);
  const [Checkout, setCheckout] = useState<Date | null>(null);
  const [MinBed, setMinbed] = useState<number | null>(null);
  const [MaxBed, setMaxbed] = useState<number | null>(null);
  const [sortWay, setSortWay] = useState<boolean | null>(null);
  const [searchcontent, setcontent] = useState('');
  const contextValue = {
    MinPrice,
    MaxPrice,
    Checkin,
    Checkout,
    MinBed,
    MaxBed,
    sortWay,
    searchcontent,
    setMinPrice,
    setMaxPrice,
    setCheckin,
    setCheckout,
    setMinbed,
    setMaxbed,
    setSortWay,
    setcontent,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let layoutComponentHost;
  let LayoutComponentHomeWrapper;
  let LayoutDetail;
  useEffect(() => {
    // 添加一个事件监听器，以便在窗口大小改变时更新windowWidth状态
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    // 清除事件监听器以避免内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (windowWidth > 760) {
    layoutComponentHost = <LargeHostPage />;
    LayoutComponentHomeWrapper = <AppProvider>{<LargeHomePage />}</AppProvider>;
    LayoutDetail = <AppProvider><ListingDetailLarge /></AppProvider>;
  } else {
    layoutComponentHost = <SmallHostPage />;
    LayoutComponentHomeWrapper = <AppProvider>{<SmallHomePage />}</AppProvider>;
    LayoutDetail = <AppProvider><ListingDetailSmall /></AppProvider>;
  }
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogPage />} />
        <Route path='/register' element={<RegistPage />} />
        <Route path='*' element={NaN} />
      </Routes>
      <Routes>
        <Route
          path='/user/:userId/CreateListing/*'
          element={<CreateHosting />}
        />
        <Route
          path='/user/:userId/hosting/edit/:HostingId'
          element={<EditHosting />}
        />
        <Route
          path='/user/:userId/hosting/publish/:HostingId'
          element={<PublishPage />}
        />
        <Route path='/user/:userId/hosting/*' element={layoutComponentHost} />
        <Route path='/user/:userId/listing/:HostingId/*' element={LayoutDetail} />
        <Route path='/listing/:HostingId/*'element={LayoutDetail}/>
        <Route path='*' element={LayoutComponentHomeWrapper} />
      </Routes>
    </Router>
  );
};

export default App;
