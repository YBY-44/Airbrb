// src/components/HomePage.js
// import { type } from 'os';
// import { title } from 'process';
import { styled } from '@mui/material';
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  LabelHTMLAttributes,
  useContext,
} from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  LogoutModel,
  meetError,
  SmallHomePagecss,
  SmallHomeHead,
  LargeHomeHeadLogo,
  LargeHomeHeadLogoContent,
  LargeProfile,
  LargeProfileLeftImage,
  LargeProfileOuter,
  LargeProfileRightImage,
  LogoutModelHost,
  SmallBottomButtonOuter,
  SmallButtomButton1,
  SwitchContent,
  SmallHomeBottom,
  ErrorContext,
} from '../App';
import {
  callAPIget,
  CallAPIPostWithToken,
  callAPIput,
  HoverImage,
} from './API';
import { GetAllOwnerListing, GetAllBookingRequest } from './get_all_listing';
type SnackbarData = {
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
};
export const getAllReservations = () => {
  console.log('111');
};
const ContentCenterHost = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '10px 0px 30px 0px',
});
const CenterTitleHost = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
});
const HeaderSubtxtHost = styled('p')({
  textAlign: 'start',
  width: '100%',
  height: '35px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  marginLeft: '90px',
  fontSize: '28px',
  letterSpacing: '0.2px',
  fontWeight: '500',
});
const HostContent = styled('div')({
  margin: '20px 10% 0px 10%',
  width: 'auto',
  height: '100%',
  backgroundColor: 'rgb(239, 239, 239)',
  borderRadius: '20px',
  overflow: 'hidden',
  overflowY: 'scroll',
});
export const CreatButton = styled('button')({
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
export const ReservingContent = () => {
  return (
    <ContentCenterHost>
      <CenterTitleHost>
        <HeaderSubtxtHost>Your Resveration</HeaderSubtxtHost>
      </CenterTitleHost>
      <HostContent>
        <GetAllBookingRequest />
      </HostContent>
    </ContentCenterHost>
  );
};
export const HostingContent = () => {
  return (
    <ContentCenterHost>
      <CenterTitleHost>
        <HeaderSubtxtHost>Your Hosting</HeaderSubtxtHost>
      </CenterTitleHost>
      <HostContent>
        <GetAllOwnerListing />
      </HostContent>
    </ContentCenterHost>
  );
};

interface ConfirmCreatProps {
  data: {
    title: string;
    address: {
      City: string;
      Country: string;
      Postcode: string;
      State: string;
      Street: string;
    };
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
  };
  isOpen: boolean;
  close: () => void;
}

const CfmAll = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
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
  height: '600px',
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
const CfmClose = styled('p')({
  alignItems: 'center',
  justifyContent: 'center',
  height: '30px !important',
  margin: '0px',
  marginLeft: '10px',
  cursor: 'pointer',
  display: 'flex',
  border: '1px solid black',
  width: '70px',
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
  height: '480px',
  overflowY: 'scroll',
  textAlign: 'center',
  color: 'rgb(0, 0, 0)',
});
const CfmRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  height: '40px',
  margin: '20px 10% 0px 10%',
  borderBottom: '1px solid rgb(220, 220, 220)',
});
const CfmRowP = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 10% 0px 10%',
  borderBottom: '1px solid rgb(220, 220, 220)',
  '@media (max-width: 480px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 480px)': {
    flexDirection: 'row',
  },
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
const CfmRightttxt = styled('p')({
  textAlign: 'left',
  margin: '0px 10px 10px 10px',
  fontSize: '14px',
  color: 'rgb(85, 85, 85)',
  maxWidth: '100%',
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
  '@media (max-width: 480px)': {
    justifyContent: 'left',
  },
  '@media (min-width: 480px)': {
    justifyContent: 'space-around',
  },
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
const CfmTitleTxt = styled('p')({
  width: 'auto',
  textAlign: 'left',
  margin: '0px',
  fontSize: '13px',
  color: 'rgb(54, 54, 54)',
});
const CfmGuestBlock = styled('div')({
  margin: '0px 10px 0px 0px',
  alignItems: 'center',
  width: 'auto',
  display: 'flex',
});
const CfmHead = styled('p')({
  fontSize: '20px',
  margin: '20px 60px 0px 0px',
  width: '100%',
  height: '50px',
  textAlign: 'center',
  letterSpacing: '0.2px',
  color: 'rgb(48, 48, 48)',
});
export const ConfirmCreat: React.FC<ConfirmCreatProps> = ({
  data,
  isOpen,
  close,
}) => {
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { snackbarData, setOpenSnackbar } = ErrorValue;
  const navigate = useNavigate();
  const CreatHosting = () => {
    const token = localStorage.getItem('token') || '';
    CallAPIPostWithToken('listings/new', data, token)
      .then(() => {
        setOpenSnackbar({ severity: 'success', message: 'Creat successful!' });
        console.log('success');
        const userId = localStorage.getItem('LoggedUserEmail');
        navigate(`/user/${userId}/hosting/myhosting`);
        close();
      })
      .catch((error) => {
        setOpenSnackbar({ severity: 'success', message: meetError(error) });
      });
  };

  let conponment = <div></div>;
  if (isOpen) {
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
    const trueKeys = Object.keys(items).filter((key) => {
      return items[key] === true;
    });
    if (trueKeys.length === 0) {
      trueKeys.push('No additional Facilities');
    }
    conponment = (
      <CfmAll>
        <CfmBack></CfmBack>
        <CfmContent>
          <CfmHeight>
            <CfmClose onClick={close}>Back</CfmClose>
            <CfmHead>Hosting Information</CfmHead>
          </CfmHeight>
          <CfmCenterContent>
            <CfmRow>
              <CfmLefttxt>Hosting Type</CfmLefttxt>
              <CfmRightttxt>{data.metadata.type}</CfmRightttxt>
            </CfmRow>
            <CfmRowCol>
              <CfmLefttxt>Hosting Address</CfmLefttxt>
              <CfmRightttxt>{address}</CfmRightttxt>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Guesting capacity</CfmLefttxt>
              <CfmGuest>
                <CfmGuestBlock>
                  <CfmTitleTxt>Guest</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Guests}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <CfmTitleTxt>Bathroom</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Bathrooms}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <CfmTitleTxt>Bedroom</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Bedrooms}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <CfmTitleTxt>Bed</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Beds}</CfmValuettxt>
                </CfmGuestBlock>
              </CfmGuest>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Facilities</CfmLefttxt>
              <CfmFac>
                {trueKeys.map((key) => (
                  <CfmValuettxt key={key}>{key}</CfmValuettxt>
                ))}
              </CfmFac>
            </CfmRowCol>
            <CfmRowP>
              <CfmLefttxt>Hosting Title</CfmLefttxt>
              <CfmRightttxt>{data.title}</CfmRightttxt>
            </CfmRowP>
            <CfmRowP>
              <CfmLefttxt>Hosting Price</CfmLefttxt>
              <CfmRightttxt>${data.price} / Night</CfmRightttxt>
            </CfmRowP>
            <CfmRowCol>
              <CfmLefttxt>Hosting Thumbnail</CfmLefttxt>
              <img src={data.thumbnail}></img>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Hosting Images</CfmLefttxt>
              <CfmValuettxt>Upcomming Soon...</CfmValuettxt>
            </CfmRowCol>
          </CfmCenterContent>
          <CfmBottom>
            <CreatButton onClick={CreatHosting}>Creat Now</CreatButton>
          </CfmBottom>
        </CfmContent>
      </CfmAll>
    );
    console.log(data);
  }
  return isOpen ? conponment : null;
};
export const ConfirmEdit: React.FC<ConfirmCreatProps> = ({
  data,
  isOpen,
  close,
}) => {
  const { HostingId } = useParams();
  const navigate = useNavigate();
  const EditHosting = () => {
    const token = localStorage.getItem('token') || '';
    callAPIput('listings/' + HostingId, data, token)
      .then(() => {
        console.log('success');
        close();
        const userId = localStorage.getItem('LoggedUserEmail');
        navigate(`/user/${userId}/hosting/myhosting`);
        alert('Modify hosting successful !');
      })
      .catch((error) => meetError(error));
  };

  let conponment = <div></div>;
  if (isOpen) {
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
    const trueKeys = Object.keys(items).filter((key) => {
      return items[key] === true;
    });
    if (trueKeys.length === 0) {
      trueKeys.push('No additional Facilities');
    }
    const CfmAll = styled('div')({
      width: '100%',
      height: '100%',
      position: 'absolute',
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
      height: '600px',
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
    const CfmClose = styled('p')({
      alignItems: 'center',
      justifyContent: 'center',
      height: '30px !important',
      margin: '0px',
      marginLeft: '10px',
      cursor: 'pointer',
      display: 'flex',
      border: '1px solid black',
      width: '70px',
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
      height: '480px',
      overflowY: 'scroll',
      textAlign: 'center',
      color: 'rgb(0, 0, 0)',
    });
    const CfmRow = styled('div')({
      display: 'flex',
      justifyContent: 'space-between',
      height: '40px',
      margin: '20px 10% 0px 10%',
      borderBottom: '1px solid rgb(220, 220, 220)',
    });
    const CfmRowP = styled('div')({
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px 10% 0px 10%',
      borderBottom: '1px solid rgb(220, 220, 220)',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
      },
      '@media (min-width: 480px)': {
        flexDirection: 'row',
      },
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
    const CfmRightttxt = styled('p')({
      textAlign: 'left',
      margin: '0px 10px 10px 10px',
      fontSize: '14px',
      color: 'rgb(85, 85, 85)',
      maxWidth: '100%',
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
      '@media (max-width: 480px)': {
        justifyContent: 'left',
      },
      '@media (min-width: 480px)': {
        justifyContent: 'space-around',
      },
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
    const CfmTitleTxt = styled('p')({
      width: 'auto',
      textAlign: 'left',
      margin: '0px',
      fontSize: '13px',
      color: 'rgb(54, 54, 54)',
    });
    const CfmGuestBlock = styled('div')({
      margin: '0px 10px 0px 0px',
      alignItems: 'center',
      width: 'auto',
      display: 'flex',
    });
    const CfmHead = styled('p')({
      fontSize: '20px',
      margin: '20px 60px 0px 0px',
      width: '100%',
      height: '50px',
      textAlign: 'center',
      letterSpacing: '0.2px',
      color: 'rgb(48, 48, 48)',
    });
    conponment = (
      <CfmAll>
        <CfmBack></CfmBack>
        <CfmContent>
          <CfmHeight>
            <CfmClose onClick={close}>Back</CfmClose>
            <CfmHead>Hosting Information</CfmHead>
          </CfmHeight>
          <CfmCenterContent>
            <CfmRow>
              <CfmLefttxt>Hosting Type</CfmLefttxt>
              <CfmRightttxt>{data.metadata.type}</CfmRightttxt>
            </CfmRow>
            <CfmRowCol>
              <CfmLefttxt>Hosting Address</CfmLefttxt>
              <CfmRightttxt>{address}</CfmRightttxt>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Guesting capacity</CfmLefttxt>
              <CfmGuest>
                <CfmGuestBlock>
                  <CfmTitleTxt>Guest</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Guests}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <CfmTitleTxt>Bathroom</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Bathrooms}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <CfmTitleTxt>Bedroom</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Bedrooms}</CfmValuettxt>
                </CfmGuestBlock>
                <CfmGuestBlock>
                  <CfmTitleTxt>Bed</CfmTitleTxt>
                  <CfmValuettxt>{data.metadata.bedInfo.Beds}</CfmValuettxt>
                </CfmGuestBlock>
              </CfmGuest>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Facilities</CfmLefttxt>
              <CfmFac>
                {trueKeys.map((key) => (
                  <CfmValuettxt key={key}>{key}</CfmValuettxt>
                ))}
              </CfmFac>
            </CfmRowCol>
            <CfmRowP>
              <CfmLefttxt>Hosting Title</CfmLefttxt>
              <CfmRightttxt>{data.title}</CfmRightttxt>
            </CfmRowP>
            <CfmRowP>
              <CfmLefttxt>Hosting Price</CfmLefttxt>
              <CfmRightttxt>${data.price} / Night</CfmRightttxt>
            </CfmRowP>
            <CfmRowCol>
              <CfmLefttxt>Hosting Thumbnail</CfmLefttxt>
              <img src={data.thumbnail}></img>
            </CfmRowCol>
            <CfmRowCol>
              <CfmLefttxt>Hosting Images</CfmLefttxt>
              <CfmValuettxt>Upcomming Soon...</CfmValuettxt>
            </CfmRowCol>
          </CfmCenterContent>
          <CfmBottom>
            <CreatButton onClick={EditHosting}>Confirm Edit</CreatButton>
          </CfmBottom>
        </CfmContent>
      </CfmAll>
    );
    console.log(data);
  }
  return isOpen ? conponment : null;
};
export const CreatChannelOverall = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'scroll',
  zIndex: '0',
});
export const HiddenConfirmCreat = styled('div')({
  width: '100%',
  height: '100%',
});
export const CreatNewHeader = styled('div')({
  height: '80px',
  width: '100%',
  justifyContent: 'space-between',
  display: 'flex',
});
export const CreatLogo = styled('div')({
  display: 'flex',
  height: '100%',
});
export const HeaderRightButtonPart = styled('div')({
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '120px',
});
export const HeaderRightButtonself = styled('p')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: '1px solid black',
  width: '70px',
  fontWeight: '500',
  letterSpacing: '0.2px',
  backgroundColor: 'rgb(255, 255, 255)',
  margin: '20px 0px 10px 0px',
  padding: '0px 10px 0px 10px',
  borderRadius: '20px',
  height: '40px',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 240)',
  },
});
export const QButton = styled('div')({
  width: '100%',
  paddingBottom: '30px',
  borderBottom: '1px solid gainsboro',
  display: 'flex',
  justifyContent: 'center',
});
const Q = styled('div')({
  width: '100%',
  paddingBottom: '30px',
  borderBottom: '1px solid gainsboro',
});
const Q1 = styled('div')({
  width: '100%',
  paddingBottom: '30px',
  borderBottom: '1px solid gainsboro',
});
const QoneQuestionPart = styled('p')({
  marginLeft: '10%',
  marginTop: '20px',
  width: '50%',
  fontSize: '30px',
  fontWeight: '500',
  textAlign: 'left',
});
const QoneAnswerPart = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '80%',
  marginLeft: '10%',
});
const QoneSelect = styled('input')({
  display: 'none',
});
interface QoneShowSelectProps extends LabelHTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
}
const QoneShowSelect = styled('label')<QoneShowSelectProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30%;
  min-width: 170px;
  max-width: 300px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid rgb(168, 168, 168);
  margin: 10px;
  font-weight: 400;
  transition: border 0.1s;
  cursor: pointer;
  user-select: none;

  &:hover {
    border: 1.5px solid rgb(0, 0, 0);
  }

  ${({ checked }) =>
    checked &&
    `
    border: 2px solid rgb(0, 0, 0);
  `}
