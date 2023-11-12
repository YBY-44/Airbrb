import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import dayjs from 'dayjs';
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
  useParams,
} from 'react-router-dom';
import {
  LogoutModel,
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
  LargeHomeCenter,
  LargeProfile,
  LargeProfileLeftImage,
  LargeProfileOuter,
  LargeProfileRightImage,
  LoginModel,
  AppContext,
  meetError,
  SmallHomePagecss,
  SmallHomeHead,
  LogoutModelHost,
  SmallBottomButtonOuter,
  SmallButtomButton1,
  SwitchContent,
  SmallHomeBottom,
} from '../App';
import {
  callAPIpost,
  CallAPIPostWithToken,
  errorMessage,
  callAPIget,
} from './API';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material';
import { Availability } from './publish';
interface Review {
  score: number;
  content: string;
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
}
type ApiResponse = {
  listing: ListingContent;
};
export const ListingDetailSmall = () => {
  const [data, setData] = useState<ApiResponse>();
  const [Loading, setLoading] = useState(false);
  const { HostingId } = useParams();
  const navigate = useNavigate();
  const [Owners, setOwner] = useState('');
  const [Availabilitys, setAvs] = useState<Availability[]>([]);
  const [PostTime, setPostTime] = useState<Date | null>(null);
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
  const [AllImages, setAllImages] = useState<string[]>([]);
  const [Allreviews, setAllreviews] = useState<Review[]>([]);
  useEffect(() => {
    if (!Loading) {
      const token = localStorage.getItem('token') || '';
      callAPIget('listings/' + HostingId, token)
        .then((response) => {
          const Responsedata = response as ApiResponse;
          //   console.log(Responsedata.listing);
          //   setType(Responsedata.listing.metadata.type);
          //   setCountry(Responsedata.listing.address.Country);
          //   setStreet(Responsedata.listing.address.Street);
          //   setCity(Responsedata.listing.address.City);
          //   setState(Responsedata.listing.address.State);
          //   setPostcode(Responsedata.listing.address.Postcode);
          //   setBedroom(Responsedata.listing.metadata.bedInfo.Bedrooms);
          //   setBed(Responsedata.listing.metadata.bedInfo.Bathrooms);
          //   setBathroom(Responsedata.listing.metadata.bedInfo.Bathrooms);
          //   setGuest(Responsedata.listing.metadata.bedInfo.Guests);
          //   setPrice(Responsedata.listing.price);
          //   setTitle(Responsedata.listing.title);
          //   setAirConditioningChecked(
          //     Responsedata.listing.metadata.otherInfo.AirConditioning
          //   );
          //   setFreeParkingChecked(
          //     Responsedata.listing.metadata.otherInfo.FreeParking
          //   );
          //   setWifiChecked(Responsedata.listing.metadata.otherInfo.WiFi);
          //   setTVChecked(Responsedata.listing.metadata.otherInfo.TV);
          //   setKitchenChecked(Responsedata.listing.metadata.otherInfo.Kitchen);
          //   setWashingmachineChecked(
          //     Responsedata.listing.metadata.otherInfo.WashingMachine
          //   );
          //   const img0 = Responsedata.listing.thumbnail;
          //   const allimg = Responsedata.listing.metadata.images;
          //   setThumbil(img0);
          //   setAllImages(allimg);
          //   setAllreviews(Responsedata.listing.reviews);
          //   setAvs(Responsedata.listing.availability);
          //   setOwner(Responsedata.listing.owner);
          //   setPostTime(Responsedata.listing.postedOn);
          // setSelectedImageString(allimg);
          setLoading(true);
        })
        .catch((error) => {
          meetError(error);
          return null; // 处理错误，返回一个默认值
        });
    }
  });
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  const { searchcontent, setcontent } = FilterValue;
  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  const reloading = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}`);
    }
  };
  const TargetMenu = useRef<HTMLDivElement | null>(null);
  const conponment = (
    <div>
      <p></p>
      <p></p>
    </div>
  );
  return conponment;
};
const SpecificCenter = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  overflow: 'scroll',
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
export const ListingDetailLarge = () => {
  const [data, setData] = useState<ListingContent>();
  const [Loading, setLoading] = useState(false);
  const { HostingId } = useParams();
  const navigate = useNavigate();
  const [Owners, setOwner] = useState('');
  const [Availabilitys, setAvs] = useState<Availability[]>([]);
  const [PostTime, setPostTime] = useState<Date | null>(null);
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
  const [AllImages, setAllImages] = useState<string[]>([]);
  const [Allreviews, setAllreviews] = useState<Review[]>([]);
  const loadData = (dataing: ListingContent) => {
    setData(dataing);
  };
  useEffect(() => {
    if (!Loading) {
      const token = localStorage.getItem('token') || '';
      callAPIget('listings/' + HostingId, '')
        .then((response) => {
          const Responsedata = response as ApiResponse;
          const Resp = Responsedata.listing;
          const scor = Responsedata.listing.reviews;
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
          console.log(Responsedata.listing);
          loadData(Resp);
          setLoading(true);
        })
        .catch((error) => {
          meetError(error);
          return null; // 处理错误，返回一个默认值
        });
    }
  });
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const handdlesearch = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };
  const { searchcontent, setcontent } = FilterValue;
  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myhosting`);
    } else {
      navigate('/login');
    }
  };
  const reloading = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    if (localStorage.token) {
      navigate(`/user/${userId}`);
    } else {
      navigate('/');
    }
  };
  const trueKeys = Object.entries(data?.metadata.otherInfo || {})
    .filter(([_key, value]) => value === true)
    .map(([key]) => key);

  if (trueKeys.length === 0) {
    trueKeys.push('No additional Facilities');
  }

  const TargetMenu = useRef<HTMLDivElement | null>(null);
  const conponment = (
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
      <SpecificCenter>
        <div className='title'>{data?.title}</div>
        <div className='imagePart'>
          <ThumbImg src={data?.thumbnail}></ThumbImg>
          <RightImage>
            <OtherImg src={data?.metadata.images[0]}></OtherImg>
            <OtherImg src={data?.metadata.images[1]}></OtherImg>
            <OtherImg src={data?.metadata.images[2]}></OtherImg>
            <OtherImg src={data?.metadata.images[3]}></OtherImg>
          </RightImage>
        </div>
        <p className='title'>
          {data?.metadata.type +
            ' stay in ' +
            data?.address.City +
            ', ' +
            data?.address.Country}
        </p>
        <p className='houseinfo'>
          {data?.metadata.bedInfo.Guests +
            ' guests · ' +
            data?.metadata.bedInfo.Bedrooms +
            ' bedrooms · ' +
            data?.metadata.bedInfo.Beds +
            ' beds · ' +
            data?.metadata.bedInfo.Bathrooms +
            ' bathrooms'}
        </p>
        <div className='centerLR'>
          <div className='fac'>
            <p className='title'>What this place offers?</p>
            <div className='facp'>
              {trueKeys.map((key) => (
                <p className='housea' key={key}>
                  {key}
                </p>
              ))}
            </div>
            <p className='title2'>{'User ' + data?.owner}</p>
            <p className='time'>
              {'Published in ' + dayjs(data?.postedOn).format('YYYY-DD-MM')}
            </p>
            <div className='ReviweInfo'>
              <div className='revblock'>
                <p className='reviewtxt'>{data?.score}</p>
                <p className='reviewtxt2'>Reviews</p>
              </div>
              <div className='revblock'>
                <p className='reviewtxt'>{data?.reviews.length}</p>
                <p className='reviewtxt2'>Reviews</p>
              </div>
            </div>
          </div>
          <div className='book'></div>
        </div>
        <p className='address'>
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
        </p>
        <div className='reviewPart'>Review1</div>
      </SpecificCenter>
    </LargeHomePagecss>
  );
  return conponment;
};
