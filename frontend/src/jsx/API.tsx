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
// The message to be displayed in the Snackbar
interface GlobalSnackbarProps {
  message: string | null;
  // The severity of the Snackbar (success, error, warning, info)
  severity: 'success' | 'error' | 'warning' | 'info';
}

export const GlobalSnackbar: React.FC<GlobalSnackbarProps> = ({
  message,
  severity,
}) => {
  // State to manage the visibility of the Snackbar
  const [open, setOpen] = useState(false);
  // State to manage the displayed message in the Snackbar
  const [displayedMessage, setDisplayedMessage] = useState('');
  // Effect to handle changes in the incoming message and control Snackbar visibility
  useEffect(() => {
    if (message && message !== displayedMessage) {
      setOpen(true);
      setDisplayedMessage(message);
    }
  }, [message, displayedMessage]);
  // Callback function to handle Snackbar close
  const handleClose = () => {
    setOpen(false);
    setDisplayedMessage('');
  };

  return (
    // Snackbar component with automatic hiding and custom styling
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {displayedMessage}
      </Alert>
    </Snackbar>
  );
};
/**
 * Calculates the number of days between two dates.
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns The number of days between the start and end dates. Returns 0 if either date is null.
 */
export const GetDistance = (startDate: Date | null, endDate: Date | null) => {
  // Check if both start and end dates are provided
  if (startDate && endDate) {
    // Create new Date objects to ensure consistency
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // Set the time portion of the dates to midnight (UTC)
    date1.setUTCHours(0, 0, 0, 0);
    date2.setUTCHours(0, 0, 0, 0);
    // Calculate the time difference in milliseconds
    const timeDistance = Math.abs(date2.getTime() - date1.getTime());

    // Calculate the number of days and round up to the nearest whole number
    const daysDistance = Math.ceil(timeDistance / (1000 * 60 * 60 * 24));

    // Return the calculated number of days
    return daysDistance;
  }
  return 0;
};
/**
 * Converts a Date object to a string formatted as 'month/day/year'.
 * @param inputDate - The input Date object to be converted.
 * @returns A string representation of the date in the format 'month/day/year'.
 *          Returns an empty string if the input date is falsy.
 */
export const Datetostring = (inputDate: Date) => {
  // Check if the input date is falsy
  if (!inputDate) {
    return '';
  }

  // Log the input date for debugging or informational purposes
  console.log(inputDate);

  // Options for formatting the date string
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;

  // Convert the input date to a locale-specific date string
  return inputDate.toLocaleDateString('en-US', options);
};

// set the hoverImage
type HoverImageProps = {
  src: string;
  alt: string;
};
// css style
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

/**
 * A component that displays an image and changes the source on hover.
 * @param src - The default image source.
 * @param alt - The alternative text for the image.
 * @returns A React component that displays the image and changes the source on hover.
 */
export const HoverImage: React.FC<HoverImageProps> = ({
  src,
  alt,
}: HoverImageProps) => {
  // State to track whether the image is being hovered
  const [isHovered, setIsHovered] = useState(false);

  // Event handler for mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Event handler for mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <CnhQ7Answer
      // Use the hovered image source if the mouse is over the component, otherwise use the default source
      src={isHovered ? '/img/DEL.png' : src}
      alt={alt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
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
