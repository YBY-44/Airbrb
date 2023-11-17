import { styled } from '@mui/material';
import React, { useState, ChangeEvent, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { callAPIput, meetError, ErrorContext } from './API';
import dayjs from 'dayjs';
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
const RatPart = styled('div')({
  '@media (max-width: 750px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 750px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  width: '100%',
  display: 'flex',
});
const RatingScore = styled('div')({
  margin: '0px 20px 0px 40px',
  display: 'flex',
  alignItems: 'center',
});
const TxtPart = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const RevContent = styled('textarea')({
  margin: '10px 20px 0px 30px',
  padding: '5px 0px 5px 10px',
  resize: 'none',
  border: '1px solid rgb(200,200,200)',
  borderRadius: '5px',
  height: '200px',
});
const MarkTitle = styled('p')({
  margin: '10px 20px 10px 30px',
  padding: '0px',
  fontWeight: '500',
});
const MarkTitle2 = styled('p')({
  margin: '10px 10px 10px 10px',
  padding: '0px',
  fontWeight: '500',
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
// css part end
// interface part
interface ReviewPart {
  refresh: () => void;
}
// interface part end
// function part
// this part is for add review
export const AddReview: React.FC<ReviewPart> = ({ refresh }) => {
  // get the error context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the error context end
  const { setOpenSnackbar } = ErrorValue;
  // get the token
  // inital the scroll state to true
  localStorage.setItem('scroll', 't');
  // inital the score
  const [score, setScore] = useState(0);
  // ininit the content
  const [content, setContent] = useState('');
  // use navigate
  const navigate = useNavigate();
  // get the hosting id
  const { HostingId } = useParams();
  // this button is for close the login page
  const CloseLoginPage = () => {
    const currentPath = window.location.pathname;
    // find the last / index
    const lastSlashIndex = currentPath.lastIndexOf('/');
    // if the last / index is not -1
    if (lastSlashIndex !== -1) {
      // get the new path
      const newPath = currentPath.slice(0, lastSlashIndex);
      // navigate to the new path
      navigate(newPath);
    }
    // after 1 second, set the scroll to false
    setTimeout(() => {
      localStorage.setItem('scroll', 'f');
    }, 1000);
  };
  // this part is for handle the content change
  const handdleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  // this part is for handle the rating change
  const handleRatingChange = (
    _event: ChangeEvent<NonNullable<unknown>>,
    newValue: number | null
  ) => {
    if (newValue) {
      setScore(newValue);
    } else {
      setScore(0);
    }
  };
  // this part is for add review
  const addreview = () => {
    // get the logged user email
    const logEmail = localStorage.getItem('LoggedUserEmail');
    // if the email is not null
    if (logEmail) {
      // inital the put data
      const data = {
        review: {
          owner: logEmail,
          score,
          content,
          time: dayjs(),
        },
      };
      // if the content is not empty
      if (data) {
        // if the content is empty, set the content to a default value
        if (data.review.content === '') {
          data.review.content = 'A good experience!';
        }
        // get the booking id and token
        const BookingId = localStorage.getItem('BookingId') || '';
        const token = localStorage.getItem('token') || '';
        // call the api to add review
        callAPIput(
          'listings/' + HostingId + '/review/' + BookingId,
          data,
          token
        )
          .then(() => {
            // if the review is added, set the snackbar
            setOpenSnackbar({
              severity: 'success',
              message: 'Thanks for your feedback！',
            });
            // set the snackbar
            setOpenSnackbar({
              severity: 'success',
              message: '',
            });
            // refresh the page
            refresh();
            // close the login page
            CloseLoginPage();
          })
          .catch((error) => {
            // if the review is not added, set the snackbar
            const content = meetError(error);
            setOpenSnackbar({
              severity: 'error',
              message: content,
            });
            // set the snackbar
            setOpenSnackbar({
              severity: 'error',
              message: '',
            });
          });
      }
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
          <LoginHeadText>Review</LoginHeadText>
        </LoginHeader>
        <LoginCenterPart>
          <RatPart>
            <MarkTitle> How you mark this listing ? </MarkTitle>
            <RatingScore>
              <Rating
                name='half-rating'
                precision={1}
                size='small'
                onChange={handleRatingChange}
                sx={{ color: 'black' }} // 使用sx属性添加样式
              />
              <MarkTitle2>{score}</MarkTitle2>
            </RatingScore>
          </RatPart>
          <TxtPart>
            <MarkTitle>Send your comment {' (optional)'}</MarkTitle>
            <RevContent
              placeholder='A good experience !'
              onChange={handdleContentChange}
            ></RevContent>
          </TxtPart>
          <LoginButton
            onClick={() => {
              addreview();
            }}
            type='button'
          >
            Leave your review
          </LoginButton>
        </LoginCenterPart>
      </LoginBlock>
    </div>
  );
};
