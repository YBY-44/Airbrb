import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import dayjs from 'dayjs';
import Rating from '@mui/material/Rating';
import { AddReview } from './review';
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useContext,
} from 'react';
import {
  useNavigate,
  // useParams,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import {
  LoginModelDetail,
  LargeHomePagecss,
  LargeHomeHead,
  LargeHomeHeadSearchContent,
  LargeHomeHeadInputInner,
  LargeHomeHeadInput,
  LargeHomeHeadLogo,
  LargeHomeHeadsearch,
  LargeHomeHeadLogoContent,
  LargeHomeHeadsearchimg,
  LargeHomeSwitchBar,
  LargeProfile,
  LargeProfileLeftImage,
  LargeProfileOuter,
  LargeProfileRightImage,
  AppContext,
  SmallHomePagecss,
  SmallHomeHead,
  LogoutModelHost,
  SwitchContent,
} from '../App';
import {
  CallAPIPostWithToken,
  callAPIget,
  GetDistance,
  meetError,
  ErrorContext,
} from './API';
import { styled } from '@mui/material';
import { Availability } from './publish';
import { GetAllOwnerBookingListing } from './get_all_listing';
// interface part
interface Review {
  score: number;
  content: string;
  time: Date;
  owner: string;
}
interface ListingContent {
  score: number;
  title: string;
  owner: string;
  address: {
    City: string;
    Country: string;
    Postcode: string;
    State: string;
    Street: string;
  };
  availability: Availability[];
  postedOn: Date;
  price: string;
  thumbnail: string;
  metadata: {
    type: string;
    bedInfo: {
      Guests: string;
      Bedrooms: string;
      Beds: string;
      Bathrooms: string;
    };
    otherInfo: {
      WiFi: boolean;
      TV: boolean;
      Kitchen: boolean;
      WashingMachine: boolean;
      AirConditioning: boolean;
      FreeParking: boolean;
    };
    images: string[];
  };
  reviews: Review[];
  CheckinDate: Date | null;
  CheckoutDate: Date | null;
  Booker: string;
  TotalPrice: number;
}
type ApiResponse = {
  listing: ListingContent;
};
// interface for the confirm
interface ConfirmBookProps {
  data: ListingContent;
  isOpen: boolean;
  close: () => void;
}
interface booking {
  dateRange: Availability;
  totalPrice: number;
}
// interface part end
// ----------------------------------------------css
const BackHome = styled('button')({
  backgroundColor: 'white',
  border: '2px solid black',
  borderRadius: '5px',
  margin: '0px 0px 0px 10px',
  height: '40px',
  width: '80px',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: 'rgb(240,240,240)',
  },
});
const LogoPath = styled('img')({
  width: '13px',
  height: '13px',
});
const SmallTitle = styled('p')({
  fontFamily: 'Arial',
  textAlign: 'left',
  padding: '20px 10px 0px 30px',
  fontSize: '27px',
  margin: '0px 0px 10px 0px',
  textOverflow: 'ellipsis',
  overflowX: 'hidden',
  minHeight: '70px',
  fontWeight: '500',
});
const SmallType = styled('p')({
  fontFamily: 'Arial',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '20px 10px 0px 30px',
  fontSize: '20px',
  margin: '0px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
  fontWeight: '500',
});
const SmallTitle2 = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '0px 10px 0px 30px',
  margin: '0px',
  fontSize: '16px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
  fontWeight: '500',
});
const SmallTitle3 = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '0px 0px 0px 30px',
  margin: '0px',
  fontSize: '14px',
  justifyContent: 'left',
  display: 'flex',
  color: 'rgb(91, 91, 91)',
  letterSpacing: '0px',
  fontWeight: '400',
});
const ReviewerSmall = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1300px',
  padding: '0px',
  margin: '0px',
  fontSize: '15px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
  fontWeight: '500',
});
const ReviewerLarge = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1300px',
  padding: '0px',
  margin: '0px',
  fontSize: '15px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
  fontWeight: '500',
});
const ReviewContentSmall = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1300px',
  padding: '0px',
  margin: '0px 0px 0px 0px',
  fontSize: '15px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
});
const ReviewContentLarge = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '0px',
  margin: '0px 30px 0px 30px',
  fontSize: '15px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
});
const ReviewDateSmall = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '0px',
  margin: '0px 30px 0px 30px',
  fontSize: '15px',
  color: 'rgb(90,90,90)',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
});
const CfmAll = styled('div')({
  width: '100%',
  height: '100%',
  position: 'fixed',
  zIndex: '3',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const CfmBack = styled('div')({
  zIndex: '1',
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: '0.3',
});
const CfmContent = styled('div')({
  position: 'absolute',
  zIndex: '4',
  width: '80%',
  height: '550px',
  backgroundColor: 'rgb(255, 255, 255)',
  borderRadius: '10px',
  boxShadow: '0px 1px 10px 1px rgba(42, 42, 42, 0.5)',
});
const CfmHeight = styled('div')({
  width: '100%',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid rgb(200, 200, 200)',
});
const CfmClose = styled('button')({
  alignItems: 'center',
  justifyContent: 'center',
  height: '30px',
  margin: '0px',
  marginLeft: '10px',
  cursor: 'pointer',
  display: 'flex',
  border: '1px solid black',
  width: '90px',
  fontWeight: '500',
  letterSpacing: '0.2px',
  backgroundColor: 'rgb(255, 255, 255)',
  // margin: '20px 0px 10px 0px',
  padding: '0px 10px 0px 10px',
  borderRadius: '20px',
});
const CfmCenterContent = styled('div')({
  position: 'relative',
  fontSize: '20px',
  margin: '0px',
  padding: '20px 0px 0px 0px',
  height: '400px',
  overflowY: 'scroll',
  textAlign: 'center',
  color: 'rgb(0, 0, 0)',
});
const CfmRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '40px',
  margin: '0px 10% 0px 10%',
  borderBottom: '1px solid rgb(220, 220, 220)',
});
const CfmRow2 = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  height: '40px',
});
const CfmRowP = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 10% 0px 10%',
  borderBottom: '1px solid rgb(220, 220, 220)',
});
const CfmRowCol = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  margin: '10px 10% 0px 10%',
  paddingBottom: '10px',
  borderBottom: '1px solid rgb(220, 220, 220)',
});
const CfmLefttxt = styled('p')({
  textAlign: 'left',
  margin: '0px',
  marginBottom: '10px',
  fontSize: '15px',
  color: 'rgb(42, 42, 42)',
});
const CfmBigtxt = styled('p')({
  textAlign: 'left',
  margin: '0px 10px 10px 10px',
  fontSize: '20px',
  maxWidth: '100%',
  wordWrap: 'break-word',
});
const CfmRightttxt = styled('p')({
  textAlign: 'left',
  margin: '0px 10px 10px 10px',
  fontSize: '14px',
  color: 'rgb(85, 85, 85)',
  maxWidth: '100%',
  wordWrap: 'break-word',
});
const CfmRightttxt2 = styled('p')({
  margin: '0px 0px 10px 0px',
  fontSize: '15px',
  color: 'rgb(85, 85, 85)',
  wordWrap: 'break-word',
});
const CfmValuettxt = styled('p')({
  textAlign: 'left',
  margin: '0px',
  marginLeft: '10px',
  fontSize: '13px',
  color: 'rgb(0, 0, 0)',
  width: 'auto',
  fontWeight: '500',
});
const CfmGuest = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'left',
  marginbBottm: '5px',
});
const CfmFac = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  '@media (max-width: 700px)': {
    justifyContent: 'left',
  },
  '@media (min-width: 700px)': {
    justifyContent: 'space-around',
  },
});
const CfmBottom = styled('div')({
  width: '100%',
  display: 'flex',
  height: '50px',
  justifyContent: 'center',
});
const CfmGuestBlock = styled('div')({
  margin: '0px 10px 0px 0px',
  alignItems: 'center',
  width: 'auto',
  display: 'flex',
});
const CfmHead = styled('p')({
  '@media (max-width: 390px)': {
    margin: '20px 30px 0px 0px',
  },
  '@media (min-width: 390px)': {
    margin: '20px 90px 0px 0px',
  },
  fontSize: '20px',
  width: '100%',
  height: '50px',
  textAlign: 'center',
  letterSpacing: '0.2px',
  color: 'rgb(48, 48, 48)',
});
const SpecificCenter = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  overflow: 'scroll',
});
const SmallThumbImg = styled('img')({
  width: '100%',
  maxHeight: '370px',
  objectFit: 'cover',
  cursor: 'pointer',
});
const ThumbImg = styled('img')({
  '@media (max-width: 1000px)': {
    width: '350px',
    height: '350px',
  },
  '@media (min-width: 1000px)': {
    width: '500px',
    height: '500px',
  },
  objectFit: 'cover',
  borderRadius: '20px',
  aspectRatio: '1/1',
});
const RightImage = styled('div')({
  '@media (max-width: 1000px)': {
    width: 'calc(100% - 370px)',
  },
  '@media (min-width: 1000px)': {
    width: 'calc(100% - 520px)',
  },
  display: 'flex',
  flexWrap: 'wrap',
});
const OtherImg = styled('img')({
  '@media (max-width: 1000px)': {
    height: '165px',
  },
  '@media (min-width: 1000px)': {
    height: '240px',
  },
  width: 'calc(50% - 20px)',
  aspectRatio: '1/1',
  objectFit: 'cover',
  borderRadius: '20px',
  margin: '0px 0px 20px 20px',
});
const DateBookSmall = styled('div')({
  '@media (max-width: 500px)': {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  '@media (min-width: 500px)': {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  display: 'flex',
  width: '100%',
});
const DateBookLarge = styled('div')({
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  '@media (min-width: 900px)': {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: 'flex',
});
const DateCheckBlock = styled('div')({
  '@media (max-width: 900px)': {
    width: '60%',
  },
  '@media (min-width: 900px)': {
    width: 'auto',
    margin: '10px',
  },
  minWidth: '200px',
  display: 'flex',
});
const DateCheckBlockSmall = styled('div')({
  '@media (max-width: 550px)': {
    width: '230px',
  },
  '@media (min-width: 550px)': {
    width: 'auto',
  },
  minWidth: '200px',
  display: 'flex',
});
const TotalPrice = styled('p')({
  fontSize: '20px',
  fontWeight: '500',
  margin: '0px 0px 10px 20px',
});
const SmallTotalPrice = styled('p')({
  fontSize: '20px',
  fontWeight: '500',
  margin: '0px 0px 10px 0px',
});
const AvailableTime = styled('p')({
  fontSize: '14px',
  margin: '1px 0px 0px 0px',
  letterSpacing: '0.2px',
});
const TimeTipSmall = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0px 0px 10px',
  maxHeight: '150px',
  overflow: 'scroll',
});
const TimeRowSmall = styled('div')({
  '@media (max-width: 550px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 550px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 20px 0px 20px',
  maxHeight: '150px',
});
const TimeTip = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0px 0px 10px',
  maxHeight: '150px',
  overflow: 'scroll',
});
const CheckPart = styled('div')({
  margin: '0px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const ReserveLarge = styled('button')({
  marginBottom: '15px',
  backgroundColor: 'rgb(0, 128, 255)',
  fontSize: '16px',
  width: '100%',
  letterSpacing: '1px',
  height: '50px',
  border: '0px',
  borderRadius: '7px',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgb(0, 109, 218);',
    color: 'white',
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});
const ReserveConfirm = styled('button')({
  marginBottom: '15px',
  backgroundColor: 'rgb(0, 128, 255)',
  fontSize: '16px',
  width: '90%',
  fontWeight: '500',
  letterSpacing: '1px',
  height: '50px',
  border: '0px',
  margin: '10px 0px 0px 0px',
  borderRadius: '7px',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgb(0, 109, 218);',
    color: 'white',
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});
const FinalPriceLarge = styled('div')({
  display: 'flex',
  width: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
});
const FPLL = styled('p')({
  fontSize: '20px',
  fontWeight: '500',
});
const FPLR = styled('p')({
  fontSize: '20px',
  fontWeight: '500',
});
const InvalidDate = styled('p')({
  margin: '10px 0px 10px 0px',
  padding: '0px',
  textAlign: 'center',
  fontSize: '15px',
  color: 'rgb(255,0,0)',
});
const LargeTitle = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '20px 10px 5px 30px',
  fontSize: '24px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
  fontWeight: '500',
});
const LargeType = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '20px 10px 0px 30px',
  margin: '0px',
  fontSize: '24px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0px',
  fontWeight: '500',
});
const LargeImagePart = styled('div')({
  maxWidth: '1300px',
  justifyContent: 'center',
  padding: '0px 20px 0px 20px',
  display: 'flex',
  borderRadius: '20px',
  cursor: 'pointer',
});
const LargeHouseInfo = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '0px 0px 0px 30px',
  margin: '0px',
  fontSize: '16px',
  justifyContent: 'left',
  display: 'flex',
  color: 'rgb(91, 91, 91)',
  letterSpacing: '0px',
  fontWeight: '400',
});
const LargeCenterLR = styled('div')({
  width: '100%',
  maxWidth: '1300px',
  display: 'flex',
});
const LargeFac = styled('div')({
  margin: '20px 0px 0px 0px',
  maxWidth: '1300px',
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
});
const SmallFac = styled('div')({
  margin: '20px 0px 0px 0px',
  maxWidth: '1300px',
  display: 'flex',
  flexDirection: 'column',
});
const SmallFacp = styled('div')({
  display: 'flex',
  margin: '0px 20px 0px 20px',
  padding: '20px',
  flexWrap: 'wrap',
  borderBottom: '1px solid rgb(192, 192, 192)',
});
const LargeFacp = styled('div')({
  display: 'flex',
  margin: '0px 20px 0px 20px',
  padding: '20px',
  flexWrap: 'wrap',
  borderBottom: '1px solid rgb(192, 192, 192)',
});
const LargeTitle2 = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1300px',
  padding: '20px 0px 0px 30px',
  margin: '0px',
  fontSize: '16px',
  justifyContent: 'left',
  display: 'flex',
  fontWeight: '500',
  letterSpacing: '0.5px',
});
const SmallTime = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  padding: '0px 0px 0px 30px',
  margin: '5px 0px 0px 0px',
  fontSize: '14px',
  justifyContent: 'left',
  display: 'flex',
  color: 'rgb(90, 90, 90)',
  letterSpacing: '0.5px',
});
const LargeTime = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  padding: '0px 0px 20px 30px',
  margin: '5px 0px 10px 0px',
  fontSize: '14px',
  justifyContent: 'left',
  display: 'flex',
  color: 'rgb(90, 90, 90)',
  letterSpacing: '0.5px',
  borderBottom: '1px solid rgb(192, 192, 192)',
});
const LargeBook = styled('div')({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 20px 0px 0px',
  padding: '20px 20px 0px 20px',
  borderRadius: '10px',
  border: '1px solid rgb(225, 225, 225)',
  boxShadow: '0px 1px 10px 1px rgba(164, 164, 164, 0.5)',
});
const SmallBook = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 0px 20px',
  borderRadius: '10px',
  border: '1px solid rgb(225, 225, 225)',
  boxShadow: '0px 1px 10px 1px rgba(164, 164, 164, 0.5)',
});
const LargeReviweInfo = styled('div')({
  margin: '20px',
  borderRadius: '20px',
  border: '1px solid rgb(192, 192, 192)',
  display: 'flex',
  flexDirection: 'row',
});
const LargeReviewtxt = styled('p')({
  fontSize: '16px',
  margin: '0px',
  padding: '0px',
  fontWeight: '500',
});
const LargeReviewtxt2 = styled('p')({
  fontSize: '16px',
  margin: '0px',
  padding: '0px',
});
const LargeReviewscore = styled('p')({
  fontSize: '16px',
  margin: '0px 0px 4px 0px',
  padding: '0px',
  fontWeight: '500',
});
const LargeHousea = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  padding: '0px 50px 10px 0px',
  margin: '0px',
  fontSize: '15px',
  color: 'rgb(70, 70, 70)',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0.5px',
  fontWeight: '400',
});
const LargeReviewBlock = styled('div')({
  width: '40%',
  margin: '15px 20px 15px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
});
const LargeReviewPart = styled('div')({
  width: '100%',
  maxWidth: '1300px',
});
const SmallReviewPart = styled('div')({
  maxWidth: '1300px',
  minWidth: '200px',
  width: '100%',
  margin: '20px 0px 20px 0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
});
const ReviewEachBlockSmall = styled('div')({
  margin: '10px 0px 0px 0px',
  padding: '10px 20px 10px 20px',
  borderBottom: '1px solid rgb(220,220,220)',
  display: 'flex',
  flexDirection: 'column',
});
const ReviewEachBlockLarge = styled('div')({
  width: '100%',
  margin: '0px 0px 0px 0px',
  padding: '10px 0px 10px 0px',
  borderBottom: '1px solid rgb(220,220,220)',
  display: 'flex',
  flexDirection: 'column',
});
const ReviewHeaderSmall = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const ReviewHeaderLarge = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '0px 30px 0px 30px',
});
const LargeAddress = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  padding: '15px 0px 10px 25px',
  margin: '0px 0px 0px 0px',
  fontSize: '16px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0.3px',
  borderBottom: '1px solid rgb(225, 225, 225)',
});
const SmallAddress = styled('p')({
  fontFamily: 'Segoe UI',
  textAlign: 'left',
  maxWidth: '1300px',
  color: 'rgb(90, 90, 90)',
  padding: '0px 0px 20px 30px',
  margin: '0px',
  fontSize: '14px',
  justifyContent: 'left',
  display: 'flex',
  letterSpacing: '0.3px',
  borderBottom: '1px solid rgb(225, 225, 225)',
});
const AllImage = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: '5',
});
const Overall = styled('div')({
  position: 'absolute',
  zIndex: '1',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
});
const Backimg = styled('img')({
  padding: '50px 90% 55px 100px',
  objectFit: 'contain',
  cursor: 'pointer',
  backgroundColor: 'rgb(255,255,255)',
  '&:hover': {
    backgroundColor: 'rgb(240,240,240)',
  },
});
const Backimgsmall = styled('img')({
  '@media (max-width: 500px)': {
    padding: '50px 60% 55px 2%',
  },
  '@media (min-width: 500px)': {
    padding: '50px 60% 55px 10%',
  },
  objectFit: 'contain',
  cursor: 'pointer',
  backgroundColor: 'rgb(255,255,255)',
  '&:hover': {
    backgroundColor: 'rgb(240,240,240)',
  },
});
const LastImg = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  backgroundColor: 'rgb(240,240,240)',
});
// ---------------------------------------------css