`;

const QfourShowSelect = styled('label')<QoneShowSelectProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30%;
  min-width: 170px;
  max-width: 300px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid rgb(168, 168, 168);
  margin: 10px;
  font-weight: 400;
  transition: border 0.1s;
  user-select: none;
  cursor: pointer;
  &:hover {
    border: 1.5px solid rgb(0, 0, 0);
  }

  ${({ checked }) =>
    checked &&
    `
  border: 2px solid rgb(0, 0, 0);
  background-color: rgb(245, 245, 245);
`}
`;

const CreateError = styled('p')({
  fontSize: '14px',
  width: '90%',
  padding: '0px',
  paddingTop: '10px',
  margin: '0px',
  color: 'rgb(255, 0, 0)',
  paddingLeft: '15px',
});
const QtwoQ = styled('p')({
  margin: '0px',
  padding: '0px',
  marginLeft: '10%',
  marginTop: '20px',
  width: '100%',
  fontSize: '20px',
  fontWeight: '500',
  textAlign: 'left',
});
const QtwoQsub = styled('p')({
  fontFamily: 'system-ui',
  padding: '0px',
  margin: '5px 0px 20px 0px',
  marginLeft: '10%',
  width: '70%',
  fontSize: '14px',
  fontWeight: '300',
  textAlign: 'left',
  color: 'rgb(131, 131, 131)',
});

