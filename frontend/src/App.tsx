import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
import {
  callAPIpost,
  CallAPIPostWithToken,
  GlobalSnackbar,
  meetError,
  ErrorContext,
  ErrorProvider
} from './jsx/API';
import {
  SmallHostPage,
  LargeHostPage,
  CreateHosting,
  EditHosting,
} from './jsx/Host';
import { PublishPage } from './jsx/publish';
import TextField from '@mui/material/TextField';
import {
  GetAllListing,
  GetAllOwnerBooking,
  GetAllListingOrdered,
} from './jsx/get_all_listing';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material';
import { LogPage } from './jsx/Login';
// Login model
interface LoginModels {
  isOpen: boolean;
  close: () => void;
}
// css part
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
  width: '15px',
  height: '15px',
  padding: '10px',
  marginRight: '20px',
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
// Login model
export const LoginModel: React.FC<LoginModels> = ({ isOpen, close }) => {
  const navigate = useNavigate();
  console.log(isOpen);
  // show login page
  const showLoginPage = () => {
    close();
    navigate('/login');
  };
  // show register page
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
// Logout model for Detail part
export const LoginModelDetail: React.FC<LoginModels> = ({ isOpen, close }) => {
  // use navigate to change the page
  const navigate = useNavigate();
  console.log(isOpen);
  // show login page
  const showLoginPage = () => {
    close();
    navigate('/login');
  };
  // show register page
  const showRegistPage = () => {
    close();
    navigate('/register');
  };
  const componment = (
    <div>
      <LogoutHidden id='log' role='group' aria-label='Vertical button group'>
        <HiddenBtnBlack type='button' onClick={showLoginPage}>
          Log in
        </HiddenBtnBlack>
        <HiddenBtn type='button' onClick={showRegistPage}>
          Sign up
        </HiddenBtn>
      </LogoutHidden>
    </div>
  );
  return isOpen ? componment : null;
};
// Logout model for Host part
export const LogoutModelHost: React.FC<LogoutModels> = ({ isOpen, close }) => {
  // get the message prompt method
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the message prompt method
  const { setOpenSnackbar } = ErrorValue;
  // use navigate to change the page
  const navigate = useNavigate();
  // logout function
  const LogoutClick = () => {
    // get the token from local storage
    let token = localStorage.getItem('token');
    console.log(token);
    // if token is null, set it to empty
    if (!token) {
      token = '';
    }
    // call the logout api
    CallAPIPostWithToken('user/auth/logout', {}, token)
      .then(() => {
        // clear the local storage
        localStorage.clear();
        // prompt the information
        setOpenSnackbar({ severity: 'info', message: 'You are logged out' });
        setOpenSnackbar({ severity: 'info', message: '' });
        // navigate to home page
        console.log('logout');
        close();
        navigate('/');
      })
      .catch((error) => {
        // prompt the error message
        setOpenSnackbar({ severity: 'error', message: meetError(error) });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
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
// logout model for user part
export const LogoutModel: React.FC<LogoutModels> = ({ isOpen, close }) => {
  // get the message prompt method
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // use navigate to change the page
  const navigate = useNavigate();
  // logout function
  const LogoutClick = () => {
    close();
    // get the token from local storage
    let token = localStorage.getItem('token');
    console.log(token);
    // if token is null, set it to empty
    if (!token) {
      token = '';
    }
    // call the logout api
    CallAPIPostWithToken('user/auth/logout', {}, token)
      .then(() => {
        // prompt the information
        setOpenSnackbar({ severity: 'info', message: 'You are logged out' });
        setOpenSnackbar({ severity: 'info', message: '' });
        // clear the local storage
        localStorage.clear();
        // navigate to home page
        console.log('logout');
        navigate('/');
      })
      .catch((error) => {
        // prompt the error message
        setOpenSnackbar({ severity: 'error', message: meetError(error) });
        setOpenSnackbar({ severity: 'error', message: '' });
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
// css part
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
const RegistPage = () => {
  // context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // inital check state
  const [checked, setChecked] = useState(false);
  // inital password
  const [pwd, setPWD] = useState('');
  const handlepwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPWD(event.target.value);
  };
  // intial confirm password
  const [pwdcfm, setPWDCFM] = useState('');
  const handlecfmpwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPWDCFM(event.target.value);
  };
  // intial email
  const [email, setEmail] = useState('');
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  // initial name
  const [name, setName] = useState('');
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const navigate = useNavigate();
  // when click close button
  const CloseRegistPage = () => {
    navigate('/');
  };
  // initial error message
  const [contentMsg, setcontentMsg] = useState('');
  const [isSeePWD, setIsSeePWD] = useState(false);
  // change see password state
  const ChangeSeePWD = () => {
    setIsSeePWD(!isSeePWD);
  };
  const [isSeeCPWD, setIsSeeCPWD] = useState(false);
  // change see confirm password state
  const ChangeSeeCPWD = () => {
    setIsSeeCPWD(!isSeeCPWD);
  };
  // regist button click
  const registClick = () => {
    // check regist information
    let registFlag = true;
    const data = {
      email,
      password: pwd,
      name,
    };
    // if email is empty
    if (data.email.length <= 0) {
      registFlag = false;
      setcontentMsg('Email can not be nothing');
    } else if (data.name.length <= 0) {
      // if name is empty
      registFlag = false;
      setcontentMsg('Name can not be nothing');
    } else if (data.password.length <= 7 || data.password.length >= 21) {
      // if password length is incorrect
      registFlag = false;
      setcontentMsg('Password length incorrect');
    } else if (data.password !== pwdcfm) {
      // if two password is different
      registFlag = false;
      setcontentMsg('Two password entered is different');
      setOpenSnackbar({
        severity: 'warning',
        message: 'Two password entered is different !',
      });
      setTimeout(() => {
        setOpenSnackbar({
          severity: 'warning',
          message: '',
        });
      }, 0);
    }
    // if all information is correct
    if (registFlag) {
      // call api to regist
      callAPIpost('user/auth/register', data)
        .then(() => {
          // if regist successful
          setTimeout(() => {
            // navigate to login page
            navigate('/login');
          }, 3000);
          // set checked state
          setChecked(true);
          // set localstorage
          localStorage.setItem('RegistedUserEmail', email);
          // set snackbar
          setOpenSnackbar({
            severity: 'success',
            message: 'Successful registration !',
          });
          setOpenSnackbar({
            severity: 'success',
            message: '',
          });
          // set content message
          setcontentMsg(
            'Register successfully and we will login for you in 3 seconds.'
          );
        })
        // if regist fail
        .catch((error) => {
          // set checked state
          console.log(error);
          if (error === 'info') {
            // if email has been registed
            setcontentMsg('This email has been Registed');
            setOpenSnackbar({
              severity: 'error',
              message: 'This email has been Registed',
            });
            setOpenSnackbar({ severity: 'error', message: '' });
          } else {
            // if other error
            setcontentMsg(meetError(error));
            setOpenSnackbar({ severity: 'error', message: meetError(error) });
            setOpenSnackbar({ severity: 'error', message: '' });
          }
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
// css part
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
  padding: '0px',
  width: '90%',
  height: '55%',
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
  padding: '8px 8px 10px 10px',
  margin: '0px 0px 0px 10px',
  border: '0px',
  outline: 'none',
  justifyContent: 'center',
  '&::placeholder': {
    color: 'rgb(131, 131, 131)',
  },
});
const SmallHomeHeadsearch = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
  margin: '7px',
  borderRadius: '30px',
  backgroundColor: 'rgb(0, 149, 255)',
});
const SmallHomeHeadsearchimg = styled('img')({
  height: '50%',
  cursor: 'pointer',
  objectFit: 'cover',
  padding: '8px',
});

const SmallHomeCenter = styled('div')({
  zIndex: '0',
  width: '100%',
  paddingTop: '20px',
  display: 'flex',
  height: 'calc(100vh - 140px)',
  flexDirection: 'column',
  alignItems: 'center',
  overflowX: 'hidden',
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
  height: 'calc(100vh - 185px)',
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
  height: '70px',
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  width: '100%',
  overflowY: 'scroll',
});
export const P1 = styled('p')({
  margin: '0px',
  fontWeight: '700',
});
// css part
// filter part set the price input length up to 5
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
// set the bed input length up to 2
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
// css part
const Filtertitle = styled('p')({
  textAlign: 'center',
  fontWeight: '700',
  fontSize: '16px',
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
  fontSize: '20px',
  padding: '0px',
  margin: '0px',
});
const FilterT2 = styled('div')({
  fontWeight: '300',
  fontSize: '14px',
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
  fontSize: '16px',
  height: '40px',
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
  height: '45px',
  width: '200px',
  fontSize: '16px',
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
// css part
// confirm filter part
interface ConfirmFilterProps {
  isOpen: boolean;
  close: () => void;
  reloadMethod: () => void;
}
// confirm filter part
const FilterPage: React.FC<ConfirmFilterProps> = ({
  reloadMethod,
  isOpen,
  close,
}) => {
  // inital the pattern for number input
  const numberPattern = /^([1-9]\d{0,4})?$/;
  const numberPattern2 = /^([1-9]\d{0,1})?$/;
  // get the value from context
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the value from context
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
  // when the min price change
  const handdleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern.test(event.target.value)) {
      setMinPrice(Number(event.target.value));
    }
  };
  // when the max price change
  const handdleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern.test(event.target.value)) {
      setMaxPrice(Number(event.target.value));
    }
  };
  // when the min bed change
  const handdleMinbedChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern2.test(event.target.value)) {
      setMinbed(Number(event.target.value));
    }
  };
  // when the max bed change
  const handdleMaxbedChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (numberPattern2.test(event.target.value)) {
      setMaxbed(Number(event.target.value));
    }
  };
  // when the sort way change
  const handlePriceBlur = () => {
    if (MinPrice && MaxPrice && MinPrice > MaxPrice) {
      setMaxPrice(MinPrice);
      setMinPrice(MaxPrice);
    }
  };
  // when the bed blur
  const handleBedBlur = () => {
    if (MinBed && MaxBed && MinBed > MaxBed) {
      setMaxbed(MinBed);
      setMinbed(MaxBed);
    }
  };
  // when the check in  change
  const handleCheckinChange = (date: Date | null) => {
    setCheckin(date);
    if (date && Checkout && date > Checkout) {
      setCheckout(date);
    }
  };
  // when the check out change
  const handleCheckoutChange = (date: Date | null) => {
    setCheckout(date);
    if (date && Checkin && date < Checkin) {
      setCheckin(date);
    }
  };
  // reset the filter
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
// the small home page
const SmallHomePage = () => {
  // get the context value
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the value from context
  const { searchcontent, setcontent } = FilterValue;
  // handle the search content
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  // reload the page
  const [reload, setReload] = useState(true);
  const [reloadown, setReloadown] = useState(true);
  const reloading = () => {
    setReload((prevReload) => !prevReload);
    setReloadown((prevReload) => !prevReload);
  };
  // use navigate
  const navigate = useNavigate();
  // set the open state
  const [isOpen, setOpen] = useState(false);
  // set the filter state
  const [isFilter, setFilter] = useState(false);
  // set close function
  const close = () => {
    setOpen(false);
  };
  // use ref
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  // when the profile is clicked, open the menu
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  // use effect
  useEffect(() => {
    // when the page is loaded, check the token and userId
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('LoggedUserEmail');
    // 如果存在有效的 token 和 userId，进行自动登录
    if (token && userId) {
      navigate(`/user/${userId}`);
    }
  }, []);
  // goes to the host page
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  // open the filter
  const openfilter = () => {
    setFilter(true);
  };
  // close the filter
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
        <Routes>
          <Route path='/user/*' element={<GetAllOwnerBooking />} />
        </Routes>
        <GetAllListingOrdered key={reloadown.toString() + '1'} />
        <GetAllListing key={reload.toString() + '2'} />
      </SmallHomeCenter>
      <SmallHomeBottom>
        <SmallBottomButtonOuter>
          <SmallButtomButton1 src='/img/search.png'></SmallButtomButton1>
          <P1>Explore</P1>
        </SmallBottomButtonOuter>
        <SmallBottomButtonOuter onClick={goesHost}>
          <SmallButtomButton1 src='/img/hosting.png'></SmallButtomButton1>
          <P1>Hosting</P1>
        </SmallBottomButtonOuter>
        <Routes>
          <Route
            path='/user/:userId'
            element={
              <SmallBottomButtonOuter onClick={ClickProfile}>
                <SmallButtomButton2 src='/img/logged.png'></SmallButtomButton2>
                <P1>Profile</P1>
              </SmallBottomButtonOuter>
            }
          />
          <Route
            path='*'
            element={
              <SmallBottomButtonOuter onClick={ClickProfile}>
                <SmallButtomButton2 src='/img/profile.png'></SmallButtomButton2>
                <P1>Log in</P1>
              </SmallBottomButtonOuter>
            }
          />
        </Routes>
      </SmallHomeBottom>
    </SmallHomePagecss>
  );
};
// css part
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
  cursor: 'pointer',
});
export const LargeHomeHeadSearchContent = styled('div')({
  margin: '0px 0px 0px 0px',
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
  height: '40%',
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
  height: '60%',
  padding: '8px 10px 10px 10px',
  border: '0px',
  outline: 'none',
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
  height: '45%',
  cursor: 'pointer',
  padding: '10px',
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
  flexDirection: 'column',
  alignItems: 'center',
  overflowX: 'hidden',
  overflowY: 'scroll',
});
// css part
const LargeHomePage = () => {
  // context part
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // filter part
  const { searchcontent, setcontent } = FilterValue;
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  // reload part
  const [reload, setReload] = useState(true);
  const reloading = () => {
    setReload((prevReload) => !prevReload);
  };
  // navibar part
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isFilter, setFilter] = useState(false);
  // open filter
  const openfilter = () => {
    setFilter(true);
  };
  // close filter
  const closefilter = () => {
    setFilter(false);
  };
  const close = () => {
    setOpen(false);
  };
  // target menu
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  // click profile
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  // gies to host
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  // useEffect part
  useEffect(() => {
    // chenk token and userId
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('LoggedUserEmail');
    // 如果存在有效的 token 和 userId，进行自动登录
    if (token && userId) {
      navigate(`/user/${userId}`);
    }
  }, []);
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
        <Routes>
          <Route path='/user/*' element={<GetAllOwnerBooking />} />
        </Routes>
        <GetAllListingOrdered key={reload.toString() + '1'} />
        <GetAllListing key={reload.toString()} />
      </LargeHomeCenter>
    </LargeHomePagecss>
  );
};
// the context part
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
// set the context
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

const MainDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});
// the main content
const MainContent = () => {
  // set the initial values
  localStorage.setItem('scroll', 'f');
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // set the error context
  const { snackbarData } = ErrorValue;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let layoutComponentHost;
  let LayoutComponentHomeWrapper;
  let LayoutDetail;
  // when resize then check the page
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
  // set the page
  if (windowWidth > 760) {
    layoutComponentHost = <LargeHostPage />;
    LayoutComponentHomeWrapper = <AppProvider>{<LargeHomePage />}</AppProvider>;
    LayoutDetail = (
      <AppProvider>
        <ListingDetailLarge />
      </AppProvider>
    );
  } else {
    layoutComponentHost = <SmallHostPage />;
    LayoutComponentHomeWrapper = <AppProvider>{<SmallHomePage />}</AppProvider>;
    LayoutDetail = (
      <AppProvider>
        <ListingDetailSmall />
      </AppProvider>
    );
  }
  return (
    <MainDiv>
      <GlobalSnackbar
        severity={snackbarData.severity}
        message={snackbarData.message}
      />
      <Router>
        <Routes>
          <Route path='/login' element={<LogPage />} />
          <Route path='/register' element={<RegistPage />} />
          <Route path='/' element={<></>} />
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
          <Route
            path='/user/:userId/listing/:HostingId/*'
            element={LayoutDetail}
          />
          <Route path='/listing/:HostingId/*' element={LayoutDetail} />
          <Route path='*' element={LayoutComponentHomeWrapper} />
        </Routes>
      </Router>
    </MainDiv>
  );
};
// main app
const App = () => {
  return (
    <ErrorProvider>
      <MainContent />
    </ErrorProvider>
  );
};

export default App;
