import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import config from '../config.json';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
const port = config.BACKEND_PORT;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
));
Alert.displayName = 'Alert';

interface GlobalSnackbarProps {
  message: string | null;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export const GlobalSnackbar: React.FC<GlobalSnackbarProps> = ({
  message,
  severity,
}) => {
  const [open, setOpen] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  useEffect(() => {
    if (message && message !== displayedMessage) {
      setOpen(true);
      setDisplayedMessage(message);
    }
  }, [message, displayedMessage]);

  const handleClose = () => {
    setOpen(false);
    setDisplayedMessage('');
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {displayedMessage}
      </Alert>
    </Snackbar>
  );
};

export const GetDistance = (startDate: Date | null, endDate: Date | null) => {
  if (startDate && endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    date1.setUTCHours(0, 0, 0, 0);
    date2.setUTCHours(0, 0, 0, 0);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }
  return 0;
};
export const Datetostring = (inputDate: Date) => {
  if (!inputDate) {
    return '';
  }
  console.log(inputDate);
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;
  return inputDate.toLocaleDateString('en-US', options);
};

type HoverImageProps = {
  src: string;
  alt: string;
};

const CnhQ7Answer = styled('img')({
  marginTop: '10px',
  display: 'flex',
  height: '99%',
  objectFit: 'cover',
  border: '1px dashed black',
  aspectRatio: '1 / 1',
  '&:hover': {
    transition: '0.5s',
    opacity: '0.5',
    borderRadius: '100px',
    objectFit: 'cover',
    backgroundColor: 'black',
  },
});
export const HoverImage = ({ src, alt }: HoverImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const MouseEnter = () => {
    setIsHovered(true);
  };

  const MouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <CnhQ7Answer
      src={isHovered ? '/img/DEL.png' : src}
      alt={alt}
      onMouseEnter={MouseEnter}
      onMouseLeave={MouseLeave}
    />
  );
};

const ErrorText = styled('p')({
  margin: '0px 0px 0px 20px',
});
const ErrorMessage = styled('div')({
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  position: 'fixed',
  fontSize: '20px',
  height: '50px',
  color: '#c60000',
  letterSpacing: '1px',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  padding: '0px',
  borderRadius: '10px',
  border: '1px solid rgb(217, 217, 217)',
});
const ErrorCloseBtn = styled('button')({
  borderRadius: '30px',
  fontSize: '15px',
  margin: '0px 10px 0px 20px',
  color: 'rgb(142, 142, 142)',
  border: '1px #ffffff solid',
  backgroundColor: 'rgb(219, 219, 219)',
  cursor: 'pointer',
});
export const errorMessage = (text: string) => {
  const bodyMain = document.querySelector('body');
  const div = document.getElementById('errorMessa');
  const btn = document.getElementById('clsbtn');
  const conponment = (
    <ErrorMessage id='errorMessa'>
      <ErrorText>{text}</ErrorText>
      <ErrorCloseBtn id='clsbtn'>X</ErrorCloseBtn>
    </ErrorMessage>
  );
  if (btn) {
    // when click close the message would be removed
    // when press 'x' the message would be removed
    btn.addEventListener('click', () => {
      return null;
    });
    window.addEventListener('keydown', (event) => {
      if (bodyMain && div) {
        if (event.key === 'x' && bodyMain.contains(div)) {
          return null;
        }
      }
      return conponment;
    });
  }
  return conponment;
};

// all post request send by this question
export const callAPIpost = (path: string, inputdata: object) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          return reject(errorReason);
        } else {
          const errorReason = 'net';
          return reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// call post request with token send by this function
export const CallAPIPostWithToken = (
  path: string,
  inputdata: object,
  token: string
) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'POST',
      headers: {
        Authorization: String(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          return reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          return reject(errorReason);
        } else {
          const errorReason = 'net';
          return reject(errorReason);
        }
      })
      .then((body) => {
        console.log(body);
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//  all put request with token send by this message
export const callAPIput = (path: string, inputdata: object, token: string) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'PUT',
      headers: {
        Authorization: String(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          resolve(response.json());
        } else if (response.status === 400) {
          const errorReason = 'info';
          reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          reject(errorReason);
        } else {
          const errorReason = 'net';
          reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// all GET request send by this function
export const callAPIget = (path: string, token: string) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'GET',
      headers: {
        Authorization: String(token),
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          return reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          return reject(errorReason);
        } else {
          const errorReason = 'net';
          return reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// All delete request send by this function
export const callAPIdelete = (path: string, token: string) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'DELETE',
      headers: {
        Authorization: String(token),
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          return reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          return reject(errorReason);
        } else {
          const errorReason = 'net';
          return reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
