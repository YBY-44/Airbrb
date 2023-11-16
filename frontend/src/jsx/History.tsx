import { callAPIget } from './API';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { meetError, ErrorContext } from '../App';
import { styled } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { AllBookings, Booking, NullListing } from './get_all_listing';
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
  position: 'fixed',
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
const ReservingRow = styled('div')({
  width: '100%',
  flexDirection: 'column',
  padding: '0px 20px 10px 20px',
  display: 'flex',
  borderBottom: '1px solid rgb(197, 197, 197)',
  justifyContent: 'space-between',
});
const DateRange = styled('p')({
  textAlign: 'left',
  margin: '0px 0px 2px 0px',
  padding: '0px',
  fontSize: '16px',
});
// end of css part
// this is the history page
// for a user to see all the booking history
export const History = () => {
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // set the snackbar
  const { setOpenSnackbar } = ErrorValue;
  // set the scroll
  localStorage.setItem('scroll', 't');
  // initial the content
  const [contents, setContent] = useState<Booking[]>([]);
  // initial the loading
  const [isLoading, setIsLoading] = useState(true);
  // initial the navigate
  const navigate = useNavigate();
  // get the hosting id
  const { HostingId } = useParams();
  // use ref to track the component
  const isMounted = useRef(true);
  // set the close login page
  const CloseLoginPage = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myresveration`);
    } else {
      navigate('/login');
    }
  };
  // set the close login page
  useEffect(() => {
    // 在组件卸载时取消未完成的异步操作
    return () => {
      isMounted.current = false;
    };
  }, []);
  // get the data from backend
  useEffect(() => {
    // when the component is mounted, get the data from backend
    const token = localStorage.getItem('token') || '';
    // Step 1
    // when the component is mounted, get the data from backend
    callAPIget('bookings', token)
      .then((response) => {
        if (isMounted.current) {
          console.log(response);
          // set the content
          const AllBoooking = response as AllBookings;
          console.log(
            AllBoooking.bookings.filter(
              (item) => String(item.listingId) === String(HostingId)
            )
          );
          // set the content
          setContent(
            AllBoooking.bookings.filter(
              (item) =>
                item.status !== 'pending' &&
                String(item.listingId) === String(HostingId)
            )
          );
          // set the loading to false
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // set the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // set the loading to false
        setIsLoading(false);
      });
  }, []);
  // initial the content
  let content;
  // if the data is loading
  if (isLoading) {
    // if the data is loading, show the loading message
    content = <NullListing>Data is comming...</NullListing>;
  } else if (contents) {
    if (contents.length > 0) {
      // if the data is loaded and not empty, show the data
      content = contents.map((item) => (
        <ReservingRow key={item.id}>
          <DateRange>Booker {item.owner}</DateRange>
          <DateRange>
            {dayjs(item.dateRange.startDate).format('MM/DD/YYYY') +
              ' - ' +
              dayjs(item.dateRange.endDate).format('MM/DD/YYYY') +
              ' ' +
              item.dateRange.distance +
              'days'}
          </DateRange>
          <DateRange>Earn: ${item.totalPrice.toFixed(2)} AUD</DateRange>

          <DateRange
            sx={{
              color: item.status === 'accepted' ? '#009e2d' : 'rgb(255, 0, 0)',
            }}
          >
            {' '}
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </DateRange>
        </ReservingRow>
      ));
    } else {
      // if the data is empty, show the message
      content = <NullListing>No booking record</NullListing>;
    }
  } else {
    // if the data is empty, show the message
    content = <NullListing>No booking record</NullListing>;
  }
  return (
    <div>
      <LoginOverAll></LoginOverAll>
      <LoginBlock>
        <LoginHeader>
          <LoginCloseButton type='button' onClick={CloseLoginPage}>
            ×
          </LoginCloseButton>
          <LoginHeadText>History</LoginHeadText>
        </LoginHeader>
        <LoginCenterPart>{content}</LoginCenterPart>
      </LoginBlock>
    </div>
  );
};
