import { styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { meetError, LargeHomeHeadLogoContent } from '../App';
import {
  CreatChannelOverall,
  CreatNewHeader,
  CreatLogo,
  HeaderRightButtonPart,
  HiddenConfirmCreat,
  HeaderRightButtonself,
  CreatButton,
  QButton,
} from './Host';
import {
  callAPIget,
  CallAPIPostWithToken,
  callAPIput,
  HoverImage,
  Datetostring,
  GetDistance,
} from './API';
import { GetAllOwnerListing } from './get_all_listing';
import { Kitchen, Margin, Tv, Wifi } from '@mui/icons-material';
import styledEngine from '@mui/styled-engine';
export interface Availability {
  startDate: Date;
  endDate: Date;
  distance: number;
}
export interface ConfirmCreatProps {
  data: {
    availability: Availability[];
  };
  isOpen: boolean;
  close: () => void;
}
export const ConfirmPublish: React.FC<ConfirmCreatProps> = ({
  data,
  isOpen,
  close,
}) => {
  const { HostingId } = useParams();
  const navigate = useNavigate();
  const PublishHosting = () => {
    const token = localStorage.getItem('token') || '';
    callAPIput('listings/publish/' + HostingId, data, token)
      .then(() => {
        console.log('success');
        close();
        const userId = localStorage.getItem('LoggedUserEmail');
        navigate(`/user/${userId}/hosting/myhosting`);
        alert('Publish hosting successful !');
      })
      .catch((error) => meetError(error));
  };

  let conponment = <div></div>;
  if (isOpen) {
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
      padding: '0px 0px 0px 0px',
      height: '480px',
      overflowY: 'scroll',
      textAlign: 'center',
      color: 'rgb(0, 0, 0)',
    });
    const CfmRow = styled('div')({
      '@media (max-width: 640px)': {
        flexDirection: 'column',
      },
      '@media (min-width: 640px)': {
        flexDirection: 'row',
      },
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px 10% 0px 10%',
      borderBottom: '1px solid rgb(220, 220, 220)',
    });
    const CfmI = styled('div')({
      display: 'flex',
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

    const CfmBottom = styled('div')({
      width: '100%',
      display: 'flex',
      height: '50px',
      justifyContent: 'center',
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
    console.log(data);
    conponment = (
      <CfmAll>
        <CfmBack></CfmBack>
        <CfmContent>
          <CfmHeight>
            <CfmClose onClick={close}>Back</CfmClose>
            <CfmHead>Time Confirmation</CfmHead>
          </CfmHeight>
          <CfmCenterContent>
            {data.availability.map((interval, index) => (
              <CfmRow key={index}>
                <CfmLefttxt>Available time{' ' + (index + 1)}</CfmLefttxt>
                <CfmI>
                  <CfmRightttxt>
                    {dayjs(interval.startDate).format('YYYY-MM-DD')}
                  </CfmRightttxt>
                  <CfmRightttxt>to</CfmRightttxt>
                  <CfmRightttxt>
                    {dayjs(interval.endDate).format('YYYY-MM-DD')}
                  </CfmRightttxt>
                </CfmI>
                <CfmRightttxt>{interval.distance + ' '}day</CfmRightttxt>
              </CfmRow>
            ))}
          </CfmCenterContent>
          <CfmBottom>
            <CreatButton onClick={PublishHosting}>Publish Now</CreatButton>
          </CfmBottom>
        </CfmContent>
      </CfmAll>
    );
    console.log(data);
  }
  return isOpen ? conponment : null;
};
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

const HouseInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  margin: '20px',
});
const LeftPart = styled('div')({
  '@media (max-width: 800px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 800px)': {
    flexDirection: 'row',
  },
  display: 'flex',
  alignItems: 'center',
  padding: '0px 0px 20px 20px',
  backgroundColor: 'rgb(245,245,245)',
  borderRadius: '20px',
});
const SmallListingImage = styled('img')({
  '@media (max-width: 800px)': {
    width: '300px',
  },
  '@media (min-width: 800px)': {
    width: '300px',
    height: '300px',
  },
  borderRadius: '10px',
  margin: '10px 30px 10px 10px',
  boxShadow: '0px 2px 5px 2px rgba(100, 100, 100, 0.5)',
  objectFit: 'cover',
});
const ListingInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
const ListingType = styled('p')({
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '35px',
  height: 'auto',
  fontWeight: '500',
});
const ListingTitle = styled('p')({
  width: '100%',
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '20px',
  whiteSpace: 'nowrap',
  letterSpacing: '0.5px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});
const GuestInfo = styled('div')({
  margin: '10px 0px 10px 0px',
  display: 'flex',
  alignItems: 'center',
});
const LogoPath = styled('img')({
  width: '20px',
  height: '20px',
});
const ListingGuest = styled('p')({
  textAlign: 'left',
  margin: '0px 30px 0px 10px',
  padding: '0px',
  fontSize: '16px',
  fontWeight: '400',
});
const ListingPrice = styled('p')({
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '30px',
  fontWeight: '500',
});
const ListingAddress = styled('p')({
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '17px',
  color: 'rgb(20,20,20)',
});
const ListingFac = styled('div')({
  display: 'flex',
  margin: '0px',
  padding: '0px 0px 5px 0px',
  fontSize: '20px',
  color: 'rgb(100, 100, 100)',
  flexWrap: 'wrap',
});
const CfmValuettxt = styled('p')({
  textAlign: 'left',
  margin: '0px',
  marginRight: '10px',
  fontSize: '15px',
  color: 'rgb(0, 0, 0)',
  width: 'auto',
});
const CfmValuettxtTitle = styled('p')({
  textAlign: 'left',
  margin: '0px',
  marginRight: '10px',
  fontSize: '20px',
  color: 'rgb(0, 0, 0)',
  width: 'auto',
});
const PublishInfo = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px',
});
const PublishTitle = styled('p')({
  textAlign: 'left',
  margin: '0px',
  fontSize: '30px',
  color: 'rgb(0, 0, 0)',
  width: 'auto',
  fontWeight: '500',
});
const TimeInterval = styled('div')({
  border: '1px solid rgb(200,200,200)',
  padding: '20px',
  margin: '20px 50px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
});
const IntervalHeader = styled('div')({
  margin: '0px 0px 10px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const ClearInterval = styled('button')({
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid black',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: 'rgb(240,240,240)',
  },
});
const AddInterval = styled('button')({
  backgroundColor: 'white',
  color: 'black',
  margin: '0px 50px 0px 0px',
  border: '1px solid black',
  height: '40px',
  width: '180px',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: 'rgb(240,240,240)',
  },
});
const IntervalContent = styled('div')({
  '@media (max-width: 685px)': {
    flexDirection: 'column',
  },
  '@media (min-width: 685px)': {
    flexDirection: 'row',
  },
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});
const TimeBlock = styled('div')({
  width: '50%',
  minWidth: '250px',
});
const IntervalBottom = styled('div')({
  display: 'flex',
});
const Pricetxt = styled('div')({
  textAlign: 'left',
  margin: '15px 0px 0px 0px',
  fontSize: '16px',
  color: 'rgb(0, 0, 0)',
  width: 'auto',
});
const Avtxt = styled('div')({
  textAlign: 'left',
  margin: '0px',
  fontSize: '18px',
  color: 'rgb(0, 0, 0)',
  width: 'auto',
});
const TO = styled('p')({
  margin: '0px 20px 0px 20px',
  padding: '0px',
});
const ErrorMsg = styled('p')({
  margin: '0px 20px 0px 20px',
  padding: '0px',
  color: 'rgb(255,0,0)',
  fontSize: '14px',
});
export const PublishPage = () => {
  const [data, setData] = useState<Availability[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { HostingId } = useParams();
  const navigate = useNavigate();
  const [HostingType, setType] = useState('');
  const [Country, setCountry] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Postcode, setPostcode] = useState('');
  const [Guest, setGuest] = useState('');
  const [Bedroom, setBedroom] = useState('');
  const [Bed, setBed] = useState('');
  const [Bathroom, setBathroom] = useState('');
  const [Thumbil, setThumbil] = useState('');
  const [Prise, setPrice] = useState('');
  const [isAirConditioningChecked, setAirConditioningChecked] = useState(false);
  const [isWifiChecked, setWifiChecked] = useState(false);
  const [isTVChecked, setTVChecked] = useState(false);
  const [isKitchenChecked, setKitchenChecked] = useState(false);
  const [isFreeParkingChecked, setFreeParkingChecked] = useState(false);
  const [isWashingmachineChecked, setWashingmachineChecked] = useState(false);
  const [Title, setTitle] = useState('');
  // const [AllImaegsString, setSelectedImageString] = useState<string[]>([]);
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myhosting`);
  };
  type ApiResponse = {
    listing: ListingContent;
  };
  const close = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!Loading) {
      const token = localStorage.getItem('token') || '';
      callAPIget('listings/' + HostingId, token)
        .then((response) => {
          const Responsedata = response as ApiResponse;
          console.log(Responsedata.listing);
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
          // setSelectedImageString(allimg);
          setLoading(true);
        })
        .catch((error) => {
          meetError(error);
          return null; // 处理错误，返回一个默认值
        });
    }
  }, []);
  const items: {
    [key: string]: boolean;
  } = {
    WiFi: isWifiChecked,
    TV: isTVChecked,
    Kitchen: isKitchenChecked,
    WashingMachine: isWashingmachineChecked,
    AirConditioning: isAirConditioningChecked,
    FreeParking: isFreeParkingChecked,
  };
  const trueKeys = Object.keys(items).filter((key) => {
    return items[key] === true;
  });
  if (trueKeys.length === 0) {
    trueKeys.push('No additional Facilities');
  }
  const PublishNow = () => {
    let checkFlag = true;
    if (FirstStart && FirstEnd && Firstdistance !== 0) {
      if (FirstStart < FirstEnd) {
        data.push({
          startDate: FirstStart || null,
          endDate: FirstEnd || null,
          distance: Firstdistance,
        });
      } else {
        checkFlag = false;
        setEC('StartDate must Before the EndDate');
      }
    } else {
      checkFlag = false;
      setEC(
        'There exist some date not choose, and For all interval start and end date can not be same'
      );
    }
    timeIntervals.forEach((item) => {
      if (item.startDate && item.endDate && item.distance !== 0) {
        if (item.startDate < item.endDate) {
          data.push({
            startDate: item.startDate || null,
            endDate: item.endDate || null,
            distance: item.distance,
          });
        } else {
          checkFlag = false;
          setEC('StartDate must Before the EndDate');
        }
      } else {
        checkFlag = false;
        setEC(
          'There exist some date not choose, and For all interval start and end date can not be same'
        );
      }
    });
    if (checkFlag) {
      console.log(data);
      setOpen(true);
      setEC('');
    } else {
      setData([]);
    }
  };
  const [timeIntervals, setTimeIntervals] = useState<
    {
      id: number;
      startDate: Date | null;
      endDate: Date | null;
      distance: number;
    }[]
  >([]);
  const [FirstStart, setFirstStart] = useState<Date | null>(null);
  const [FirstEnd, setFirstEnd] = useState<Date | null>(null);
  const [Firstdistance, setDistance] = useState(0);
  const [ErrorContent, setEC] = useState('');
  const FirstStartChange = (date: Date) => {
    setFirstStart(date);
    setDistance(GetDistance(date, FirstEnd));
  };
  const FirstEndChange = (date: Date) => {
    setFirstEnd(date);
    setDistance(GetDistance(FirstStart, date));
  };
  const addTimeInterval = () => {
    setTimeIntervals(
      (
        currentInterval: {
          id: number;
          startDate: Date | null;
          endDate: Date | null;
          distance: number;
        }[]
      ) => [
        ...currentInterval,
        {
          id: Date.now() as number, // 使用时间戳作为唯一标识
          startDate: null,
          endDate: null,
          distance: 0,
        },
      ]
    );
  };
  const handleStartDateChange = (index: number, date: Date) => {
    setTimeIntervals((currentInterval) => {
      const newIntervals = currentInterval ? [...currentInterval] : [];
      const already = newIntervals[index];
      if (already) {
        newIntervals[index] = {
          id: already.id,
          startDate: date,
          endDate: already.endDate,
          distance: GetDistance(date, already.endDate),
        };
      }
      return newIntervals || [];
    });
  };
  const handleEndDateChange = (index: number, date: Date) => {
    setTimeIntervals((currentInterval) => {
      const newIntervals = currentInterval ? [...currentInterval] : [];
      const already = newIntervals[index];
      if (already) {
        newIntervals[index] = {
          id: already.id,
          startDate: already.startDate,
          endDate: date,
          distance: GetDistance(already.startDate, date),
        };
      }
      return newIntervals || [];
    });
  };
  const deleteInterval = (id: number) => {
    setTimeIntervals((prevIntervals) =>
      prevIntervals.filter((interval) => interval.id !== id)
    );
  };
  const conponment = (
    <CreatChannelOverall>
      <HiddenConfirmCreat>
        <ConfirmPublish
          data={{ availability: data }}
          isOpen={isOpen}
          close={close}
        />
      </HiddenConfirmCreat>
      <CreatNewHeader>
        <CreatLogo>
          <LargeHomeHeadLogoContent src='/img/logo_p.png'></LargeHomeHeadLogoContent>
        </CreatLogo>
        <HeaderRightButtonPart>
          <HeaderRightButtonself onClick={goesHost}>Exit</HeaderRightButtonself>
        </HeaderRightButtonPart>
      </CreatNewHeader>
      <HouseInfo>
        <LeftPart>
          <SmallListingImage src={Thumbil}></SmallListingImage>
          <ListingInfo>
            <ListingType>{HostingType}</ListingType>
            <ListingTitle>{Title}</ListingTitle>
            <GuestInfo>
              <LogoPath src='/img/Guest.png'></LogoPath>
              <ListingGuest>{Guest}</ListingGuest>
              <LogoPath src='/img/Bedroom.png'></LogoPath>
              <ListingGuest>{Bedroom}</ListingGuest>
              <LogoPath src='/img/bed.png'></LogoPath>
              <ListingGuest>{Bed}</ListingGuest>
              <LogoPath src='/img/bath.png'></LogoPath>
              <ListingGuest>{Bathroom}</ListingGuest>
            </GuestInfo>
            <ListingPrice>${Prise} AUD / NIGHT</ListingPrice>
            <CfmValuettxtTitle>Offers:</CfmValuettxtTitle>
            <ListingFac>
              {trueKeys.map((key) => (
                <CfmValuettxt key={key}>{key}</CfmValuettxt>
              ))}
            </ListingFac>
            <CfmValuettxtTitle>Location:</CfmValuettxtTitle>
            <ListingAddress>
              {Street +
                ', ' +
                City +
                ', ' +
                State +
                ', ' +
                Country +
                ', ' +
                Postcode}
            </ListingAddress>
          </ListingInfo>
        </LeftPart>
        <PublishInfo>
          <IntervalHeader>
            <PublishTitle>Available Time</PublishTitle>
            <AddInterval onClick={addTimeInterval}>
              Add available time
            </AddInterval>
          </IntervalHeader>
          <TimeInterval>
            <IntervalHeader>
              <Avtxt>Available Time{' ' + 1}</Avtxt>
            </IntervalHeader>
            <IntervalContent>
              <TimeBlock>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label='Start Date'
                      value={FirstStart}
                      onChange={(date) => {
                        if (date) FirstStartChange(date);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </TimeBlock>
              <TO> - </TO>
              <TimeBlock>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label='End Date'
                      value={FirstEnd}
                      onChange={(date) => {
                        if (date) FirstEndChange(date);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </TimeBlock>
            </IntervalContent>
            <IntervalBottom>
              <Pricetxt>Totol Day{'  ' + Firstdistance}</Pricetxt>
            </IntervalBottom>
          </TimeInterval>
          {timeIntervals.map((interval, index) => (
            <TimeInterval key={interval.id}>
              <IntervalHeader>
                <Avtxt>Available Time{' ' + (index + 2)}</Avtxt>
                <ClearInterval
                  onClick={() => {
                    deleteInterval(interval.id);
                  }}
                >
                  Delete Interval
                </ClearInterval>
              </IntervalHeader>
              <IntervalContent>
                <TimeBlock>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        label='Start Date'
                        value={interval.startDate}
                        onChange={(date) => {
                          if (date) handleStartDateChange(index, date);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TimeBlock>
                <TO> - </TO>
                <TimeBlock>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        label='End Date'
                        value={interval.startDate}
                        onChange={(date) => {
                          if (date) handleEndDateChange(index, date);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TimeBlock>
              </IntervalContent>
              <IntervalBottom>
                <Pricetxt>Totol Day{'  ' + interval.distance}</Pricetxt>
              </IntervalBottom>
            </TimeInterval>
          ))}
        </PublishInfo>
        <ErrorMsg>{ErrorContent}</ErrorMsg>
        <QButton>
          <CreatButton onClick={PublishNow} type='button'>
            Publish your hosting
          </CreatButton>
        </QButton>
      </HouseInfo>
    </CreatChannelOverall>
  );
  return conponment;
};
// export default function BasicDatePicker () {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker label="Basic date picker" />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
