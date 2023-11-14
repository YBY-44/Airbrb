import { styled } from '@mui/material';
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  LabelHTMLAttributes,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { meetError, ErrorContext } from '../App';
import Stack from '@mui/material/Stack';
import Rating, { RatingClasses } from '@mui/material/Rating';
import {
  callAPIget,
  CallAPIPostWithToken,
  callAPIput,
  HoverImage,
  callAPIpost,
} from './API';
import dayjs from 'dayjs';
import { Today } from '@mui/icons-material';
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
const RatPart = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const RatingScore = styled('div')({
  margin: '0px 20px 0px 0px',
  display: 'flex',
  alignItems: 'center',
});
const TxtPart = styled('div')({
  padding: '20px 0px 0px 0px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const RevContent = styled('textarea')({
  margin: '10px 20px 10px 30px',
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
interface ReviewPart {
  refresh: () => void;
}
export const AddReview: React.FC<ReviewPart> = ({ refresh }) => {
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { snackbarData, setOpenSnackbar } = ErrorValue;

  localStorage.setItem('scroll', 't');
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { HostingId } = useParams();
  const CloseLoginPage = () => {
    const currentPath = window.location.pathname;
    // 找到最后一个 / 的索引
    const lastSlashIndex = currentPath.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      // 去掉最后一个 /
      const newPath = currentPath.slice(0, lastSlashIndex);
      // 导航到新路径
      navigate(newPath);
    }
    setTimeout(() => {
      localStorage.setItem('scroll', 'f');
    }, 1000);
  };
  const handdleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
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
  const addreview = () => {
    const logEmail = localStorage.getItem('LoggedUserEmail');
    console.log(logEmail);
    if (logEmail) {
      const data = {
        review: {
          owner: logEmail,
          score,
          content,
          time: dayjs(),
        },
      };
      console.log(data);
      if (data) {
        if (data.review.content === '') {
          data.review.content = 'A good experience!';
        }
        console.log(data);
        const BookingId = localStorage.getItem('BookingId') || '';
        const token = localStorage.getItem('token') || '';
        callAPIput(
          'listings/' + HostingId + '/review/' + BookingId,
          data,
          token
        )
          .then(() => {
            setOpenSnackbar({
              severity: 'success',
              message: 'Thanks for your feedback！',
            });
            refresh();
            CloseLoginPage();
          })
          .catch((error) => {
            const content = meetError(error);
            setOpenSnackbar({
              severity: 'error',
              message: content,
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