const QtwoQasw = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '80%',
  marginLeft: '10%',
  border: '1px solid rgb(178, 178, 178)',
  borderRadius: '10px',
});
const QtwoQaswrow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '5px 5px 0px 10px',
  borderBottom: '1px solid rgb(178, 178, 178)',
  '&:focus-within': {
    outline: '1.5px solid black',
    borderRadius: '10px',
  },
});
const QtwoQaswLable = styled('label')({
  fontFamily: 'system-ui',
  padding: '0px',
  color: 'rgb(110, 110, 110)',
  fontSize: '11px',
  fontWeight: '300',
  letterSpacing: '0.2px',
});
const QtwoQaswInput = styled('input')({
  border: '0px',
  paddingLeft: '5px',
  margin: '0px 0px 5px 0px',
  fontSize: '14px',
  fontFamily: 'system-ui',
  fontWeight: '300',
  letterSpacing: '0.2px',
});
const Q3Qasw = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '80%',
  marginLeft: '10%',
  borderRadius: '10px',
});
const Q3Qaswrow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '75px',
  padding: '5px 5px 0px 10px',
  borderBottom: '1px solid rgb(178, 178, 178)',
  alignItems: 'center',
});
const Q3QaswLable = styled('label')({
  fontFamily: 'system-ui',
  padding: '0px',
  margin: '0px',
  color: 'rgb(0,0,0)',
  fontSize: '18px',
  fontWeight: '300',
  letterSpacing: '0.3px',
});
const Q3QaswInput = styled('input')({
  paddingLeft: '9px',
  margin: '0px 0px 5px 0px',
  fontSize: '18px',
  fontFamily: 'system-ui',
  fontWeight: '300',
  letterSpacing: '0.2px',
  height: '40px',
  width: '40px',
  border: '1px solid black',
  borderRadius: '10px',
});
const Q4q = styled('p')({
  margin: '0px',
  padding: '0px',
  marginLeft: '10%',
  marginTop: '20px',
  width: '80%',
  fontSize: '25px',
  fontWeight: '500',
  textAlign: 'left',
});
const Q5A = styled('textarea')({
  width: '80%',
  height: '50px',
  borderRadius: '5px',
  padding: '5px 10px 5px 10px',
  outline: 'none',
  resize: 'none',
});
const Q6Ap = styled('p')({
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  fontSize: '70px',
  height: '100px',
});
const Q6Asmall = styled('p')({
  fontWeight: '500',
  display: 'flex',
  alignItems: 'end',
  fontSize: '20px',
  height: '100px',
});
const Q6aInput = styled('input')({
  fontWeight: '500',
  fontSize: '70px',
  height: '100px',
  width: '240px',
  border: '0px',
});
const Q6aDiv = styled('div')({
  justifyContent: 'center',
  display: 'flex',
  width: '100%',
  height: '100px',
});
const Q7aDiv = styled('div')({
  display: 'flex',
  marginLeft: '15%',
  justifyContent: 'center',
  alignItems: 'center',
  width: '70%',
  height: '300px',
});

const LasteachImage = styled('div')({
  display: 'flex',
  marginTop: '30px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '300px',
  overflow: 'hidden',
});
const LengthDetector = styled('p')({
  fontWeight: '500',
  marginLeft: '10%',
  marginTop: '10px',
  fontSize: '12px',
});
const UploadButton = styled('button')({
  border: '1px dashed black',
  height: '100%',
  aspectRatio: '1 / 1',
  color: 'rgb(94, 94, 94)',
  backgroundColor: 'white',
  textDecoration: 'underline',
  '&:hover': {
    color: 'rgb(20, 20, 20)',
  },
});
const UploadIMG = styled('img')({
  height: '100%',
  width: 'auto',
  overflow: 'hidden',
  objectFit: 'cover',
  color: 'rgb(94, 94, 94)',
  backgroundColor: 'white',
  textDecoration: 'underline',
  border: '1px dashed black',
  cursor: 'pointer',
  aspectRatio: '1 / 1',
  '&:hover': {
    color: 'rgb(20, 20, 20)',
  },
});
interface ListingContent {
  title: string;
  // owner: string;
  address: {
    City: string;
    Country: string;
    Postcode: string;
    State: string;
    Street: string;
  };
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
  // reviews: {
  //   score: number;
  //   content: string;
  // }[];
}