// this function is the confirmation of the confirm booking.
export const ConfirmBook: React.FC<ConfirmBookProps> = ({
  data,
  isOpen,
  close,
}) => {
  // inital the confirm state to false
  const [ConfirmState, setConfirmState] = useState(false);
  // use the navigate to go to the user page
  const navigate = useNavigate();
  // get the hosting id from the url
  const { HostingId } = useParams();
  // go to the user page
  const goesMain = () => {
    navigate('/user/' + data.Booker);
  };
  // go back to detail page
  const back = () => {
    setConfirmState(false);
    close();
  };
  // get the error context
  const ErrorValue = useContext(ErrorContext);
  // if not error
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the set open snackbar function
  const { setOpenSnackbar } = ErrorValue;
  // this function used when the user click the confirm button
  const ReverseBook = () => {
    // if both date is not null
    if (data.CheckinDate && data.CheckoutDate) {
      // get the distance between two date
      const distance = GetDistance(data.CheckinDate, data.CheckoutDate);
      // initial the two date and distance
      const datas: booking = {
        dateRange: {
          startDate: data.CheckinDate,
          endDate: data.CheckoutDate,
          distance,
        },
        // get the total price
        totalPrice: distance * Number(data.price),
      };
      // get the token from the local storage
      const token = localStorage.getItem('token') || '';
      // call the api to create the booking
      CallAPIPostWithToken('bookings/new/' + HostingId, datas, token)
        .then((response) => {
          // get the booking id
          const bookingId = response as { bookingId: string };
          console.log(bookingId.bookingId);
          // refresh the new booking id
          console.log(localStorage.getItem('NewBooking'));
          localStorage.setItem('NewBooking', bookingId.bookingId);
          console.log(localStorage.getItem('NewBooking'));
          // set the open snackbar
          setOpenSnackbar({
            severity: 'success',
            message:
              'We have sent your booking to the host and you can check the status of your booking by visiting the homepage.',
          });
          setOpenSnackbar({
            severity: 'success',
            message: '',
          });
          // set the confirm state to true
          setConfirmState(true);
        })
        .catch((error) => {
          if (error === 'info') {
            // show error message
            setOpenSnackbar({
              severity: 'error',
              message: 'You can not book your own listing.',
            });
          } else {
            // show error message
            setOpenSnackbar({
              severity: 'error',
              message: meetError(error),
            });
          }
          // show error message
          setOpenSnackbar({
            severity: 'error',
            message: '',
          });
        });
    }
  };
  // initial the conponment
  let conponment = <div></div>;
  if (isOpen) {
    // initial the address
    const address =
      data.address.Street +
      ', ' +
      data.address.City +
      ', ' +
      data.address.State +
      ', ' +
      data.address.Country +
      ', ' +
      data.address.Postcode;
    // initial all facilities
    const items: {
      [key: string]: boolean;
    } = {
      WiFi: data.metadata.otherInfo.WiFi,
      TV: data.metadata.otherInfo.TV,
      Kitchen: data.metadata.otherInfo.Kitchen,
      WashingMachine: data.metadata.otherInfo.WashingMachine,
      AirConditioning: data.metadata.otherInfo.AirConditioning,
      FreeParking: data.metadata.otherInfo.FreeParking,
    };
    // filter all true facilities
    const trueKeys = Object.keys(items).filter((key) => {
      return items[key] === true;
    });
    // if the facilities is empty then do it
    if (trueKeys.length === 0) {
      trueKeys.push('No additional Facilities');
    }
    // change the conponment
    conponment = (
      <CfmAll>
        <CfmBack></CfmBack>
        <CfmContent>
          <CfmHeight>
            <CfmClose onClick={back}>
              {ConfirmState ? 'Back' : 'Cancel'}
            </CfmClose>
            <CfmHead>Hosting Paying</CfmHead>
          </CfmHeight>
          <CfmCenterContent>
            <CfmRow>
              <CfmBigtxt>{data.metadata.type}</CfmBigtxt>
              <CfmRightttxt>{'Hosted by ' + data.owner}</CfmRightttxt>
            </CfmRow>
            <CfmRowCol>
              <CfmLefttxt>Hosting Address</CfmLefttxt>
              <CfmRightttxt>{address}</CfmRightttxt>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Facilities</CfmLefttxt>
              <CfmGuest>
                <CfmGuestBlock>
                  <LogoPath src='/img/Guest.png'></LogoPath>
                  <CfmValuettxt>{data.metadata.bedInfo.Guests}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <LogoPath src='/img/bath.png'></LogoPath>
                  <CfmValuettxt>{data.metadata.bedInfo.Bathrooms}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <LogoPath src='/img/bedroom.png'></LogoPath>
                  <CfmValuettxt>{data.metadata.bedInfo.Bedrooms}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <LogoPath src='/img/bed.png'></LogoPath>
                  <CfmValuettxt>{data.metadata.bedInfo.Beds}</CfmValuettxt>
                </CfmGuestBlock>
              </CfmGuest>
              <CfmFac>
                {trueKeys.map((key) => (
                  <CfmValuettxt key={key}>{key}</CfmValuettxt>
                ))}
              </CfmFac>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Hosting Date</CfmLefttxt>
              <CfmRow2>
                <CfmRightttxt2>
                  {dayjs(data.CheckinDate).format('MM/DD/YYYY') +
                    ' - ' +
                    dayjs(data.CheckoutDate).format('MM/DD/YYYY')}
                </CfmRightttxt2>
                <CfmRightttxt2>
                  {GetDistance(data.CheckinDate, data.CheckoutDate) + ' night'}
                </CfmRightttxt2>
              </CfmRow2>
            </CfmRowCol>
            <CfmRowP>
              <CfmLefttxt>Total Price</CfmLefttxt>
              <CfmRightttxt>${String(data.TotalPrice.toFixed(2))}</CfmRightttxt>
            </CfmRowP>
          </CfmCenterContent>
          <CfmBottom>
            <ReserveConfirm
              onClick={() => {
                if (ConfirmState) {
                  goesMain();
                } else {
                  ReverseBook();
                }
              }}
            >
              {ConfirmState
                ? 'Goes to HomePage'
                : 'Pay for $' + String(data.TotalPrice.toFixed(2)) + ' AUD'}
            </ReserveConfirm>
          </CfmBottom>
        </CfmContent>
      </CfmAll>
    );
    console.log(data);
  }
  return isOpen ? conponment : null;
};
export const ListingDetailSmall = () => {
  // initial the allimage page not shown
  const [allimg, setallimg] = useState(false);
  // get all context value
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { Checkin, Checkout } = FilterValue;
  // initial the checkin and checkout value
  const [OrderCheckin, SetorderCheckin] = useState<Date | null>(Checkin);
  const [OrderCheckout, SetorderCheckout] = useState<Date | null>(Checkout);
  // set the scroll flag initial to false
  const [scrollFlag, setScrollFlag] = useState(false);
  // initial the distance of booking
  const [inDistance, SetinDistance] = useState<number>(
    GetDistance(Checkin, Checkout)
  );
  // initial the booking data
  const [data, setData] = useState<ListingContent>({
    score: 0,
    title: '',
    owner: '',
    address: {
      City: '',
      Country: '',
      Postcode: '',
      State: '',
      Street: '',
    },
    availability: [],
    postedOn: new Date(Date.now()),
    price: '',
    thumbnail: '',
    metadata: {
      type: '',
      bedInfo: {
        Guests: '',
        Bedrooms: '',
        Beds: '',
        Bathrooms: '',
      },
      otherInfo: {
        WiFi: false,
        TV: false,
        Kitchen: false,
        WashingMachine: false,
        AirConditioning: false,
        FreeParking: false,
      },
      images: [],
    },
    reviews: [],
    CheckinDate: Checkin,
    CheckoutDate: Checkout,
    Booker: localStorage.getItem('LoggedUserEmail') || '',
    TotalPrice: Number(inDistance),
  });
  // get the hosting id
  const { HostingId } = useParams();
  // use the navigate function
  const navigate = useNavigate();
  // load the data
  const loadData = (dataing: ListingContent) => {
    setData(dataing);
  };
  // check a reserve is valid
  const [vaildReserve, setvalidReserve] = useState(
    OrderCheckin === null || OrderCheckout === null
  );
  // check the different error of booking choose
  const checkDateAvailable = (
    start: Date | null,
    end: Date | null,
    array: Availability[]
  ) => {
    console.log(start === end, dayjs(start), dayjs(end));

    if (!(start && end)) {
      return 1;
    }
    if (dayjs(start).isSame(dayjs(end))) {
      return 2;
    }
    if (
      array.some((item) => {
        return (
          dayjs(item.startDate) <= dayjs(start) &&
          dayjs(end) <= dayjs(item.endDate)
        );
      })
    ) {
      setvalidReserve(false);
      return 0;
    }
    return 3;
  };
  // initial the error content
  const [errorContent, seterrorContent] = useState(
    OrderCheckin && OrderCheckout ? '' : 'Both date are required'
  );
  // convert the button style for the user
  const convertButtonState = (
    dateStart: Date | null,
    dateEnd: Date | null,
    array: Availability[]
  ) => {
    const state = checkDateAvailable(dateStart, dateEnd, array);
    switch (state) {
      case 1:
        seterrorContent('Both date are required');
        setvalidReserve(true);
        break;
      case 2:
        seterrorContent('You must reverse at least one night');
        setvalidReserve(true);
        break;
      case 3:
        seterrorContent('Those dates are not available');
        setvalidReserve(true);
        break;
      default:
        seterrorContent('');
        setvalidReserve(false);
    }
  };
  const handleCheckinChange = (date: Date | null) => {
    // change the checkin date
    SetorderCheckin(date);
    // chang the distance
    SetinDistance(GetDistance(date, OrderCheckout));
    // if the checkin date is later than checkout date, then change the checkout date
    if (date && OrderCheckout && date > OrderCheckout) {
      SetorderCheckout(date);
      SetinDistance(0);
    } else {
      // accoring to the checkin date and checkout date to change the button style
      convertButtonState(date, OrderCheckout, data.availability);
    }
  };
  // change the checkout date
  const handleCheckoutChange = (date: Date | null) => {
    SetorderCheckout(date);
    SetinDistance(GetDistance(OrderCheckin, date));
    // if the checkout date is earlier than checkin date, then change the checkin date
    if (date && OrderCheckin && date < OrderCheckin) {
      SetinDistance(0);
      SetorderCheckin(date);
    } else {
      // accoring to the checkin date and checkout date to change the button style
      convertButtonState(OrderCheckin, date, data.availability);
    }
  };
  // initial the component ref
  const componentRef = useRef<HTMLDivElement>(null);
  // initial the refresh flag
  const [refreshflag, setRefresh] = useState(true);
  // refresh the page
  const refresh = () => setRefresh(!refreshflag);
  // initial the use Effect
  useEffect(() => {
    // check the current route is match the specific path
    const timeoutId = setTimeout(() => {
      // judge whether the scroll flag is true
      const ShouldScroll = localStorage.getItem('scroll') === 't';
      // then scroll to the bottom
      if (ShouldScroll && componentRef.current) {
        componentRef.current.scrollTop = componentRef.current.scrollHeight;
      }
    }, 30);
    // clear the timeout
    return () => clearTimeout(timeoutId);
  }, [scrollFlag]);
  // initial the error context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the error context
  const { setOpenSnackbar } = ErrorValue;
  // accoring to the hosting id to get the data
  useEffect(() => {
    callAPIget('listings/' + HostingId, '')
      .then((response) => {
        // get the response data
        const Responsedata = response as ApiResponse;
        // get the score and Resp
        const Resp = Responsedata.listing;
        const scor = Responsedata.listing.reviews;
        // calculate the average score
        if (scor.length > 0) {
          const sum = scor.reduce(
            (accumulator, item) => accumulator + item.score,
            0
          );
          const average = sum / scor.length;
          Resp.score = average;
        } else {
          Resp.score = 0;
        }
        // load all the data
        console.log(Responsedata.listing);
        loadData(Resp);
        // according to the scroll flag to set the scroll flag
        if (localStorage.getItem('scroll') === 't') {
          setScrollFlag(!scrollFlag);
        }
      })
      .catch((error) => {
        // when meet error then show the error message
        setOpenSnackbar({ severity: 'error', message: meetError(error) });
        setOpenSnackbar({ severity: 'error', message: '' });
        // return the null value
        return null;
      });
  }, [refreshflag]);
  // set isOpen to false initially
  const [isOpen, setOpen] = useState(false);
  // close the profile
  const close = () => {
    setOpen(false);
  };
  // open the profile
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  // go back to the home page
  const goesHome = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}`);
    } else {
      navigate('/');
    }
  };
  // filter all the true value
  const trueKeys = Object.entries(data?.metadata.otherInfo || {})
    .filter(([key, value]) => key && value === true)
    .map(([key]) => key);
  // if the trueKeys is empty then push the no additional facilities
  if (trueKeys.length === 0) {
    trueKeys.push('No additional Facilities');
  }
  // check whether the date is satisfy a rang
  const shouldDisableDateCheckOut = (date: Date) => {
    // check whether the date is before the checkin date
    if (OrderCheckin) {
      return date < OrderCheckin;
    } else {
      return false;
    }
  };
  // initial the book flag
  const [isbook, setbook] = useState(false);
  // close the book
  const closebook = () => {
    setbook(false);
  };
  // reverse the order
  const Reverse = () => {
    // get the token
    const token = localStorage.getItem('token') || '';
    if (token) {
      // if both checkin date and checkout date are not null
      if (OrderCheckin && OrderCheckout) {
        data.CheckinDate = OrderCheckin;
        data.CheckoutDate = OrderCheckout;
        data.TotalPrice = inDistance * Number(data.price);
        // set the book flag to true
        setbook(true);
      }
    } else {
      navigate('/login');
    }
  };
  // link the ref
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  // set the returned conponment
  const conponment = (
    <SmallHomePagecss>
      {allimg && (
        <AllImage>
          <Overall></Overall>
          <ImageList
            sx={{
              width: '100%',
              height: '100%',
              zIndex: '5',
              position: 'absolute',
            }}
            cols={2}
            rowHeight={300}
          >
            <Backimgsmall
              src='/img/Back.png'
              onClick={() => {
                setallimg(false);
              }}
            ></Backimgsmall>
            {data.metadata.images.map((item) => (
              <ImageListItem key={item}>
                <img src={item} alt='image' />
              </ImageListItem>
            ))}
            <LastImg>No more images</LastImg>
          </ImageList>
        </AllImage>
      )}
      <div ref={TargetMenu}>
        <Routes>
          <Route
            path='/'
            element={<LoginModelDetail isOpen={isOpen} close={close} />}
          />
          <Route
            path='/logged'
            element={<LogoutModelHost isOpen={isOpen} close={close} />}
          />
          <Route path='*' element={NaN} />
        </Routes>
      </div>
      <Routes>
        <Route
          path='/logged/review'
          element={<AddReview refresh={refresh} />}
        />
      </Routes>
      <div>
        <ConfirmBook data={data} isOpen={isbook} close={closebook} />
      </div>
      <SmallHomeHead>
        <BackHome onClick={goesHome}>Homes</BackHome>
        <LargeProfile>
          <LargeProfileOuter onClick={ClickProfile}>
            <LargeProfileLeftImage src='/img/more.png'></LargeProfileLeftImage>
            <Routes>
              <Route
                path='/logged'
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
      </SmallHomeHead>
      <SpecificCenter ref={componentRef}>
        <SmallThumbImg
          src={data?.thumbnail}
          onClick={() => {
            setallimg(true);
          }}
        ></SmallThumbImg>
        <SmallTitle>{data?.title}</SmallTitle>
        <SmallTitle2>
          {data?.metadata.type +
            ' stay in ' +
            data?.address.City +
            ', ' +
            data?.address.Country}
        </SmallTitle2>
        <SmallTitle3>
          {data?.metadata.bedInfo.Guests +
            ' guests · ' +
            data?.metadata.bedInfo.Bedrooms +
            ' bedrooms · ' +
            data?.metadata.bedInfo.Beds +
            ' beds · ' +
            data?.metadata.bedInfo.Bathrooms +
            ' bathrooms'}
        </SmallTitle3>
        <SmallFac>
          <SmallType>What this place offers?</SmallType>
          <SmallFacp>
            {trueKeys.map((key) => (
              <LargeHousea key={key}>{key}</LargeHousea>
            ))}
          </SmallFacp>
          <SmallType>{'Hosted by ' + data?.owner}</SmallType>
          <SmallTime>
            {'Published in ' + dayjs(data?.postedOn).format('YYYY-DD-MM')}
          </SmallTime>
          <SmallAddress>
            Full Address:
            {' ' +
              data?.address.Street +
              ', ' +
              data?.address.City +
              ', ' +
              data?.address.State +
              ', ' +
              data?.address.Country +
              ', ' +
              data?.address.Postcode}
          </SmallAddress>
          <GetAllOwnerBookingListing />
          <LargeReviweInfo>
            <LargeReviewBlock>
              <LargeReviewscore>{data?.score.toFixed(2)}</LargeReviewscore>
              <Rating
                name='custom-rating'
                value={data?.score}
                precision={0.2}
                size='small'
                readOnly
                sx={{ color: 'black' }} // 使用sx属性添加样式
              />
            </LargeReviewBlock>
            <LargeReviewBlock>
              <LargeReviewtxt>{data?.reviews.length}</LargeReviewtxt>
              <LargeReviewtxt2>Reviews</LargeReviewtxt2>
            </LargeReviewBlock>
          </LargeReviweInfo>
        </SmallFac>
        <SmallBook>
          <SmallTotalPrice>
            {OrderCheckin && OrderCheckout
              ? `${(inDistance * Number(data.price)).toFixed(2)} AUD total for`
              : `${Number(data.price).toFixed(2)} AUD per night`}
          </SmallTotalPrice>
          <DateBookSmall>
            <DateCheckBlockSmall>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label='Checkin Date'
                    value={OrderCheckin}
                    onChange={(date) => {
                      if (date) handleCheckinChange(date);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </DateCheckBlockSmall>
            <DateCheckBlockSmall>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label='End Date'
                    value={OrderCheckout}
                    onChange={(date) => {
                      if (date) handleCheckoutChange(date);
                    }}
                    shouldDisableDate={shouldDisableDateCheckOut}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </DateCheckBlockSmall>
          </DateBookSmall>
          <TimeTipSmall>
            {data.availability.map((key, index) => (
              <TimeRowSmall key={index}>
                <AvailableTime>
                  {'Available Range ' + (index + 1) + ':'}
                </AvailableTime>
                <AvailableTime>
                  {'From ' +
                    dayjs(key.startDate).format('MM/DD/YYYY') +
                    ' to ' +
                    dayjs(key.endDate).format('MM/DD/YYYY')}
                </AvailableTime>
              </TimeRowSmall>
            ))}
          </TimeTipSmall>
          <InvalidDate>{errorContent}</InvalidDate>
          <CheckPart>
            <ReserveLarge onClick={Reverse} disabled={vaildReserve}>
              Reserve
            </ReserveLarge>
            <FinalPriceLarge>
              <FPLL>Total</FPLL>
              <FPLR>
                {'$' + (inDistance * Number(data.price)).toFixed(2) + ' AUD'}
              </FPLR>
            </FinalPriceLarge>
          </CheckPart>
        </SmallBook>
        <SmallReviewPart>
          {data.reviews.map((item, index) => (
            <ReviewEachBlockSmall key={index}>
              <ReviewHeaderSmall>
                <ReviewerSmall>{item.owner}</ReviewerSmall>
                <Rating
                  name='custom-rating'
                  value={item.score}
                  precision={0.5}
                  size='small'
                  readOnly
                  sx={{ color: 'black' }} // 使用sx属性添加样式
                />
              </ReviewHeaderSmall>
              <ReviewContentSmall>{item.content}</ReviewContentSmall>
              <ReviewDateSmall>
                {dayjs(item.time).format('MM/DD/YYYY')}
              </ReviewDateSmall>
            </ReviewEachBlockSmall>
          ))}
        </SmallReviewPart>
      </SpecificCenter>
    </SmallHomePagecss>
  );
  return conponment;
};
export const ListingDetailLarge = () => {
  // initial the allimg flag
  const [allimg, setallimg] = useState(false);
  // initial the scroll flag
  const [scrollFlag, setScrollFlag] = useState(false);
  // get the app context
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // initial the search info and other info
  const { searchcontent, setcontent, Checkin, Checkout } = FilterValue;
  // initial the order checkin and checkout
  const [OrderCheckin, SetorderCheckin] = useState<Date | null>(Checkin);
  const [OrderCheckout, SetorderCheckout] = useState<Date | null>(Checkout);
  // initial the data for submit
  const [data, setData] = useState<ListingContent>({
    score: 0,
    title: '',
    owner: '',
    address: {
      City: '',
      Country: '',
      Postcode: '',
      State: '',
      Street: '',
    },
    availability: [],
    postedOn: new Date(Date.now()),
    price: '',
    thumbnail: '',
    metadata: {
      type: '',
      bedInfo: {
        Guests: '',
        Bedrooms: '',
        Beds: '',
        Bathrooms: '',
      },
      otherInfo: {
        WiFi: false,
        TV: false,
        Kitchen: false,
        WashingMachine: false,
        AirConditioning: false,
        FreeParking: false,
      },
      images: [],
    },
    reviews: [],
    CheckinDate: Checkin,
    CheckoutDate: Checkout,
    Booker: localStorage.getItem('LoggedUserEmail') || '',
    TotalPrice: 0,
  });
  // get the params
  const { HostingId } = useParams();
  // use the navigate
  const navigate = useNavigate();
  // change the data
  const loadData = (dataing: ListingContent) => {
    setData(dataing);
  };
  // change the search content
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  // change the checkin date and checkout date are valid
  const [vaildReserve, setvalidReserve] = useState(
    OrderCheckin === null || OrderCheckout === null
  );
  // change the date distance
  const [inDistance, SetinDistance] = useState<number>(
    GetDistance(Checkin, Checkout)
  );
  // check the date available range
  const checkDateAvailable = (
    start: Date | null,
    end: Date | null,
    array: Availability[]
  ) => {
    // log the date
    console.log(start === end, dayjs(start), dayjs(end));
    // if exist null
    if (!(start && end)) {
      // error 1
      return 1;
    }
    // if two date are same
    if (dayjs(start).isSame(dayjs(end))) {
      // error 2
      return 2;
    }
    // if the date is not available
    // error 3
    if (
      array.some((item) => {
        return (
          dayjs(item.startDate) <= dayjs(start) &&
          dayjs(end) <= dayjs(item.endDate)
        );
      })
    ) {
      // set the valid reserve
      setvalidReserve(false);
      return 0;
    }
    // error 3
    return 3;
  };
  // change the error content
  const [errorContent, seterrorContent] = useState(
    OrderCheckin && OrderCheckout ? '' : 'Both date are required'
  );
  // convert the button state
  const convertButtonState = (
    dateStart: Date | null,
    dateEnd: Date | null,
    array: Availability[]
  ) => {
    // if the error exist then the button is disable
    const state = checkDateAvailable(dateStart, dateEnd, array);
    switch (state) {
      // error 1
      case 1:
        seterrorContent('Both date are required');
        setvalidReserve(true);
        break;
      // error 2
      case 2:
        seterrorContent('You must reverse at least one night');
        setvalidReserve(true);
        break;
      // error 3
      case 3:
        seterrorContent('Those dates are not available');
        setvalidReserve(true);
        break;
      default:
        seterrorContent('');
        setvalidReserve(false);
    }
  };
  const handleCheckinChange = (date: Date | null) => {
    // set the order checkin and distance
    SetorderCheckin(date);
    SetinDistance(GetDistance(date, OrderCheckout));
    // if the checkin date is later than checkout date
    if (date && OrderCheckout && date > OrderCheckout) {
      // set the order checkout and distance
      SetorderCheckout(date);
      SetinDistance(0);
    } else {
      // convert the button state
      convertButtonState(date, OrderCheckout, data.availability);
    }
  };
  // when the checkout date change
  const handleCheckoutChange = (date: Date | null) => {
    // set the order checkout and distance
    SetorderCheckout(date);
    SetinDistance(GetDistance(OrderCheckin, date));
    // if the checkin date is exist and checkout date is earlier than checkin date
    if (date && OrderCheckin && date < OrderCheckin) {
      // set the order checkin and distance
      SetinDistance(0);
      SetorderCheckin(date);
    } else {
      // convert the button state
      convertButtonState(OrderCheckin, date, data.availability);
    }
  };
  // set the refresh flag to control the refresh
  const [refreshflag, setRefresh] = useState(true);
  // refresh the data
  const refresh = () => setRefresh(!refreshflag);
  // get the error context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the error context
  const { setOpenSnackbar } = ErrorValue;
  // use effect to refresh the data
  useEffect(() => {
    callAPIget('listings/' + HostingId, '')
      .then((response) => {
        // get the response
        const Responsedata = response as ApiResponse;
        // get the score and response
        const Resp = Responsedata.listing;
        const scor = Responsedata.listing.reviews;
        // if the score is exist and length is not 0
        if (scor.length > 0) {
          // calculate the average score
          const sum = scor.reduce(
            (accumulator, item) => accumulator + item.score,
            0
          );
          const average = sum / scor.length;
          // set the score
          Resp.score = average;
        } else {
          // set the score to zero
          Resp.score = 0;
        }
        // set the data
        console.log(Responsedata.listing);
        loadData(Resp);
        // if the scroll flag is true
        if (localStorage.getItem('scroll') === 't') {
          // scroll to the bottom
          setScrollFlag(!scrollFlag);
        }
      })
      .catch((error) => {
        // meet the error
        setOpenSnackbar({ severity: 'error', message: meetError(error) });
        setOpenSnackbar({ severity: 'error', message: '' });
        // return null because of the error
        return null;
      });
  }, [refreshflag]);
  // inital the profile open state is false
  const [isOpen, setOpen] = useState(false);
  // close the profile
  const close = () => {
    setOpen(false);
  };
  // open the profile
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  // go to the host page
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  // reload the data
  const reloading = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}`);
    } else {
      navigate('/');
    }
  };
  // get all facilities
  const trueKeys = Object.entries(data?.metadata.otherInfo || {})
    .filter(([key, value]) => key && value === true)
    .map(([key]) => key);
  // filter the facilities with true value
  if (trueKeys.length === 0) {
    trueKeys.push('No additional Facilities');
  }
  // get check the valid range
  const shouldDisableDateCheckOut = (date: Date) => {
    // check the date is before the checkin date
    if (OrderCheckin) {
      return date < OrderCheckin;
    } else {
      return false;
    }
  };
  // inital the book open state is false
  const [isbook, setbook] = useState(false);
  // set book to false
  const closebook = () => {
    setbook(false);
  };
  // when user want to book a listing
  const Reverse = () => {
    // get the token
    const token = localStorage.getItem('token') || '';
    if (token) {
      // if the checkin date and checkout date is exist
      if (OrderCheckin && OrderCheckout) {
        // set the data
        data.CheckinDate = OrderCheckin;
        data.CheckoutDate = OrderCheckout;
        data.TotalPrice = inDistance * Number(data.price);
        setbook(true);
      }
    } else {
      navigate('/login');
    }
  };
  // get the scroll flag
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // scroll to bottom if the user is adding review
    const timeoutId = setTimeout(() => {
      const ShouldScroll = localStorage.getItem('scroll') === 't';
      if (ShouldScroll && componentRef.current) {
        componentRef.current.scrollTop = componentRef.current.scrollHeight;
      }
    }, 30);
    return () => clearTimeout(timeoutId);
  }, [scrollFlag]);
  // get the target menu
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  // set the return component
  const conponment = (
    <LargeHomePagecss>
      {allimg && (
        <AllImage>
          <Overall></Overall>
          <ImageList
            sx={{
              width: '100%',
              height: '100%',
              zIndex: '5',
              position: 'absolute',
            }}
            cols={2}
            rowHeight={300}
          >
            <Backimg
              src='/img/Back.png'
              onClick={() => {
                setallimg(false);
              }}
            ></Backimg>
            {data.metadata.images.map((item) => (
              <ImageListItem key={item}>
                <img src={item} alt='image' />
              </ImageListItem>
            ))}
            <LastImg>No more images</LastImg>
          </ImageList>
        </AllImage>
      )}
      <div ref={TargetMenu}>
        <Routes>
          <Route
            path='/logged/*'
            element={<LogoutModelHost isOpen={isOpen} close={close} />}
          />
          <Route
            path='/*'
            element={<LoginModelDetail isOpen={isOpen} close={close} />}
          />
          <Route path='*' element={NaN} />
        </Routes>
      </div>
      <div>
        <ConfirmBook data={data} isOpen={isbook} close={closebook} />
      </div>
      <Routes>
        <Route
          path='/logged/review'
          element={<AddReview refresh={refresh} />}
        />
      </Routes>
      <LargeHomeHead>
        <LargeHomeHeadLogo>
          <LargeHomeHeadLogoContent
            onClick={() => {
              reloading();
            }}
            src='/img/logo_p.png'
          ></LargeHomeHeadLogoContent>
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
                path='/logged/*'
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
      <SpecificCenter ref={componentRef}>
        <LargeTitle>{data?.title}</LargeTitle>
        <LargeImagePart
          onClick={() => {
            setallimg(true);
          }}
        >
          <ThumbImg src={data?.thumbnail}></ThumbImg>
          <RightImage>
            <OtherImg
              src={
                data?.metadata.images[0]
                  ? data?.metadata.images[0]
                  : '/img/default.png'
              }
            ></OtherImg>
            <OtherImg
              src={
                data?.metadata.images[1]
                  ? data?.metadata.images[1]
                  : '/img/default.png'
              }
            ></OtherImg>
            <OtherImg
              src={
                data?.metadata.images[2]
                  ? data?.metadata.images[2]
                  : '/img/default.png'
              }
            ></OtherImg>
            <OtherImg
              src={
                data?.metadata.images[3]
                  ? data?.metadata.images[3]
                  : '/img/default.png'
              }
            ></OtherImg>
          </RightImage>
        </LargeImagePart>
        <LargeType>
          {data?.metadata.type +
            ' stay in ' +
            data?.address.City +
            ', ' +
            data?.address.Country}
        </LargeType>
        <LargeHouseInfo>
          {data?.metadata.bedInfo.Guests +
            ' guests · ' +
            data?.metadata.bedInfo.Bedrooms +
            ' bedrooms · ' +
            data?.metadata.bedInfo.Beds +
            ' beds · ' +
            data?.metadata.bedInfo.Bathrooms +
            ' bathrooms'}
        </LargeHouseInfo>
        <GetAllOwnerBookingListing />
        <LargeCenterLR>
          <LargeFac>
            <LargeType>What this place offers?</LargeType>
            <LargeFacp>
              {trueKeys.map((key) => (
                <LargeHousea key={key}>{key}</LargeHousea>
              ))}
            </LargeFacp>
            <LargeTitle2>{'Hosted by ' + data?.owner}</LargeTitle2>
            <LargeTime>
              {'Published in ' + dayjs(data?.postedOn).format('YYYY-DD-MM')}
            </LargeTime>
            <LargeReviweInfo>
              <LargeReviewBlock>
                <LargeReviewscore>{data?.score.toFixed(2)}</LargeReviewscore>
                <Rating
                  name='custom-rating'
                  value={data?.score}
                  precision={0.2}
                  size='small'
                  readOnly
                  sx={{ color: 'black' }} // 使用sx属性添加样式
                />
              </LargeReviewBlock>
              <LargeReviewBlock>
                <LargeReviewtxt>{data?.reviews.length}</LargeReviewtxt>
                <LargeReviewtxt2>Reviews</LargeReviewtxt2>
              </LargeReviewBlock>
            </LargeReviweInfo>
          </LargeFac>
          <LargeBook>
            <TotalPrice>
              {OrderCheckin && OrderCheckout
                ? `${(inDistance * Number(data.price)).toFixed(
                    2
                  )} AUD total for`
                : `${Number(data.price).toFixed(2)} AUD per night`}
            </TotalPrice>
            <DateBookLarge>
              <DateCheckBlock>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label='Checkin Date'
                      value={OrderCheckin}
                      onChange={(date) => {
                        if (date) handleCheckinChange(date);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </DateCheckBlock>
              <DateCheckBlock>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label='End Date'
                      value={OrderCheckout}
                      onChange={(date) => {
                        if (date) handleCheckoutChange(date);
                      }}
                      shouldDisableDate={shouldDisableDateCheckOut}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </DateCheckBlock>
            </DateBookLarge>
            <TimeTip>
              {data.availability.map((key, index) => (
                <div key={index}>
                  <AvailableTime>
                    {'Available Range ' + (index + 1) + ':'}
                  </AvailableTime>
                  <AvailableTime>
                    {'From ' +
                      dayjs(key.startDate).format('MM/DD/YYYY') +
                      ' to ' +
                      dayjs(key.endDate).format('MM/DD/YYYY')}
                  </AvailableTime>
                </div>
              ))}
            </TimeTip>
            <InvalidDate>{errorContent}</InvalidDate>
            <CheckPart>
              <ReserveLarge onClick={Reverse} disabled={vaildReserve}>
                Reserve
              </ReserveLarge>
              <FinalPriceLarge>
                <FPLL>Total</FPLL>
                <FPLR>
                  {'$' + (inDistance * Number(data.price)).toFixed(2) + ' AUD'}
                </FPLR>
              </FinalPriceLarge>
            </CheckPart>
          </LargeBook>
        </LargeCenterLR>
        <LargeAddress>
          Full Address:
          {' ' +
            data?.address.Street +
            ', ' +
            data?.address.City +
            ', ' +
            data?.address.State +
            ', ' +
            data?.address.Country +
            ', ' +
            data?.address.Postcode}
        </LargeAddress>
        <LargeReviewPart>
          {data.reviews.map((item, index) => (
            <ReviewEachBlockLarge key={index}>
              <ReviewHeaderLarge>
                <ReviewerLarge>{item.owner}</ReviewerLarge>
                <Rating
                  name='custom-rating'
                  value={item.score}
                  precision={0.5}
                  size='small'
                  readOnly
                  sx={{ color: 'black' }} // 使用sx属性添加样式
                />
              </ReviewHeaderLarge>
              <ReviewContentLarge>{item.content}</ReviewContentLarge>
              <ReviewDateSmall>
                {dayjs(item.time).format('MM/DD/YYYY')}
              </ReviewDateSmall>
            </ReviewEachBlockLarge>
          ))}
        </LargeReviewPart>
      </SpecificCenter>
    </LargeHomePagecss>
  );
  return conponment;
};
