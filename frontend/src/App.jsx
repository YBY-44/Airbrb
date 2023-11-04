import React, { useState, useEffect, useRef } from 'react';
import {
  useNavigate,
  BrowserRouter as Router,
  // useParams,
  Route,
  Routes,
} from 'react-router-dom';
import { callAPIpost, CallAPIPostWithToken, errorMessage } from './jsx/API';
import { SmallHostPage, LargeHostPage, CreateHosting } from './jsx/Host';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import HomePage from './Homepage.jsx';
import { GetAllListing } from './jsx/get_all_listing.jsx';
// when meet error then show the error
export const meetError = (error) => {
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
const LoginModel = ({ isOpen, istop }) => {
  const navigate = useNavigate();
  console.log(isOpen);
  const showLoginPage = () => {
    document.getElementById('log').style.display = 'none';
    navigate('/login');
  };
  const showRegistPage = () => {
    navigate('/register');
    document.getElementById('log').style.display = 'none';
  };
  return (
    isOpen && (
      <div>
        <div
          className={`login-hidden ${istop ? 'ab-pos' : 'ab-pos-down'}`}
          id='log'
          role='group'
          aria-label='Vertical button group'
        >
          <button
            type='button'
            className='hidden-btn black'
            onClick={showLoginPage}
          >
            Log in
          </button>
          <button type='button' className='hidden-btn' onClick={showRegistPage}>
            Sign up
          </button>
        </div>
      </div>
    )
  );
};

export const LogoutModel = ({ isOpen, istop }) => {
  const navigate = useNavigate();
  console.log(isOpen);
  const LogoutClick = () => {
    document.getElementById('log').style.display = 'none';
    const token = localStorage.getItem('token');
    console.log(token);
    CallAPIPostWithToken('user/auth/logout', {}, token)
      .then((response) => {
        console.log('logout');
        navigate('/');
        localStorage.clear();
      })
      .catch((error) => {
        meetError(error);
      });
  };
  return (
    isOpen && (
      <div>
        <div
          className={`login-hidden ${istop ? 'ab-pos' : 'ab-pos-down'}`}
          id='log'
          role='group'
          aria-label='Vertical button group'
        >
          <button
            type='button'
            className='hidden-btn black'
            onClick={LogoutClick}
          >
            Log out
          </button>
        </div>
      </div>
    )
  );
};

const LogPage = () => {
  const currentEmail = localStorage.getItem('RegistedUserEmail');
  const [userEmail, setUserEmail] = useState(currentEmail || '');
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setUserEmail(newEmail);
  };
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
    let contentMsg = '';
    const data = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-pwd').value,
    };
    const btn = document.getElementById('login-button');
    document.getElementById('log-email').style.color = 'black';
    document.getElementById('log-pwd').style.color = 'black';
    if (data.email.length <= 0) {
      LoginFlag = false;
      document.getElementById('log-email').style.color = 'red';
      contentMsg = 'Email can not be nothing';
    } else if (data.password.length <= 7 || data.password.length >= 21) {
      document.getElementById('log-pwd').style.color = 'red';
      LoginFlag = false;
      contentMsg = 'Password length incorrect';
    }
    document.getElementById('message').innerText = contentMsg;
    if (LoginFlag) {
      callAPIpost('user/auth/login', data)
        .then((response) => {
          setTimeout(() => {
            navigate('/user/' + data.email);
          }, 500);
          btn.disabled = true;
          localStorage.setItem('LoggedUserEmail', data.email);
          localStorage.setItem('token', response.token);
        })
        .catch((error) => {
          console.log(error);
          document.getElementById('message').innerText = meetError(error);
        });
    }
  };
  return (
    <div>
      <div className='display justify-content-center align-item-center'></div>
      <div className='show'>
        <div className='header-part'>
          <button
            type='button'
            className='btn-close'
            onClick={CloseLoginPage}
          ></button>
          <p className='center'>Log into Aribrb</p>
        </div>
        <div className='content-part'>
          <div className='Email' id='log-email'>
            <label className='form-label'>Email</label>
            <input
              id='login-email'
              value={userEmail}
              onFocus={InputFocus}
              onChange={handleEmailChange}
              className='form-control'
            ></input>
            <div className='form-text'>
              Your email must be a valid email address so that we can contact
              you if necessary.
            </div>
          </div>
          <div className='Email' id='log-pwd'>
            <label className='form-label'>Password</label>
            <input
              id='login-pwd'
              type={isSee ? 'text' : 'password'}
              className='form-control'
              aria-describedby='passwordHelpBlock'
            ></input>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              onClick={ChangeSee}
            ></input>
            <label className='form-check-label margin-left-5 font-size-12'>
              Show your password
            </label>
            <div className='form-text'>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
          </div>
          <p className='error' id='message'></p>
          <button
            id='login-button'
            type='button'
            className='btn btn-primary btn-change'
            onClick={LoginClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const RegistPage = () => {
  const navigate = useNavigate();
  const CloseRegistPage = () => {
    navigate('/');
  };
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
    let contentMsg = '';
    const pwdcfm = document.getElementById('pwdcfm').value;
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('pwd').value,
      name: document.getElementById('name').value,
    };
    const btn = document.getElementById('regist-button');
    console.log(btn);
    document.getElementById('email-part').style.color = 'black';
    document.getElementById('name-part').style.color = 'black';
    document.getElementById('pwd-part').style.color = 'black';
    document.getElementById('pwdcfm-part').style.color = 'black';
    if (data.email.length <= 0) {
      registFlag = false;
      document.getElementById('email-part').style.color = 'red';
      contentMsg = 'Email can not be nothing';
    } else if (data.name.length <= 0) {
      registFlag = false;
      document.getElementById('name-part').style.color = 'red';
      contentMsg = 'Name can not be nothing';
    } else if (data.password.length <= 7 || data.password.length >= 21) {
      document.getElementById('pwd-part').style.color = 'red';
      registFlag = false;
      contentMsg = 'Password length incorrect';
    } else if (data.password !== pwdcfm) {
      document.getElementById('pwdcfm-part').style.color = 'red';
      registFlag = false;
      contentMsg = 'Two password entered is different';
    }
    document.getElementById('message').innerText = contentMsg;
    if (registFlag) {
      callAPIpost('user/auth/register', data)
        .then((response) => {
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          btn.disabled = true;
          localStorage.setItem('RegistedUserEmail', data.email);
          document.getElementById('message').innerText =
            'Register successfully and we will login for you in 3 seconds.';
          document.getElementById('message').style.color = 'green';
        })
        .catch((error) => {
          console.log(error);
          document.getElementById('message').innerText =
            'This email has been Registed';
        });
    }
  };
  return (
    <div>
      <div className='display justify-content-center align-item-center'></div>
      <div className='show'>
        <div className='header-part'>
          <button
            type='button'
            className='btn-close'
            onClick={CloseRegistPage}
          ></button>
          <p className='center'>Sign up for Aribrb</p>
        </div>
        <div className='content-part'>
          <div className='Email' id='email-part'>
            <label className='form-label'>Email</label>
            <input className='form-control' id='email'></input>
            <div className='form-text'>
              Your email must be a valid email address so that we can contact
              you if necessary.
            </div>
          </div>
          <div className='Email' id='name-part'>
            <label className='form-label'>Name</label>
            <input className='form-control' id='name'></input>
            <div className='form-text'>What do you want us to call you?</div>
          </div>
          <div className='Email' id='pwd-part'>
            <label className='form-label'>Password</label>
            <input
              type={isSeePWD ? 'text' : 'password'}
              className='form-control'
              aria-describedby='passwordHelpBlock'
              id='pwd'
            ></input>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              onClick={ChangeSeePWD}
            ></input>
            <label className='form-check-label margin-left-5 font-size-12'>
              Show your password
            </label>
            <div className='form-text'>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
          </div>
          <div className='Email' id='pwdcfm-part'>
            <label className='form-label'>Confirm your Password</label>
            <input
              type={isSeeCPWD ? 'text' : 'password'}
              className='form-control'
              id='pwdcfm'
            ></input>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              onClick={ChangeSeeCPWD}
            ></input>
            <label className='form-check-label margin-left-5 font-size-12'>
              Show your password
            </label>
            <div className='form-text'>
              Repeat the password you entered in the previous field.
            </div>
          </div>
          <p className='error' id='message'></p>
          <button
            onClick={registClick}
            id='regist-button'
            type='button'
            className='btn btn-primary btn-change'
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

// const isLoged = () => {
//   const { email } = useParams();
//   // 这里可以根据 email 或其他条件判断登录状态
//   if (email) {
//     // 用户已登录
//     return NaN;
//   } else {
//     // 用户未登录，显示登录页面
//     return NaN;
//   }
// };

const SmallHomePage = () => {
  const [isOpen, setOpen] = useState(false);
  const TargetMenu = useRef(null);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const ClickOther = (event) => {
    if (TargetMenu.current && !TargetMenu.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      // 如果菜单是打开的，添加事件监听器来处理点击页面其他地方的事件
      document.addEventListener('click', ClickOther);
    } else {
      // 如果菜单是关闭的，移除事件监听器
      document.removeEventListener('click', ClickOther);
    }
    return () => {
      // 在组件卸载时，移除事件监听器，以防止内存泄漏
      document.removeEventListener('click', ClickOther);
    };
  }, [isOpen]); // 当 isMenuOpen 改变时，重新设置事件监听器
  return (
    <div className='SmallHomePage'>
      <div ref={TargetMenu}>
        <Routes>
          <Route
            path='/'
            element={<LoginModel isOpen={isOpen} istop={false} />}
          />
          <Route
            path='/user/:userId'
            element={<LogoutModel isOpen={isOpen} istop={false} />}
          />
          <Route path='*' element={NaN} />
        </Routes>
      </div>
      <div className='row banner_height w-100 zeropd'>
        <div className='w-100 d-flex h-100 align-items-center justify-content-center '>
          <div className='height-60 width-90 d-flex border_circle pd-7  justify-content-center search-hover'>
            <input
              placeholder=' Anywhere   |   Any week   |   Add guests '
              className='header_search width-90 h-100 border-0 pd-10'
            ></input>
            <div className='align-items-center search_bg h-100  justify-content-center rounded-circle'>
              <img
                src='/img/search.png'
                className='h-100 search-img cursor-pointer'
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className='small-center-homepage'>
        <GetAllListing />
      </div>
      <div className='footer_height'>
        <div className='homepage-bottom'>
          <img src='/img/search.png' className='footer_logo_1'></img>
          <p className=''>Explore</p>
        </div>
        <Routes>
          <Route
            path='/user/:userId'
            element={
              <div className='homepage-bottom' onClick={ClickProfile}>
                <img src='/img/logged.png' className='footer_logo_2'></img>
                <p>Profile</p>
              </div>
            }
          />
          <Route
            path='*'
            element={
              <div className='homepage-bottom' onClick={ClickProfile}>
                <img src='/img/profile.png' className='footer_logo_2'></img>
                <p>Log in</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const LargeHomePage = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const TargetMenu = useRef(null);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const ClickOther = (event) => {
    if (TargetMenu.current && !TargetMenu.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail')
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  useEffect(() => {
    if (isOpen) {
      // 如果菜单是打开的，添加事件监听器来处理点击页面其他地方的事件
      document.addEventListener('click', ClickOther);
    } else {
      // 如果菜单是关闭的，移除事件监听器
      document.removeEventListener('click', ClickOther);
    }
    return () => {
      // 在组件卸载时，移除事件监听器，以防止内存泄漏
      document.removeEventListener('click', ClickOther);
    };
  }, [isOpen]); // 当 isMenuOpen 改变时，重新设置事件监听器
  return (
    <div className='text-center w-100'>
      <div ref={TargetMenu}>
        <Routes>
          <Route
            path='/'
            element={<LoginModel isOpen={isOpen} istop={true} />}
          />
          <Route
            path='/user/:userId'
            element={<LogoutModel isOpen={isOpen} istop={true} />}
          />
          <Route path='*' element={NaN} />
        </Routes>
      </div>
      <div className='row banner_height w-100 zeropd'>
        <div className='max-width-logo d-flex h-100'>
          <img src='/img/logo_p.png' className='logo'></img>
        </div>
        <div className='remain d-flex h-100 align-items-center justify-content-center '>
          <div className='height-60 width-500px d-flex border_circle pd-7  justify-content-center search-hover'>
            <input
              placeholder=' Anywhere   |   Any week   |   Add guests '
              className='header_search width-90 h-100 border-0 pd-10'
            ></input>
            <div className='align-items-center search_bg h-100  justify-content-center rounded-circle'>
              <img
                src='/img/search.png'
                className='h-100 search-img cursor-pointer'
              ></img>
            </div>
          </div>
        </div>
        <div className='max-width-50'>
          <p
            className='h-100 d-flex align-items-center justify-content-center cursor-pointer hosting'
            onClick={goesHost}
          >
            Switch to hosting
          </p>
        </div>
        <div className='margin-left-15 max-width h-100 d-flex align-items-center justify-content-center'>
          <div
            className='max-width shadow-hover height-60 border_circle width-70 d-flex align-items-center justify-content-center cursor-pointer'
            onClick={ClickProfile}
          >
            <img src='/img/more.png' className='height-40 '></img>
            <Routes>
              <Route
                path='/user/:userId'
                element={
                  <img
                    src='/img/logged.png'
                    className='height-80 margin-left-15'
                  ></img>
                }
              />
              <Route
                path='*'
                element={
                  <img
                    src='/img/profile.png'
                    className='height-80 margin-left-15'
                  ></img>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      <div className='row w-100 d-flex'>
        <div className='col width-90 d-flex justify-content-center'>
          <GetAllListing />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let layoutComponentHome;
  let layoutComponentHost;
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
    layoutComponentHome = <LargeHomePage />;
    layoutComponentHost = <LargeHostPage />;
  } else {
    layoutComponentHome = <SmallHomePage />;
    layoutComponentHost = <SmallHostPage />;
  }
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogPage />} />
        <Route path='/register' element={<RegistPage />} />
        <Route path='*' element={NaN} />
      </Routes>
      <Routes>
        <Route path='/user/:userId/CreateListing/*' element={<CreateHosting />} />
        <Route path='/user/:userId/hosting/*' element={layoutComponentHost} />
        <Route path='*' element={layoutComponentHome} />
      </Routes>
    </Router>
  );
};

export default App;