export const CreateHosting = () => {
  const RefT = useRef<HTMLInputElement | null>(null);
  const RefFile = useRef<HTMLInputElement | null>(null);
  const HandleT = () => {
    if (RefT.current) {
      RefT.current.click();
    }
  };
  const HandleFile = () => {
    if (RefFile.current) {
      RefFile.current.click();
    }
  };
  const initialListingContent: ListingContent = {
    title: '',
    // owner: '',
    address: {
      City: '',
      Country: '',
      Postcode: '',
      State: '',
      Street: '',
    },
    price: '',
    thumbnail: '',
    metadata: {
      type: '',
      bedInfo: {
        Guests: '1',
        Bedrooms: '1',
        Beds: '1',
        Bathrooms: '1',
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
    // reviews: [],
  };
  const [data, setData] = useState<ListingContent>(initialListingContent);
  const [isOpen, setOpen] = useState(false);
  const SelfClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [lengthOfTitle, setlength] = useState(0);
  const [HostingType, setType] = useState('');
  const [Country, setCountry] = useState('');
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };
  const [Street, setStreet] = useState('');
  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };
  const [City, setCity] = useState('');
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  const [State, setState] = useState('');
  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const [Postcode, setPostcode] = useState('');
  const handlePostcodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostcode(event.target.value);
  };
  const [Guest, setGuest] = useState('');
  const handleGuestChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuest(event.target.value);
  };
  const [Bedroom, setBedroom] = useState('');
  const handleBedroomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBedroom(event.target.value);
  };
  const [Bed, setBed] = useState('');
  const handleBedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBed(event.target.value);
  };
  const [Bathroom, setBathroom] = useState('');
  const handleBathroomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBathroom(event.target.value);
  };
  const [Thumbil, setThumbil] = useState('');
  const [isAirConditioningChecked, setAirConditioningChecked] = useState(false);
  const [isWifiChecked, setWifiChecked] = useState(false);
  const [isTVChecked, setTVChecked] = useState(false);
  const [isKitchenChecked, setKitchenChecked] = useState(false);
  const [isFreeParkingChecked, setFreeParkingChecked] = useState(false);
  const [isWashingmachineChecked, setWashingmachineChecked] = useState(false);
  const [Title, setTitle] = useState('');
  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
    setlength(event.target.value.length);
  };
  const [Prise, setPrice] = useState('');
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };
  const ChangeType = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id) {
      setType(target.id);
    }
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myhosting`);
  };
  const [ErrorText1, setErrorText1] = useState(false);
  const [ErrorText2, setErrorText2] = useState(false);
  const [ErrorText3, setErrorText3] = useState(false);
  const [ErrorText4, setErrorText4] = useState(false);
  const [ErrorText5, setErrorText5] = useState(false);
  const [ErrorText6, setErrorText6] = useState(false);
  const [ErrorText7, setErrorText7] = useState(false);
  const setAllfalse = () => {
    setErrorText1(false);
    setErrorText2(false);
    setErrorText3(false);
    setErrorText4(false);
    setErrorText5(false);
    setErrorText6(false);
    setErrorText7(false);
  };
  const [errorContent, setErrorContent] = useState('');
  const scrollToQ1 = useRef<HTMLDivElement | null>(null);
  const scrollToQ2 = useRef<HTMLDivElement | null>(null);
  const scrollToQ3 = useRef<HTMLDivElement | null>(null);
  const scrollToQ4 = useRef<HTMLDivElement | null>(null);
  const scrollToQ5 = useRef<HTMLDivElement | null>(null);
  const scrollToQ6 = useRef<HTMLDivElement | null>(null);
  const scrollToQ7 = useRef<HTMLDivElement | null>(null);

  const [AllImaegsString, setSelectedImageString] = useState<string[]>([]);
  const convertImageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const base64String = event.target.result;
          resolve(base64String);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const convertAllImagesToBase64 = (imageFiles: File[]) => {
    const base64Promises = imageFiles.map((file) => convertImageToBase64(file));
    return Promise.all(base64Promises);
  };
  const isValidBase64Image = (base64String: string) => {
    if (!base64String.startsWith('data:image/')) {
      console.log('1');
      return false; // 不是有效的 Base64 图像数据
    }
    try {
      if (base64String.trim() === '') {
        console.log('1');
        return false;
      }
      const datas = base64String;
      const realdata = String(datas.split(',')[1]);
      // Decode the base64 string
      const decodedData = btoa(atob(realdata));
      // return /^[\w+/]*[=]*$/.test(decodedData);
      return decodedData === realdata;
    } catch (error) {
      console.log(error);
      return false; // Invalid base64 or unable to decode
    }
  };
  const AddThumbil = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // 获取第一个文件
      const reader = new FileReader();
      if (file) {
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            const base64Data = event.target.result as string;
            if (isValidBase64Image(base64Data)) {
              // 合法的文件
              setAllfalse();
              console.log(base64Data);
              setThumbil(base64Data);
            } else {
              // 不合法的文件
              setAllfalse();
              setErrorContent('Not a valid image!');
              setErrorText7(true);
            }
          }
        };

        reader.onerror = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            console.error('Error reading file:', event.target.error);
            setAllfalse();
            setErrorContent('Error reading file');
            setErrorText7(true);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const [fileInputValue, setFileInputValue] = useState('');
  const AddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target) {
              const base64Data = event.target.result as string;
              if (isValidBase64Image(base64Data)) {
                resolve(file);
              } else {
                reject(new Error('Not a valid image!'));
              }
            }
          };
          reader.onerror = (event: ProgressEvent<FileReader>) => {
            if (event.target) {
              console.error('Error reading file:', event.target.error);
              reject(new Error('Error reading file'));
            }
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((results) => {
          const validFiles: File[] = results as File[];
          setAllfalse();
          convertAllImagesToBase64(validFiles)
            .then((base64Strings) => {
              const base64array = base64Strings as string[];
              setSelectedImageString([...AllImaegsString, ...base64array]);
            })
            .catch((error) => {
              console.error(error);
            });
          setFileInputValue('');
        })
        .catch((error) => {
          setAllfalse();
          setErrorContent(error);
          setErrorText7(true);
        });
    }
  };
  const RemoveImage = (index: string) => {
    // 创建新的图片列表，排除要移除的图片
    const updatedImagesString = AllImaegsString.filter(
      (_, i) => String(i) !== index
    );
    setSelectedImageString(updatedImagesString);
  };
  const scrollToElement = (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    if (ref.current) {
      console.log(ref.current);
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const CreateNow = () => {
    const pricePattern = /^[1-9]\d{0,4}$/;
    let Confirmflag = true;
    if (data) {
      data.title = String(Title);
      data.price = String(Prise);
      data.title = String(Title);
      data.price = String(Prise);
      data.metadata.type = String(HostingType);
      data.address.Country = Country;
      data.address.City = City;
      data.address.Postcode = Postcode;
      data.address.State = State;
      data.address.Street = Street;
      data.metadata.bedInfo.Bedrooms = Bedroom || '1';
      data.metadata.bedInfo.Beds = Bed || '1';
      data.metadata.bedInfo.Bathrooms = Bedroom || '1';
      data.metadata.bedInfo.Guests = Guest || '1';
      data.metadata.otherInfo.AirConditioning = isAirConditioningChecked;
      data.metadata.otherInfo.FreeParking = isFreeParkingChecked;
      data.metadata.otherInfo.Kitchen = isKitchenChecked;
      data.metadata.otherInfo.TV = isTVChecked;
      data.metadata.otherInfo.WashingMachine = isWashingmachineChecked;
      data.metadata.otherInfo.WiFi = isWifiChecked;
      data.thumbnail = Thumbil;
      if (data.metadata.type.length === 0) {
        console.log('no type');
        Confirmflag = false;
        setAllfalse();
        setErrorContent('You must select one type for your hosting');
        setErrorText1(true);
        scrollToElement(scrollToQ1);
      }
      if (Confirmflag && data.address) {
        setAllfalse();
        const letterPattern = /[a-zA-Z]+/;
        const numericPattern = /^[0-9]+$/;
        if (!letterPattern.test(Country)) {
          console.log('invalid country');
          setErrorContent('Your country name is invalid');
          Confirmflag = false;
        } else if (!letterPattern.test(Street)) {
          setErrorContent('Your street name is invalid');
          Confirmflag = false;
          console.log('invalid country');
        } else if (!letterPattern.test(City)) {
          setErrorContent('Your city name is invalid');
          Confirmflag = false;
          console.log('invalid country');
        } else if (!letterPattern.test(State)) {
          setErrorContent('Your state name is invalid');
          Confirmflag = false;
          console.log('invalid country');
        } else if (!numericPattern.test(Postcode)) {
          setErrorContent('Your Postcode name is invalid');
          Confirmflag = false;
          console.log('invalid postcode');
        }
        if (!Confirmflag) {
          setErrorText2(true);
          console.log(scrollToQ2);
          scrollToElement(scrollToQ2);
        }
      }
      if (Confirmflag && data.title.length === 0) {
        console.log('no title');
        setAllfalse();
        setErrorContent('You must set a title for your hosting');
        setErrorText5(true);
        scrollToElement(scrollToQ5);
        Confirmflag = false;
      }
      if (Confirmflag && !pricePattern.test(data.price)) {
        console.log('invalid Price');
        setAllfalse();
        setErrorContent('Your price must between 1 to 99999');
        setErrorText6(true);
        Confirmflag = false;
        scrollToElement(scrollToQ6);
      }
      if (Confirmflag && Thumbil === '') {
        setAllfalse();
        setErrorContent('You must show your hosting pictures to us');
        setErrorText7(true);
        Confirmflag = false;
        scrollToElement(scrollToQ7);
      }
      if (Confirmflag) {
        data.metadata.images = AllImaegsString;
        setOpen(true);
        console.log(data);
      }
      console.log(data);
    }
  };
  return (
    <CreatChannelOverall>
      <HiddenConfirmCreat>
        <ConfirmCreat data={data} isOpen={isOpen} close={SelfClose} />
      </HiddenConfirmCreat>
      <CreatNewHeader>
        <CreatLogo>
          <LargeHomeHeadLogoContent src='/img/logo_p.png'></LargeHomeHeadLogoContent>
        </CreatLogo>
        <HeaderRightButtonPart>
          <HeaderRightButtonself onClick={goesHost}>Exit</HeaderRightButtonself>
        </HeaderRightButtonPart>
      </CreatNewHeader>
      <Q1 ref={scrollToQ1}>
        <QoneQuestionPart>
          Which of these best describes your place?
        </QoneQuestionPart>
        <QoneAnswerPart>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='House'
            onClick={ChangeType}
          ></QoneSelect>
          <QoneShowSelect htmlFor='House' checked={HostingType === 'House'}>
            House
          </QoneShowSelect>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='Apartment'
            onClick={ChangeType}
          />
          <QoneShowSelect
            htmlFor='Apartment'
            checked={HostingType === 'Apartment'}
          >
            Apartment
          </QoneShowSelect>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='Cabin'
            onClick={ChangeType}
          />
          <QoneShowSelect htmlFor='Cabin' checked={HostingType === 'Cabin'}>
            Cabin
          </QoneShowSelect>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='Hotel'
            onClick={ChangeType}
          />
          <QoneShowSelect htmlFor='Hotel' checked={HostingType === 'Hotel'}>
            Hotel
          </QoneShowSelect>
        </QoneAnswerPart>
        {ErrorText1 && <CreateError>{errorContent}</CreateError>}
      </Q1>
      <Q ref={scrollToQ2}>
        <QtwoQ>Tell us about your address</QtwoQ>
        <QtwoQsub>
          Your address is only shared with guests after they’ve made a
          reservation.
        </QtwoQsub>
        <QtwoQasw>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Country/Region</QtwoQaswLable>
            <QtwoQaswInput
              id='country'
              value={Country}
              onChange={handleCountryChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Street address</QtwoQaswLable>
            <QtwoQaswInput
              id='street'
              value={Street}
              onChange={handleStreetChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Suburb/city</QtwoQaswLable>
            <QtwoQaswInput
              id='city'
              value={City}
              onChange={handleCityChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>State/territory</QtwoQaswLable>
            <QtwoQaswInput
              id='state'
              value={State}
              onChange={handleStateChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Postcode</QtwoQaswLable>
            <QtwoQaswInput
              id='postcode'
              value={Postcode}
              onChange={handlePostcodeChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
        </QtwoQasw>
        {ErrorText2 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ3}>
        <QtwoQ>Share some basics about your place</QtwoQ>
        <QtwoQsub>You’ll add more details later, like bed types.</QtwoQsub>
        <Q3Qasw>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Guests</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Guests'
              value={Guest}
              onChange={handleGuestChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Bedrooms</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Bedrooms'
              value={Bedroom}
              onChange={handleBedroomChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Beds</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Beds'
              value={Bed}
              onChange={handleBedChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Bathrooms</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Bathrooms'
              value={Bathroom}
              onChange={handleBathroomChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
        </Q3Qasw>
        {ErrorText3 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ4}>
        <Q4q>Tell guests what your place has to offer</Q4q>
        <QtwoQsub>
          You can add more amenities after you publish your listing.
        </QtwoQsub>
        <QoneAnswerPart>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='WiFi'
            onChange={() => setWifiChecked(!isWifiChecked)}
          />
          <QfourShowSelect htmlFor='WiFi' checked={isWifiChecked}>
            Wi-Fi
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='TV'
            onChange={() => setTVChecked(!isTVChecked)}
          />
          <QfourShowSelect htmlFor='TV' checked={isTVChecked}>
            TV
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Kitchen'
            onChange={() => setKitchenChecked(!isKitchenChecked)}
          />
          <QfourShowSelect htmlFor='Kitchen' checked={isKitchenChecked}>
            Kitchen
          </QfourShowSelect>

          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Washing machine'
            onChange={() => setWashingmachineChecked(!isWashingmachineChecked)}
          />
          <QfourShowSelect
            htmlFor='Washing machine'
            checked={isWashingmachineChecked}
          >
            Washing machine
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Air conditioning'
            onChange={() =>
              setAirConditioningChecked(!isAirConditioningChecked)
            }
          />
          <QfourShowSelect
            htmlFor='Air conditioning'
            checked={isAirConditioningChecked}
          >
            Air conditioning
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Free Parking'
            onChange={() => setFreeParkingChecked(!isFreeParkingChecked)}
          />
          <QfourShowSelect
            htmlFor='Free Parking'
            checked={isFreeParkingChecked}
          >
            Free Parking
          </QfourShowSelect>
        </QoneAnswerPart>
        {ErrorText4 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ5}>
        <Q4q>Now, let‘s give your barn a title</Q4q>
        <QtwoQsub>
          Short titles work best. Have fun with it—you can always change it
          later.
        </QtwoQsub>
        <QoneAnswerPart>
          <Q5A
            id='hosting-title'
            maxLength={32}
            onChange={handleTitleChange}
            value={Title}
          ></Q5A>
        </QoneAnswerPart>
        <LengthDetector>{lengthOfTitle}/32</LengthDetector>
        {ErrorText5 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ6}>
        <Q4q>Now, set your price</Q4q>
        <QtwoQsub>You can change it anytime.</QtwoQsub>
        <Q6aDiv>
          <Q6Ap>$</Q6Ap>
          <Q6aInput
            id='price'
            placeholder='0'
            maxLength={5}
            value={Prise}
            onChange={handlePriceChange}
          ></Q6aInput>
          <Q6Asmall>/day</Q6Asmall>
        </Q6aDiv>
        {ErrorText6 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ7}>
        <Q4q>Add some photos of your barn</Q4q>
        <QtwoQsub>
          You’ll need one photos to get started. This photo would as your
          hosting Thumbnail.
        </QtwoQsub>
        <Q7aDiv>
          <QoneSelect
            id='upload'
            onChange={AddThumbil}
            type='file'
            ref={RefT}
            accept='image/*'
          ></QoneSelect>
          <UploadIMG
            onClick={HandleT}
            src={Thumbil || '/img/addusr.png'}
            alt='Upload from your device'
          ></UploadIMG>
        </Q7aDiv>
        {ErrorText7 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q>
        <Q4q>Add more photos of your barn</Q4q>
        <QtwoQsub>
          This is optional if you want show more of your hosting. You can add
          more or make changes later. The first photo would as your hosting
          Thumbnail.
        </QtwoQsub>
        <Q7aDiv>
          <QoneSelect
            id='upload'
            onChange={AddImage}
            type='file'
            ref={RefFile}
            value={fileInputValue}
            accept='image/*'
          ></QoneSelect>
          <UploadButton onClick={HandleFile}>
            Upload from your device
          </UploadButton>
        </Q7aDiv>
        {AllImaegsString.map((item, index) => (
          <LasteachImage key={index} onClick={() => RemoveImage(String(index))}>
            <HoverImage src={item} alt={`Image ${index}`} />
          </LasteachImage>
        ))}
      </Q>
      <QButton>
        <CreatButton onClick={CreateNow} type='button'>
          Create your hosting
        </CreatButton>
      </QButton>
    </CreatChannelOverall>
  );
};

export const EditHosting = () => {
  const RefT = useRef<HTMLInputElement | null>(null);
  const RefFile = useRef<HTMLInputElement | null>(null);
  const HandleT = () => {
    if (RefT.current) {
      RefT.current.click();
    }
  };
  const HandleFile = () => {
    if (RefFile.current) {
      RefFile.current.click();
    }
  };
  const initial = {
    title: '',
    // owner: '',
    address: {
      City: '',
      Country: '',
      Postcode: '',
      State: '',
      Street: '',
    },
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
    // reviews: [],
  };
  const { HostingId } = useParams();
  const [data, setData] = useState<ListingContent | null>(null);
  const [isOpen, setOpen] = useState(false);
  const token = localStorage.getItem('token') || '';
  const SelfClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [lengthOfTitle, setlength] = useState(0);
  const [HostingType, setType] = useState('');
  const [Country, setCountry] = useState('');
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };
  const [Street, setStreet] = useState('');
  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };
  const [City, setCity] = useState('');
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  const [State, setState] = useState('');
  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const [Postcode, setPostcode] = useState('');
  const handlePostcodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostcode(event.target.value);
  };
  const [Guest, setGuest] = useState('');
  const handleGuestChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuest(event.target.value);
  };
  const [Bedroom, setBedroom] = useState('');
  const handleBedroomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBedroom(event.target.value);
  };
  const [Bed, setBed] = useState('');
  const handleBedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBed(event.target.value);
  };
  const [Bathroom, setBathroom] = useState('');
  const handleBathroomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBathroom(event.target.value);
  };
  const [Thumbil, setThumbil] = useState('');
  const [isAirConditioningChecked, setAirConditioningChecked] = useState(false);
  const [isWifiChecked, setWifiChecked] = useState(false);
  const [isTVChecked, setTVChecked] = useState(false);
  const [isKitchenChecked, setKitchenChecked] = useState(false);
  const [isFreeParkingChecked, setFreeParkingChecked] = useState(false);
  const [isWashingmachineChecked, setWashingmachineChecked] = useState(false);
  const [Title, setTitle] = useState('');
  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
    setlength(event.target.value.length);
  };
  const [Prise, setPrice] = useState('');
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };
  const ChangeType = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id) {
      setType(target.id);
    }
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myhosting`);
  };
  const [ErrorText1, setErrorText1] = useState(false);
  const [ErrorText2, setErrorText2] = useState(false);
  const [ErrorText3, setErrorText3] = useState(false);
  const [ErrorText4, setErrorText4] = useState(false);
  const [ErrorText5, setErrorText5] = useState(false);
  const [ErrorText6, setErrorText6] = useState(false);
  const [ErrorText7, setErrorText7] = useState(false);
  const setAllfalse = () => {
    setErrorText1(false);
    setErrorText2(false);
    setErrorText3(false);
    setErrorText4(false);
    setErrorText5(false);
    setErrorText6(false);
    setErrorText7(false);
  };
  const [errorContent, setErrorContent] = useState('');
  const scrollToQ1 = useRef<HTMLDivElement | null>(null);
  const scrollToQ2 = useRef<HTMLDivElement | null>(null);
  const scrollToQ3 = useRef<HTMLDivElement | null>(null);
  const scrollToQ4 = useRef<HTMLDivElement | null>(null);
  const scrollToQ5 = useRef<HTMLDivElement | null>(null);
  const scrollToQ6 = useRef<HTMLDivElement | null>(null);
  const scrollToQ7 = useRef<HTMLDivElement | null>(null);

  const [AllImaegsString, setSelectedImageString] = useState<string[]>([]);
  const convertImageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const base64String = event.target.result;
          resolve(base64String);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const convertAllImagesToBase64 = (imageFiles: File[]) => {
    const base64Promises = imageFiles.map((file) => convertImageToBase64(file));
    return Promise.all(base64Promises);
  };
  const isValidBase64Image = (base64String: string) => {
    if (!base64String.startsWith('data:image/')) {
      console.log('1');
      return false; // 不是有效的 Base64 图像数据
    }
    try {
      if (base64String.trim() === '') {
        console.log('1');
        return false;
      }
      const datas = base64String;
      const realdata = String(datas.split(',')[1]);
      // Decode the base64 string
      const decodedData = btoa(atob(realdata));
      // return /^[\w+/]*[=]*$/.test(decodedData);
      return decodedData === realdata;
    } catch (error) {
      console.log(error);
      return false; // Invalid base64 or unable to decode
    }
  };
  const AddThumbil = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // 获取第一个文件
      const reader = new FileReader();
      if (file) {
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            const base64Data = event.target.result as string;
            if (isValidBase64Image(base64Data)) {
              // 合法的文件
              setAllfalse();
              console.log(base64Data);
              setThumbil(base64Data);
            } else {
              // 不合法的文件
              setAllfalse();
              setErrorContent('Not a valid image!');
              setErrorText7(true);
            }
          }
        };

        reader.onerror = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            console.error('Error reading file:', event.target.error);
            setAllfalse();
            setErrorContent('Error reading file');
            setErrorText7(true);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const [fileInputValue, setFileInputValue] = useState('');
  const AddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target) {
              const base64Data = event.target.result as string;
              if (isValidBase64Image(base64Data)) {
                resolve(file);
              } else {
                reject(new Error('Not a valid image!'));
              }
            }
          };
          reader.onerror = (event: ProgressEvent<FileReader>) => {
            if (event.target) {
              console.error('Error reading file:', event.target.error);
              reject(new Error('Error reading file'));
            }
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((results) => {
          const validFiles: File[] = results as File[];
          setAllfalse();
          convertAllImagesToBase64(validFiles)
            .then((base64Strings) => {
              const base64array = base64Strings as string[];
              setSelectedImageString([...AllImaegsString, ...base64array]);
            })
            .catch((error) => {
              console.error(error);
            });
          setFileInputValue('');
        })
        .catch((error) => {
          setAllfalse();
          setErrorContent(error);
          setErrorText7(true);
        });
    }
  };
  const RemoveImage = (index: string) => {
    // 创建新的图片列表，排除要移除的图片
    const updatedImagesString = AllImaegsString.filter(
      (_, i) => String(i) !== index
    );
    setSelectedImageString(updatedImagesString);
  };
  const scrollToElement = (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    if (ref.current) {
      console.log(ref.current);
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  type ApiResponse = {
    listing: ListingContent;
  };
  useEffect(() => {
    callAPIget('listings/' + HostingId, token)
      .then((response) => {
        const Responsedata = response as ApiResponse;
        console.log(Responsedata.listing);
        setData(Responsedata.listing);
        setType(Responsedata.listing.metadata.type);
        setCountry(Responsedata.listing.address.Country);
        setStreet(Responsedata.listing.address.Street);
        setCity(Responsedata.listing.address.City);
        setState(Responsedata.listing.address.State);
        setPostcode(Responsedata.listing.address.Postcode);
        setBedroom(Responsedata.listing.metadata.bedInfo.Bedrooms);
        setBed(Responsedata.listing.metadata.bedInfo.Bathrooms);
        setBathroom(Responsedata.listing.metadata.bedInfo.Bathrooms);
        setGuest(Responsedata.listing.metadata.bedInfo.Guests);
        setPrice(Responsedata.listing.price);
        setTitle(Responsedata.listing.title);
        setlength(Responsedata.listing.title.length);
        setAirConditioningChecked(
          Responsedata.listing.metadata.otherInfo.AirConditioning
        );
        setFreeParkingChecked(
          Responsedata.listing.metadata.otherInfo.FreeParking
        );
        setWifiChecked(Responsedata.listing.metadata.otherInfo.WiFi);
        setTVChecked(Responsedata.listing.metadata.otherInfo.TV);
        setKitchenChecked(Responsedata.listing.metadata.otherInfo.Kitchen);
        setWashingmachineChecked(
          Responsedata.listing.metadata.otherInfo.WashingMachine
        );
        const img0 = Responsedata.listing.thumbnail;
        const allimg = Responsedata.listing.metadata.images;
        setThumbil(img0);
        setSelectedImageString(allimg);
      })
      .catch((error) => {
        meetError(error);
        return null; // 处理错误，返回一个默认值
      });
  }, []);
  const EditNow = () => {
    const pricePattern = /^[1-9]\d{0,4}$/;
    let Confirmflag = true;
    if (data) {
      data.title = String(Title);
      data.price = String(Prise);
      data.title = String(Title);
      data.price = String(Prise);
      data.metadata.type = String(HostingType);
      data.address.Country = Country;
      data.address.City = City;
      data.address.Postcode = Postcode;
      data.address.State = State;
      data.address.Street = Street;
      data.metadata.bedInfo.Bedrooms = Bedroom || '1';
      data.metadata.bedInfo.Beds = Bed || '1';
      data.metadata.bedInfo.Bathrooms = Bedroom || '1';
      data.metadata.bedInfo.Guests = Guest || '1';
      data.metadata.otherInfo.AirConditioning = isAirConditioningChecked;
      data.metadata.otherInfo.FreeParking = isFreeParkingChecked;
      data.metadata.otherInfo.Kitchen = isKitchenChecked;
      data.metadata.otherInfo.TV = isTVChecked;
      data.metadata.otherInfo.WashingMachine = isWashingmachineChecked;
      data.metadata.otherInfo.WiFi = isWifiChecked;
      data.thumbnail = Thumbil;
      if (data.metadata.type.length === 0) {
        console.log('no type');
        Confirmflag = false;
        setAllfalse();
        setErrorContent('You must select one type for your hosting');
        setErrorText1(true);
        scrollToElement(scrollToQ1);
      }
      if (Confirmflag && data.address) {
        setAllfalse();
        const letterPattern = /[a-zA-Z]+/;
        const numericPattern = /^[0-9]+$/;
        if (!letterPattern.test(Country)) {
          console.log('invalid country');
          setErrorContent('Your country name is invalid');
          Confirmflag = false;
        } else if (!letterPattern.test(Street)) {
          setErrorContent('Your street name is invalid');
          Confirmflag = false;
          console.log('invalid country');
        } else if (!letterPattern.test(City)) {
          setErrorContent('Your city name is invalid');
          Confirmflag = false;
          console.log('invalid country');
        } else if (!letterPattern.test(State)) {
          setErrorContent('Your state name is invalid');
          Confirmflag = false;
          console.log('invalid country');
        } else if (!numericPattern.test(Postcode)) {
          setErrorContent('Your Postcode name is invalid');
          Confirmflag = false;
          console.log('invalid postcode');
        }
        if (!Confirmflag) {
          setErrorText2(true);
          console.log(scrollToQ2);
          scrollToElement(scrollToQ2);
        }
      }
      if (Confirmflag && data.title.length === 0) {
        console.log('no title');
        setAllfalse();
        setErrorContent('You must set a title for your hosting');
        setErrorText5(true);
        scrollToElement(scrollToQ5);
        Confirmflag = false;
      }
      if (Confirmflag && !pricePattern.test(data.price)) {
        console.log('invalid Price');
        setAllfalse();
        setErrorContent('Your price must between 1 to 99999');
        setErrorText6(true);
        Confirmflag = false;
        scrollToElement(scrollToQ6);
      }
      if (Confirmflag && Thumbil === '') {
        setAllfalse();
        setErrorContent('You must show your hosting pictures to us');
        setErrorText7(true);
        Confirmflag = false;
        scrollToElement(scrollToQ7);
      }
      if (Confirmflag) {
        data.metadata.images = AllImaegsString;
        setOpen(true);
        console.log(data);
      }
      console.log(data);
    }
  };
  return (
    <CreatChannelOverall>
      <HiddenConfirmCreat>
        <ConfirmEdit data={data || initial} isOpen={isOpen} close={SelfClose} />
      </HiddenConfirmCreat>
      <CreatNewHeader>
        <CreatLogo>
          <LargeHomeHeadLogoContent src='/img/logo_p.png'></LargeHomeHeadLogoContent>
        </CreatLogo>
        <HeaderRightButtonPart>
          <HeaderRightButtonself onClick={goesHost}>Exit</HeaderRightButtonself>
        </HeaderRightButtonPart>
      </CreatNewHeader>
      <Q1 ref={scrollToQ1}>
        <QoneQuestionPart>
          Which of these best describes your place?
        </QoneQuestionPart>
        <QoneAnswerPart>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='House'
            onClick={ChangeType}
          ></QoneSelect>
          <QoneShowSelect htmlFor='House' checked={HostingType === 'House'}>
            House
          </QoneShowSelect>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='Apartment'
            onClick={ChangeType}
          />
          <QoneShowSelect
            htmlFor='Apartment'
            checked={HostingType === 'Apartment'}
          >
            Apartment
          </QoneShowSelect>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='Cabin'
            onClick={ChangeType}
          />
          <QoneShowSelect htmlFor='Cabin' checked={HostingType === 'Cabin'}>
            Cabin
          </QoneShowSelect>
          <QoneSelect
            type='radio'
            name='accommodation'
            id='Hotel'
            onClick={ChangeType}
          />
          <QoneShowSelect htmlFor='Hotel' checked={HostingType === 'Hotel'}>
            Hotel
          </QoneShowSelect>
        </QoneAnswerPart>
        {ErrorText1 && <CreateError>{errorContent}</CreateError>}
      </Q1>
      <Q ref={scrollToQ2}>
        <QtwoQ>Tell us about your address</QtwoQ>
        <QtwoQsub>
          Your address is only shared with guests after they’ve made a
          reservation.
        </QtwoQsub>
        <QtwoQasw>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Country/Region</QtwoQaswLable>
            <QtwoQaswInput
              id='country'
              value={Country}
              onChange={handleCountryChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Street address</QtwoQaswLable>
            <QtwoQaswInput
              id='street'
              value={Street}
              onChange={handleStreetChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Suburb/city</QtwoQaswLable>
            <QtwoQaswInput
              id='city'
              value={City}
              onChange={handleCityChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>State/territory</QtwoQaswLable>
            <QtwoQaswInput
              id='state'
              value={State}
              onChange={handleStateChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
          <QtwoQaswrow tabIndex={0}>
            <QtwoQaswLable>Postcode</QtwoQaswLable>
            <QtwoQaswInput
              id='postcode'
              value={Postcode}
              onChange={handlePostcodeChange}
            ></QtwoQaswInput>
          </QtwoQaswrow>
        </QtwoQasw>
        {ErrorText2 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ3}>
        <QtwoQ>Share some basics about your place</QtwoQ>
        <QtwoQsub>You’ll add more details later, like bed types.</QtwoQsub>
        <Q3Qasw>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Guests</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Guests'
              value={Guest}
              onChange={handleGuestChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Bedrooms</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Bedrooms'
              value={Bedroom}
              onChange={handleBedroomChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Beds</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Beds'
              value={Bed}
              onChange={handleBedChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
          <Q3Qaswrow tabIndex={0}>
            <Q3QaswLable>Bathrooms</Q3QaswLable>
            <Q3QaswInput
              placeholder='1'
              maxLength={2}
              id='Bathrooms'
              value={Bathroom}
              onChange={handleBathroomChange}
            ></Q3QaswInput>
          </Q3Qaswrow>
        </Q3Qasw>
        {ErrorText3 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ4}>
        <Q4q>Tell guests what your place has to offer</Q4q>
        <QtwoQsub>
          You can add more amenities after you publish your listing.
        </QtwoQsub>
        <QoneAnswerPart>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='WiFi'
            onChange={() => setWifiChecked(!isWifiChecked)}
          />
          <QfourShowSelect htmlFor='WiFi' checked={isWifiChecked}>
            Wi-Fi
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='TV'
            onChange={() => setTVChecked(!isTVChecked)}
          />
          <QfourShowSelect htmlFor='TV' checked={isTVChecked}>
            TV
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Kitchen'
            onChange={() => setKitchenChecked(!isKitchenChecked)}
          />
          <QfourShowSelect htmlFor='Kitchen' checked={isKitchenChecked}>
            Kitchen
          </QfourShowSelect>

          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Washing machine'
            onChange={() => setWashingmachineChecked(!isWashingmachineChecked)}
          />
          <QfourShowSelect
            htmlFor='Washing machine'
            checked={isWashingmachineChecked}
          >
            Washing machine
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Air conditioning'
            onChange={() =>
              setAirConditioningChecked(!isAirConditioningChecked)
            }
          />
          <QfourShowSelect
            htmlFor='Air conditioning'
            checked={isAirConditioningChecked}
          >
            Air conditioning
          </QfourShowSelect>
          <QoneSelect
            type='checkbox'
            name='accommodation'
            id='Free Parking'
            onChange={() => setFreeParkingChecked(!isFreeParkingChecked)}
          />
          <QfourShowSelect
            htmlFor='Free Parking'
            checked={isFreeParkingChecked}
          >
            Free Parking
          </QfourShowSelect>
        </QoneAnswerPart>
        {ErrorText4 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ5}>
        <Q4q>Now, let‘s give your barn a title</Q4q>
        <QtwoQsub>
          Short titles work best. Have fun with it—you can always change it
          later.
        </QtwoQsub>
        <QoneAnswerPart>
          <Q5A
            id='hosting-title'
            maxLength={32}
            onChange={handleTitleChange}
            value={Title}
          ></Q5A>
        </QoneAnswerPart>
        <LengthDetector>{lengthOfTitle}/32</LengthDetector>
        {ErrorText5 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ6}>
        <Q4q>Now, set your price</Q4q>
        <QtwoQsub>You can change it anytime.</QtwoQsub>
        <Q6aDiv>
          <Q6Ap>$</Q6Ap>
          <Q6aInput
            id='price'
            placeholder='0'
            maxLength={5}
            value={Prise}
            onChange={handlePriceChange}
          ></Q6aInput>
          <Q6Asmall>/day</Q6Asmall>
        </Q6aDiv>
        {ErrorText6 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q ref={scrollToQ7}>
        <Q4q>Add some photos of your barn</Q4q>
        <QtwoQsub>
          You’ll need one photos to get started. This photo would as your
          hosting Thumbnail.
        </QtwoQsub>
        <Q7aDiv>
          <QoneSelect
            id='upload'
            onChange={AddThumbil}
            type='file'
            ref={RefT}
            accept='image/*'
          ></QoneSelect>
          <UploadIMG
            onClick={HandleT}
            src={Thumbil || '/img/addusr.png'}
            alt='Upload from your device'
          ></UploadIMG>
        </Q7aDiv>
        {ErrorText7 && <CreateError>{errorContent}</CreateError>}
      </Q>
      <Q>
        <Q4q>Add more photos of your barn</Q4q>
        <QtwoQsub>
          This is optional if you want show more of your hosting. You can add
          more or make changes later. The first photo would as your hosting
          Thumbnail.
        </QtwoQsub>
        <Q7aDiv>
          <QoneSelect
            id='upload'
            onChange={AddImage}
            type='file'
            ref={RefFile}
            value={fileInputValue}
            accept='image/*'
          ></QoneSelect>
          <UploadButton onClick={HandleFile}>
            Upload from your device
          </UploadButton>
        </Q7aDiv>
        {AllImaegsString.map((item, index) => (
          <LasteachImage key={index} onClick={() => RemoveImage(String(index))}>
            <HoverImage src={item} alt={`Image ${index}`} />
          </LasteachImage>
        ))}
      </Q>
      <QButton>
        <CreatButton onClick={EditNow} type='button'>
          Change your hosting
        </CreatButton>
      </QButton>
    </CreatChannelOverall>
  );
};

const HostCenterSmall = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 140px)',
  overflow: 'scroll',
  width: '100%',
});
const CenterHeaderHost = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '145px',
});
const HostSmallCenterHeaderTxt = styled('p')({
  textAlign: 'start',
  height: 'auto',
  fontFamily: 'sans-serif',
  margin: '0px',
  padding: '30px 20px 0px 20px',
  fontSize: '20px',
  letterSpacing: '0.2px',
  maxWidth: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontWeight: '500',
});
const HostSmallCenterHeaderBtn = styled('button')({
  margin: '20px 100px 0px 20px',
  letterSpacing: '0.3px',
  fontFamily: 'sans-serif',
  height: '28px',
  width: '140px',
  fontWeight: '500',
  fontSize: '12px',
  backgroundColor: 'white',
  border: '1px solid rgb(0, 0, 0)',
  borderRadius: '7px',
});
export const SmallHostPage = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const ClickCreatListing = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/CreateListing`);
  };
  // const ClickOther = (event: React.MouseEvent) => {
  //   if (
  //     TargetMenu.current &&
  //     !TargetMenu.current.contains(event.target as Node)
  //   ) {
  //     setOpen(false);
  //   }
  // };

  const goseHome = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}`);
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myhosting`);
  };
  const goesReservation = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myresveration`);
  };
  // useEffect(() => {
  //   const clickHandler = (event: MouseEvent) => {
  //     ClickOther(event as unknown as React.MouseEvent); // 使用类型断言将 MouseEvent 转换为 React.MouseEvent
  //   };
  //   if (isOpen) {
  //     // 如果菜单是打开的，添加事件监听器来处理点击页面其他地方的事件
  //     document.addEventListener('click', clickHandler);
  //   } else {
  //     // 如果菜单是关闭的，移除事件监听器
  //     document.removeEventListener('click', clickHandler);
  //   }
  //   return () => {
  //     // 在组件卸载时，移除事件监听器，以防止内存泄漏
  //     document.removeEventListener('click', clickHandler);
  //   };
  // }, [isOpen]); // 当 isMenuOpen 改变时，重新设置事件监听器
  return (
    <SmallHomePagecss>
      <div ref={TargetMenu}>
        <LogoutModelHost isOpen={isOpen} close={close} />
      </div>
      <SmallHomeHead>
        <LargeHomeHeadLogo>
          <LargeHomeHeadLogoContent src='/img/logo_p.png'></LargeHomeHeadLogoContent>
        </LargeHomeHeadLogo>
        <LargeProfile>
          <LargeProfileOuter onClick={ClickProfile}>
            <LargeProfileLeftImage src='/img/more.png'></LargeProfileLeftImage>
            <LargeProfileRightImage src='/img/logged.png'></LargeProfileRightImage>
          </LargeProfileOuter>
        </LargeProfile>
      </SmallHomeHead>
      <HostCenterSmall>
        <CenterHeaderHost>
          <HostSmallCenterHeaderTxt>
            Welcome, {localStorage.getItem('LoggedUserEmail')}!
          </HostSmallCenterHeaderTxt>
          <HostSmallCenterHeaderBtn onClick={ClickCreatListing}>
            Create your listing
          </HostSmallCenterHeaderBtn>
        </CenterHeaderHost>
        <Routes>
          <Route path='/myresveration' element={<ReservingContent />} />
          <Route path='/myhosting' element={<HostingContent />} />
        </Routes>
      </HostCenterSmall>
      <SmallHomeBottom>
        <SmallBottomButtonOuter onClick={goseHome}>
          <SmallButtomButton1 src='/img/search.png'></SmallButtomButton1>
          <p>Listing</p>
        </SmallBottomButtonOuter>
        <SmallBottomButtonOuter onClick={goesHost}>
          <SmallButtomButton1 src='/img/hosting.png'></SmallButtomButton1>
          <p>Hosting</p>
        </SmallBottomButtonOuter>
        <SmallBottomButtonOuter onClick={goesReservation}>
          <SmallButtomButton1 src='/img/booking.png'></SmallButtomButton1>
          <p>Reserving</p>
        </SmallBottomButtonOuter>
      </SmallHomeBottom>
    </SmallHomePagecss>
  );
};
const LargeHostOverall = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const LargeHostHeight = styled('div')({
  width: '100%',
  display: 'flex',
  height: '80px',
  borderBottom: '1px solid rgb(230, 230, 230);',
});
const LargeHostLogo = styled('div')({
  display: 'flex',
  height: '100%',
  flex: '1',
});
const LargeSwitch = styled('div')({
  width: '120px',
  display: 'flex',
  height: '100%',
});
const LargeSwitch2 = styled('div')({
  width: '170px',
  display: 'flex',
  height: '100%',
});
const LargeSwitch3 = styled('div')({
  maxWidth: '180px',
  minWidth: '180px',
});
const LargeHostCenter = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const LargeHeaderBtn = styled('button')({
  marginRight: '100px',
  letterSpacing: '0.3px',
  fontFamily: 'sans-serif',
  height: '35px',
  width: '170px',
  fontWeight: '500',
  fontSize: '14px',
  backgroundColor: 'white',
  border: '1px solid rgb(0, 0, 0)',
  borderRadius: '7px',
  '&:hover': {
    backgroundColor: 'rgb(245, 245, 245)',
  },
});
const CenterHeaderHostLarge = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: '145px',
  margin: '15px',
  alignItems: 'center',
});
const CenterHeaderHostLargeTxt = styled('p')({
  fontFamily: 'sans-serif',
  maxWidth: '50%',
  wordWrap: 'break-word',
  marginLeft: '90px',
  fontSize: '32px',
  letterSpacing: '0.2px',
  fontWeight: '500',
});
export const LargeHostPage = () => {
  const { '*': lastSegment } = useParams();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(lastSegment);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const ClickCreatListing = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/CreateListing`);
  };
  // const ClickOther = (event: React.MouseEvent) => {
  //   if (
  //     TargetMenu.current &&
  //     !TargetMenu.current.contains(event.target as Node)
  //   ) {
  //     setOpen(false);
  //   }
  // };
  const goseHome = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}`);
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myhosting`);
    setActiveTab('hosting'); // 更新活动标签
  };
  const goesReservation = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myresveration`);
    setActiveTab('reserving'); // 更新活动标签
  };
  // useEffect(() => {
  //   const clickHandler = (event: MouseEvent) => {
  //     ClickOther(event as unknown as React.MouseEvent); // 使用类型断言将 MouseEvent 转换为 React.MouseEvent
  //   };
  //   if (isOpen) {
  //     // 如果菜单是打开的，添加事件监听器来处理点击页面其他地方的事件
  //     document.addEventListener('click', clickHandler);
  //   } else {
  //     // 如果菜单是关闭的，移除事件监听器
  //     document.removeEventListener('click', clickHandler);
  //   }
  //   return () => {
  //     // 在组件卸载时，移除事件监听器，以防止内存泄漏
  //     document.removeEventListener('click', clickHandler);
  //   };
  // }, [isOpen]); // 当 isMenuOpen 改变时，重新设置事件监听器
  const SwitchReser = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.2px',
    margin: '20px 0px 10px 0px',
    padding: '0px 10px 0px 10px',
    borderRadius: '20px',
    height: '40px',
    color: 'rgb(144, 144, 144)',
    backgroundColor: 'rgb(250, 250, 250)',
    ...(activeTab !== 'myhosting' && {
      color: 'rgb(0, 0, 0)',
      backgroundColor: 'rgb(240, 240, 240)',
    }),
  });
  const SwitchHos = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.2px',
    margin: '20px 0px 10px 0px',
    padding: '0px 10px 0px 10px',
    borderRadius: '20px',
    height: '40px',
    color: 'rgb(144, 144, 144)',
    backgroundColor: 'rgb(250, 250, 250)',
    ...(activeTab === 'myhosting' && {
      color: 'rgb(0, 0, 0)',
      backgroundColor: 'rgb(240, 240, 240)',
    }),
  });
  return (
    <LargeHostOverall>
      <div ref={TargetMenu}>
        <LogoutModel isOpen={isOpen} close={close} />
      </div>
      <LargeHostHeight>
        <LargeHostLogo>
          <LargeHomeHeadLogoContent src='/img/logo_p.png'></LargeHomeHeadLogoContent>
        </LargeHostLogo>
        <LargeSwitch>
          <SwitchHos onClick={goesHost} id='hos'>
            All hosting
          </SwitchHos>
        </LargeSwitch>
        <LargeSwitch2>
          <SwitchReser onClick={goesReservation} id='rsv'>
            All reservations
          </SwitchReser>
        </LargeSwitch2>
        <LargeSwitch3>
          <SwitchContent onClick={goseHome}>Switch to listing</SwitchContent>
        </LargeSwitch3>
        <LargeProfile>
          <LargeProfileOuter onClick={ClickProfile}>
            <LargeProfileLeftImage src='/img/more.png'></LargeProfileLeftImage>
            <LargeProfileRightImage src='/img/logged.png'></LargeProfileRightImage>
          </LargeProfileOuter>
        </LargeProfile>
      </LargeHostHeight>
      <LargeHostCenter>
        <CenterHeaderHostLarge>
          <CenterHeaderHostLargeTxt>
            Welcome, {localStorage.getItem('LoggedUserEmail')}!
          </CenterHeaderHostLargeTxt>
          <LargeHeaderBtn onClick={ClickCreatListing}>
            Create your listing
          </LargeHeaderBtn>
        </CenterHeaderHostLarge>
        <Routes>
          <Route path='/myresveration' element={<ReservingContent />} />
          <Route path='/myhosting' element={<HostingContent />} />
        </Routes>
      </LargeHostCenter>
    </LargeHostOverall>
  );
};

// const AddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const files = event.target.files;
//   if (files && files.length > 0) {
//     const reader = new FileReader();
//     reader.onload = (event: ProgressEvent<FileReader>) => {
//       let flag = false;
//       if (event.target) {
//         const base64Data = event.target.result as string;
//         if (base64Data) {
//           flag = isValidBase64Image(base64Data);
//         }
//       }
//       if (flag) {
//         setAllfalse();
//         const fileList = Array.from(files);
//         // 更新已选文件数组
//         setSelectedImage([...AllImages, ...fileList]);
//       } else {
//         setAllfalse();
//         setErrorContent('Not a valid image!');
//         setErrorText7(true);
//         setSelectedImage([...AllImages]);
//       }
//     };
//     reader.onerror = (event: ProgressEvent<FileReader>) => {
//       if (event.target) {
//         console.error('Error reading file:', event.target.error);
//       }
//     };

//     // 请确保 `files[0]` 存在，否则会导致问题
//     if (files[0]) {
//       reader.readAsDataURL(files[0]);
//     }
//   }
// };
