import { callAPIdelete, callAPIget, callAPIput, GetDistance, meetError, ErrorContext } from './API';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import { styled } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { Availability } from './publish';
// the listing interface
type ListingOver = {
  id: number;
  owner: string;
  price: number;
  title: string;
  address: {
    City: string;
    Country: string;
    Postcode: string;
    State: string;
    Street: string;
  };
};
// Api response interface
type ApiResponse = {
  listings: ListingOver[];
};
// availdata interface
type availdata = {
  startDate: Date;
  endDate: Date;
  distance: number;
};
// Listing interface
type ListingContent = {
  id: string;
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
  availability: availdata[];
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
  totalday: number;
  published: boolean;
  postedOn: string;
  reviews: {
    score: number;
    content: string;
  }[];
};
// Api response interface
type ApiResponseSpecific = {
  listing: ListingContent;
};
// Booking interface
export type Booking = {
  id: string;
  owner: string;
  dateRange: Availability;
  totalPrice: number;
  listingId: string;
  status: string;
};
// All bookings interface
export type AllBookings = {
  bookings: Booking[];
};
// Booking content interface
type BookingContent = {
  dateRange: Availability;
  totalPrice: number;
  status: string;
  id: string;
  bookingid: string;
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
  availability: availdata[];
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
  totalday: number;
  published: boolean;
  postedOn: string;
  reviews: {
    score: number;
    content: string;
  }[];
};
// css style
export const NullListing = styled('p')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'rgb(159, 159, 159)',
  fontSize: '14px',
  letterSpacing: '0.2px',
  backgroundColor: 'rgb(243, 243, 243)',
  width: '100%',
  height: '100%',
  borderRadius: '10px',
});
const ListingContentOwner = styled('div')({
  zIndex: '0',
  padding: '0px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
  overflowY: 'scroll',
});
const ListingContentdiv = styled('div')({
  zIndex: '0',
  padding: '20px',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});
const PublicReview = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  margin: '0px 15px 0px 0px',
  alignItems: 'center',
  padding: '0px',
});
const Publicstar = styled('img')({
  width: '15px',
  height: '15px',
  margin: '0px 0px 0px 5px',
  padding: '0px',
});
const PublicreviewRating = styled('p')({
  margin: '0px 0px 0px 3px',
  padding: '0px',
  fontSize: '15px',
  color: 'black',
  fontWeight: '300',
  letterSpacing: '0.5px',
});
const PublicListing = styled('div')({
  '@media (min-width: 550px)': {
    width: '50%',
  },
  '@media (min-width: 950px)': {
    width: '33%',
  },
  '@media (min-width: 1300px)': {
    width: '25%',
  },
  '@media (max-width: 550px)': {
    width: '100%',
  },
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
});
const IMGcontainer = styled('div')({
  padding: '10px 10px 0px 10px',
  position: 'relative',
});
const PublicListingImg = styled('img')({
  width: '100%',
  objectFit: 'cover',
  borderRadius: '20px',
  aspectRatio: '1 / 1',
});
const PublicBottom = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '5px 0px 0px 0px',
  alignItems: 'center',
});
const PublicListingTitle = styled('p')({
  fontSize: '15px',
  color: 'black',
  textAlign: 'left',
  margin: '0px 0px 0px 20px',
  padding: '0px',
  fontWeight: '500',
  textOverflow: 'ellipsis',
  overflowX: 'hidden',
  minHeight: '20px',
});
const PublicDate = styled('p')({
  margin: '0px 0px 0px 3px',
  padding: '0px',
  fontSize: '15px',
  color: 'black',
  textAlign: 'left',
  marginLeft: '20px',
  letterSpacing: '0.8px',
  fontWeight: '300',
});
const Publicprice = styled('p')({
  margin: '0px 0px 0px 3px',
  padding: '0px',
  fontSize: '14px',
  color: 'black',
  fontWeight: '500',
  textAlign: 'left',
  marginLeft: '20px',
});
const ListingRow = styled('div')({
  width: '100%',
  height: '150px',
  margin: '0px',
  alignItems: 'center',
  display: 'flex',
  borderBottom: '1px solid rgb(197, 197, 197)',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  },
});
const ListingRowR = styled('div')({
  width: '100%',
  height: '130px',
  margin: '0px',
  alignItems: 'center',
  display: 'flex',
  borderBottom: '1px solid rgb(197, 197, 197)',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  },
});
const ListingRowInDetail = styled('div')({
  width: '100%',
  height: '100px',
  margin: '0px',
  alignItems: 'center',
  display: 'flex',
  borderBottom: '1px solid rgb(197, 197, 197)',
  justifyContent: 'space-between',
});
export const LeftPart = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '0px',
  height: '100%',
  flex: '1',
});
const SmallListingImage = styled('img')({
  '@media (min-width: 480px)': {
    width: '100px',
    height: '100px',
  },
  '@media (max-width: 480px)': {
    width: '100px',
    height: '100px',
  },
  borderRadius: '10px',
  margin: '10px 15px 10px 10px',
  boxShadow: '0px 2px 5px 2px rgba(100, 100, 100, 0.5)',
  // border: '1px solid rgb(130, 130, 130)',
  objectFit: 'cover',
});
export const ListingInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '110px',
});
const ListingInfo2 = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 0px 0px 20px',
  width: '110px',
});
const ListingInfoR = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
const ListingType = styled('p')({
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '17px',
  fontWeight: '500',
});
const ListingTitle = styled('p')({
  width: '100px',
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '12px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});
const GuestInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const LogoPath = styled('img')({
  width: '13px',
  height: '13px',
});
const ListingGuest = styled('p')({
  textAlign: 'left',
  margin: '0px 10px 0px 5px',
  padding: '0px',
  fontSize: '12px',
  fontWeight: '400',
});
const ListingPrice = styled('p')({
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '12px',
  fontWeight: '500',
});
const ReviewBlock = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '0px 5px 0px 0px',
});
const ReviewPart = styled('div')({
  paddingTop: '0px',
  height: '100%',
  display: 'flex',
  aligItems: 'flex-start',
});
const RightButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
});
const ListingBtn = styled('button')({
  '@media (min-width: 450px)': {
    width: '80px',
  },
  '@media (max-width: 450px)': {
    width: '70px',
  },
  fontWeight: '500',
  height: '30px',
  minWidth: '70px',
  margin: '5px',
  fontSize: '12px',
  borderRadius: '10px',
  border: '0px',
  backgroundColor: 'white',
  boxShadow: '0px 1px 2px 1px rgba(121, 121, 121, 0.5)',
  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});
const BookingContentOwner = styled('div')({
  zIndex: '1',
  padding: '0px',
  width: '100%',
  minHeight: '300px',
  maxHeight: '300px',
  display: 'flex',
  overflow: 'scroll',
  flexDirection: 'column',
  borderBottom: '1px solid rgb(200,200,200)',
});
const BookingContentOwnerDetails = styled('div')({
  padding: '0px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const Pstatus = styled('div')({
  fontSize: '16px',
  fontWeight: '500',
  textAlign: 'center',
  marginBottom: '5px',
});
export const DateRange = styled('p')({
  '@media (max-width: 600px)': {
    width: '150px',
  },
  '@media (min-width: 600px)': {
    width: '300px',
  },
  width: '150px',
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '12px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});
const ReservingOwner = styled('div')({
  zIndex: '0',
  padding: '0px',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});
const ReservingRow = styled('div')({
  width: '100%',
  height: '130px',
  margin: '0px',
  alignItems: 'center',
  display: 'flex',
  borderBottom: '1px solid rgb(197, 197, 197)',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  },
});
const SmallListingImageReserving = styled('img')({
  '@media (min-width: 480px)': {
    width: '100px',
    height: '100px',
  },
  '@media (max-width: 480px)': {
    width: '50px',
    height: '50px',
  },
  borderRadius: '10px',
  margin: '10px 15px 10px 10px',
  boxShadow: '0px 2px 5px 2px rgba(100, 100, 100, 0.5)',
  // border: '1px solid rgb(130, 130, 130)',
  objectFit: 'cover',
});
const Earn = styled('p')({
  '@media (min-width: 500px)': {
    width: '200px',
  },
  '@media (max-width: 500px)': {
    width: '150px',
  },
  textAlign: 'left',
  margin: '0px',
  padding: '0px',
  fontSize: '12px',
});
const Accpet = styled('button')({
  '@media (min-width: 450px)': {
    width: '80px',
  },
  '@media (max-width: 450px)': {
    width: '70px',
  },
  fontWeight: '500',
  height: '30px',
  minWidth: '70px',
  margin: '5px',
  fontSize: '12px',
  borderRadius: '10px',
  color: '#006c0f',
  border: '0px',
  backgroundColor: 'white',
  boxShadow: '0px 1px 2px 1px rgba(121, 121, 121, 0.5)',
  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});
const Reject = styled('button')({
  '@media (min-width: 450px)': {
    width: '80px',
  },
  '@media (max-width: 450px)': {
    width: '70px',
  },
  fontWeight: '500',
  height: '30px',
  minWidth: '70px',
  margin: '5px',
  fontSize: '12px',
  borderRadius: '10px',
  color: '#8c0000',
  border: '0px',
  backgroundColor: 'white',
  boxShadow: '0px 1px 2px 1px rgba(121, 121, 121, 0.5)',
  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});
// css part end
// function part start
// this is the page for owner to see all the Hosting they have the order
export const GetAllListingOrdered = () => {
  // get the token from localstorage
  const token = localStorage.getItem('token');
  // if token is null, return null
  if (!token) {
    return null;
  }
  // get the context value from AppContext
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // use the navigate function from react-router-dom to redirect the page
  const navigate = useNavigate();
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the value from context
  const {
    MinPrice,
    MaxPrice,
    Checkin,
    Checkout,
    MinBed,
    MaxBed,
    sortWay,
    searchcontent,
  } = FilterValue;
  // inital the data state
  const [data, setData] = useState<ApiResponse>();
  // inital the all booing state
  const [allmybooking, setallmybooking] = useState<string[]>([]);
  // inital the final data state
  const [SpecificDatas, setSpecificData] = useState<ApiResponseSpecific[]>([]);
  // inital the loading state
  const [isLoadings, setIsLoadings] = useState(true);
  // set mounted to true
  const isMounted = useRef(true);
  // when the user click the listing, it will redirect to the detail page
  const DetailLooking = (HostingID: string) => {
    const userId = localStorage.getItem('LoggedUserEmail');
    // if the user is logged in, it will redirect to the logged in detail page
    if (localStorage.token) {
      navigate(`/user/${userId}/listing/${HostingID}/logged`);
    } else {
      // if the user is not logged in, it will redirect to the not logged in detail page
      navigate(`/listing/${HostingID}`);
    }
  };
  // check the conponemnt is mounted or not
  useEffect(() => {
    // 在组件卸载时取消未完成的异步操作
    return () => {
      isMounted.current = false;
    };
  }, []);
  // get the data from backend
  useEffect(() => {
    // get the token from localstorage
    const token = localStorage.getItem('token') || '';
    // call the api function
    callAPIget('bookings', token)
      .then((response) => {
        console.log(response);
        // if the component is mounted, set the data
        if (isMounted.current) {
          // set the data
          const theResponse = response as AllBookings;
          // filter the data not belong to the user and status is not declined
          const ownerData = theResponse.bookings.filter((items) => {
            return (
              items.owner === localStorage.getItem('LoggedUserEmail') &&
              items.status !== 'declined'
            );
          });
          // get all the listing id
          const Allid: string[] = [];
          // remove the duplicate id
          ownerData.forEach((item) => {
            if (!Allid.includes(String(item.listingId))) {
              Allid.push(item.listingId);
            }
          });
          // set the all booking id
          setallmybooking(Allid);
        }
      })
      .catch((error) => {
        // if the component is mounted, set the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // set the loading to false
        setIsLoadings(false); // 如果发生错误，也需要设置isLoading为false
      });
  }, []);
  useEffect(() => {
    // call the api function
    callAPIget('listings', '')
      .then((response) => {
        // get the min price and max price
        const Minp = MinPrice || 1;
        const Maxp = MaxPrice || 99999;
        // if the component is mounted, set the data
        if (isMounted.current) {
          // set the data
          const theResponse = response as ApiResponse;
          const ownerData = theResponse.listings;
          // filter the data satisfy the condition
          // price, title, address are all satisfy the condition
          const filterdata = ownerData.filter((item): item is ListingOver => {
            const address = item.address;
            const totalAddress = `${address.Street}, ${address.City}, ${address.State}, ${address.Postcode}, ${address.Country}`;
            return (
              item !== null &&
              allmybooking.includes(String(item.id)) === true &&
              Number(item.price) <= Maxp &&
              Number(item.price) >= Minp &&
              (item.title.includes(searchcontent) ||
                totalAddress.includes(searchcontent))
            );
          });
          // set the data
          setData({ listings: filterdata });
        }
      })
      .catch((error) => {
        // if the component is mounted, set the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // set the loading to false
        setIsLoadings(false);
      });
  }, [allmybooking]);
  useEffect(() => {
    // if the data is not null
    if (data && data.listings) {
      // for all the data, get the specific data
      const promises = data.listings.map((item) => {
        const token = localStorage.getItem('token') || '';
        // call the api function
        return callAPIget('listings/' + item.id, token)
          .then((response) => {
            // copy the data
            const r = response as ApiResponseSpecific;
            // set the id and score
            r.listing.id = String(item.id);
            const scor = r.listing.reviews;
            // if the score is not null, calculate the average score
            if (scor.length > 0) {
              // calculate the average score
              const sum = scor.reduce(
                (accumulator, item) => accumulator + item.score,
                0
              );
              const average = sum / scor.length;
              // set the score
              r.listing.score = average;
            } else {
              // if the score is null, set the score to 0
              r.listing.score = 0;
            }
            // return the data
            return r;
          })
          .catch((error) => {
            // if the component is mounted, set the error
            setOpenSnackbar({
              severity: 'error',
              message: meetError(error),
            });
            setOpenSnackbar({
              severity: 'error',
              message: '',
            });
            // set the loading to false
            return null; // 处理错误，返回一个默认值
          });
      });
      Promise.all(promises)
        .then((specificDataArray) => {
          // get the min bed and max bed
          const MinB = MinBed || 1;
          const MaxB = MaxBed || 99999;
          // if the component is mounted, set the data
          if (isMounted.current) {
            // filter the data satisfy the condition
            // condition: published, bed, checkin, checkout
            let NotNoneArray = specificDataArray.filter(
              (item): item is ApiResponseSpecific =>
                item !== null &&
                item.listing.published === true &&
                Number(item.listing.metadata.bedInfo.Bedrooms) <= MaxB &&
                Number(item.listing.metadata.bedInfo.Bedrooms) >= MinB
            );
            // if the checkin and checkout is not null, filter the data satisfy the condition
            if (Checkin && Checkout) {
              // filter the data satisfy the condition
              // condition: from checkin to checkout are available for the listing
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific => {
                  return item.listing.availability.some(
                    (items): items is availdata => {
                      return (
                        dayjs(items.startDate) <= dayjs(Checkin) &&
                        dayjs(items.endDate) >= dayjs(Checkout)
                      );
                    }
                  );
                }
              );
            } else if (Checkin) {
              // if only checkin is not null, filter the data satisfy the condition
              // if exist the data satisfy the condition, return true
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific =>
                  item.listing.availability.some(
                    (items): items is availdata => {
                      return (
                        dayjs(items.startDate) <= dayjs(Checkin) &&
                        dayjs(Checkin) <= dayjs(items.endDate)
                      );
                    }
                  )
              );
            } else if (Checkout) {
              // if only checkout is not null, filter the data satisfy the condition
              // if exist the data satisfy the condition, return true
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific =>
                  item.listing.availability.some(
                    (items): items is availdata =>
                      dayjs(items.endDate) >= dayjs(Checkout) &&
                      dayjs(items.startDate) <= dayjs(Checkout)
                  )
              );
            }
            // initialize the sorted data
            let sortedData;
            // if the sort way is null, sort the data by title
            if (sortWay === null) {
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  const titleA = a.listing.title.toLowerCase();
                  const titleB = b.listing.title.toLowerCase();
                  // sort the data by title
                  if (titleA < titleB) {
                    return -1;
                  } else if (titleA > titleB) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            } else if (sortWay === true) {
              // if the sort way is true, sort the data by score in descending order
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  const titleA = a.listing.score;
                  const titleB = b.listing.score;
                  // sort the data by score in descending order
                  if (titleA > titleB) {
                    return -1;
                  } else if (titleA < titleB) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            } else {
              // if the sort way is false, sort the data by score in ascending order
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  // sort the data by score in ascending order
                  const titleA = a.listing.score;
                  const titleB = b.listing.score;
                  if (titleA < titleB) {
                    return -1;
                  } else if (titleA > titleB) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            }
            // set the data
            setSpecificData(sortedData);
            // set the loading to false
            setIsLoadings(false);
          }
        })
        .catch((error) => {
          // if the component is mounted, set the error
          setOpenSnackbar({
            severity: 'error',
            message: meetError(error),
          });
          setOpenSnackbar({
            severity: 'error',
            message: '',
          });
          // set the loading to false
          if (isMounted.current) {
            setIsLoadings(false);
          }
        });
    }
  }, [data?.listings]);
  // initialize the content
  let content;
  // if is loading, show the loading
  if (isLoadings) {
    // loading
    content = <NullListing>All listing is comming...</NullListing>;
  } else if (SpecificDatas) {
    // if specific data is not null, show the data and the number of data larger than 0
    if (SpecificDatas.length > 0) {
      // show the data
      content = SpecificDatas.map((item) => (
        <PublicListing
          key={item.listing.id}
          onClick={() => {
            DetailLooking(item.listing.id);
          }}
        >
          <IMGcontainer>
            <PublicListingImg src={item.listing.thumbnail}></PublicListingImg>
          </IMGcontainer>
          <PublicBottom>
            <PublicListingTitle>{item.listing.title}</PublicListingTitle>
            <PublicReview>
              <Publicstar src='/img/star.png'></Publicstar>
              <PublicreviewRating>
                {String(item.listing.score.toFixed(2))}
              </PublicreviewRating>
              <Publicstar src='/img/Guest.png'></Publicstar>
              <PublicreviewRating>
                {String(item.listing.reviews.length)}
              </PublicreviewRating>
            </PublicReview>
          </PublicBottom>
          <PublicDate>
            {dayjs(item.listing.availability[0]?.startDate).format(
              'MM/DD/YYYY'
            ) +
              '—' +
              dayjs(item.listing.availability[0]?.endDate).format('MM/DD/YYYY')}
          </PublicDate>
          <Publicprice>${item.listing.price} AUD</Publicprice>
        </PublicListing>
      ));
    } else {
      content = <NullListing>Seems there not exist any listing</NullListing>;
    }
  } else {
    // if the data is null, show the hint
    content = <NullListing>Seems there not exist any listing</NullListing>;
  }
  return token ? <ListingContentdiv>{content}</ListingContentdiv> : null;
};
// this is the page for owner to see all the listing
export const GetAllListing = () => {
  // get the error context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // use the navigate to jump to the other page
  const navigate = useNavigate();
  // get the app context
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // inital the data from the context
  const {
    MinPrice,
    MaxPrice,
    Checkin,
    Checkout,
    MinBed,
    MaxBed,
    sortWay,
    searchcontent,
  } = FilterValue;
  //  initialize a state to store the data from the backend
  const [data, setData] = useState<ApiResponse>();
  // initialize a state to store the data from the backend
  const [allmybooking, setallmybooking] = useState<string[]>(['-']);
  // initialize a state to store the data from the backend
  const [SpecificDatas, setSpecificData] = useState<ApiResponseSpecific[]>([]);
  // initialize a state to check if the data is loading
  const [isLoading, setIsLoading] = useState(true);
  // use ref to check if the component is mounted
  const isMounted = useRef(true);
  // when the button is clicked, go to the detail page
  const DetailLooking = (HostingID: string) => {
    // get the user id from the local storage
    const userId = localStorage.getItem('LoggedUserEmail');
    // if the token is not null, go to the detail page
    if (localStorage.token) {
      navigate(`/user/${userId}/listing/${HostingID}/logged`);
    } else {
      navigate(`/listing/${HostingID}`);
    }
  };
  // when the component is unmounted, cancel the async function
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  // when the component is mounted, get the data from the backend
  useEffect(() => {
    // get the token from the local storage
    const token = localStorage.getItem('token');
    // if the token is null, return
    if (!token) {
      setallmybooking([]);
      return;
    }
    // fetch the data from the backend
    callAPIget('bookings', token)
      .then((response) => {
        // if the component is mounted, set the data
        console.log(response);
        if (isMounted.current) {
          // set the data
          const theResponse = response as AllBookings;
          // filter the data with the booking is the owner and the status is not declined
          const ownerData = theResponse.bookings.filter((items) => {
            return (
              items.owner === localStorage.getItem('LoggedUserEmail') &&
              items.status !== 'declined'
            );
          });
          // inital the allid array
          const Allid: string[] = [];
          // remove the duplicate id
          ownerData.forEach((item) => {
            if (!Allid.includes(String(item.listingId))) {
              Allid.push(item.listingId);
            }
          });
          // set the data
          setallmybooking(Allid);
        }
      })
      .catch((error) => {
        // if the component is mounted, set the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // if the component is mounted, set the error
        setIsLoading(false);
      });
  }, [localStorage.getItem('token')]);
  // when the component is mounted, get the data from the backend
  useEffect(() => {
    callAPIget('listings', '')
      .then((response) => {
        // set the min price and max price
        const Minp = MinPrice || 1;
        const Maxp = MaxPrice || 99999;
        // if the component is mounted, set the data
        if (isMounted.current) {
          // set the data
          const theResponse = response as ApiResponse;
          const ownerData = theResponse.listings;
          // filter the data with the price and the search content
          const filterdata = ownerData.filter((item): item is ListingOver => {
            const address = item.address;
            const totalAddress = `${address.Street}, ${address.City}, ${address.State}, ${address.Postcode}, ${address.Country}`;
            return (
              item !== null &&
              allmybooking.includes(String(item.id)) === false &&
              Number(item.price) <= Maxp &&
              Number(item.price) >= Minp &&
              (item.title.includes(searchcontent) ||
                totalAddress.includes(searchcontent))
            );
          });
          // set the data
          setData({ listings: filterdata });
        }
      })
      .catch((error) => {
        // if the component is mounted, set the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // if the component is mounted, set the error
        setIsLoading(false);
      });
  }, [allmybooking]);
  // when the component is mounted, get the data from the backend
  useEffect(() => {
    // if the data is not null, get the specific data
    if (data && data.listings) {
      // get the specific data
      const promises = data.listings.map((item) => {
        // get the current data
        const token = localStorage.getItem('token') || '';
        return callAPIget('listings/' + item.id, token)
          .then((response) => {
            // for each data, get the id score and reviews
            const r = response as ApiResponseSpecific;
            r.listing.id = String(item.id);
            const scor = r.listing.reviews;
            // calculate the average score
            if (scor.length > 0) {
              const sum = scor.reduce(
                (accumulator, item) => accumulator + item.score,
                0
              );
              const average = sum / scor.length;
              // set the score
              r.listing.score = average;
            } else {
              // if the score is null, set the score to 0
              r.listing.score = 0;
            }
            return r;
          })
          .catch((error) => {
            // if the component is mounted, set the error
            setOpenSnackbar({
              severity: 'error',
              message: meetError(error),
            });
            setOpenSnackbar({
              severity: 'error',
              message: '',
            });
            // return null because of the error
            return null;
          });
      });
      // when all the promises are resolved, set the data
      Promise.all(promises)
        .then((specificDataArray) => {
          // get the min and max bed
          const MinB = MinBed || 1;
          const MaxB = MaxBed || 99999;
          if (isMounted.current) {
            // filter the null value and the published value is true and the bed is in the range
            let NotNoneArray = specificDataArray.filter(
              (item): item is ApiResponseSpecific =>
                item !== null &&
                item.listing.published === true &&
                Number(item.listing.metadata.bedInfo.Bedrooms) <= MaxB &&
                Number(item.listing.metadata.bedInfo.Bedrooms) >= MinB
            );
            // filter the data with the checkin and checkout
            if (Checkin && Checkout) {
              // filter the data with the checkin and checkout
              // if exist a daterange is available, then return the true
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific => {
                  return item.listing.availability.some(
                    (items): items is availdata => {
                      return (
                        dayjs(items.startDate) <= dayjs(Checkin) &&
                        dayjs(items.endDate) >= dayjs(Checkout)
                      );
                    }
                  );
                }
              );
            } else if (Checkin) {
              // if only exist the checkin, then filter the data with the checkin
              // if exist a daterange is available, then return the true
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific =>
                  item.listing.availability.some(
                    (items): items is availdata => {
                      return (
                        dayjs(items.startDate) <= dayjs(Checkin) &&
                        dayjs(Checkin) <= dayjs(items.endDate)
                      );
                    }
                  )
              );
            } else if (Checkout) {
              // if only exist the checkout, then filter the data with the checkout
              // if exist a daterange is available, then return the true
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific =>
                  item.listing.availability.some(
                    (items): items is availdata =>
                      dayjs(items.endDate) >= dayjs(Checkout) &&
                      dayjs(items.startDate) <= dayjs(Checkout)
                  )
              );
            }
            // sort the data
            let sortedData;
            if (sortWay === null) {
              // if the sortway is null, then sort the data with the title
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  const titleA = a.listing.title.toLowerCase();
                  const titleB = b.listing.title.toLowerCase();
                  // set the order
                  if (titleA < titleB) {
                    return -1;
                  } else if (titleA > titleB) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            } else if (sortWay === true) {
              // if the sortway is true, then sort the data with the score in descending order
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  const titleA = a.listing.score;
                  const titleB = b.listing.score;
                  if (titleA > titleB) {
                    return -1;
                  } else if (titleA < titleB) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            } else {
              // if the sortway is false, then sort the data with the score in ascending order
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  const titleA = a.listing.score;
                  const titleB = b.listing.score;
                  if (titleA < titleB) {
                    return -1;
                  } else if (titleA > titleB) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            }
            // set the data
            setSpecificData(sortedData);
            // set the loading to false
            setIsLoading(false);
          }
        })
        .catch((error) => {
          // if the component is mounted, set the error
          setOpenSnackbar({
            severity: 'error',
            message: meetError(error),
          });
          setOpenSnackbar({
            severity: 'error',
            message: '',
          });
          // set the loading to false
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  }, [data?.listings]);
  // initialize the content
  let content;
  // if the data is loading, show the loading
  if (isLoading) {
    // if the data is loading, show the loading
    content = <NullListing>All listing is comming...</NullListing>;
  } else if (SpecificDatas) {
    // if the data is not loading, show the data
    if (SpecificDatas.length > 0) {
      // if the data is loaded and not empty, render the data
      content = SpecificDatas.map((item) => (
        <PublicListing
          key={item.listing.id}
          onClick={() => {
            DetailLooking(item.listing.id);
          }}
        >
          <IMGcontainer>
            <PublicListingImg src={item.listing.thumbnail}></PublicListingImg>
          </IMGcontainer>
          <PublicBottom>
            <PublicListingTitle>{item.listing.title}</PublicListingTitle>
            <PublicReview>
              <Publicstar src='/img/star.png'></Publicstar>
              <PublicreviewRating>
                {String(item.listing.score.toFixed(2))}
              </PublicreviewRating>
              <Publicstar src='/img/Guest.png'></Publicstar>
              <PublicreviewRating>
                {String(item.listing.reviews.length)}
              </PublicreviewRating>
            </PublicReview>
          </PublicBottom>
          <PublicDate>
            {dayjs(item.listing.availability[0]?.startDate).format(
              'MM/DD/YYYY'
            ) +
              '—' +
              dayjs(item.listing.availability[0]?.endDate).format('MM/DD/YYYY')}
          </PublicDate>
          <Publicprice>${item.listing.price} AUD</Publicprice>
        </PublicListing>
      ));
    } else {
      // if the data is loaded and empty, render the empty
      content = <NullListing>Seems there not exist any listing</NullListing>;
    }
  } else {
    // if the data is loaded and empty, render the empty
    content = <NullListing>Seems there not exist any listing</NullListing>;
  }
  return <ListingContentdiv>{content}</ListingContentdiv>;
};
// this is the page for the hoster to see all the listing they have
export const GetAllOwnerListing = () => {
  // get the context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // initialize the state to store the data from backend
  const [data, setData] = useState<ApiResponse>();
  const [SpecificDatas, setSpecificData] = useState<ApiResponseSpecific[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // use ref to track the component is mounted or not
  const isMounted = useRef(true);
  // initialize the state to control the useeffect re-render
  const [eff1, seteff1] = useState(true);
  const [eff2, seteff2] = useState(true);
  // use navigate to redirect the page
  const navigate = useNavigate();
  // use the useeffect to get the data from backend
  useEffect(() => {
    // when the component is unmounted, cancel the async function
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    // when the component is mounted, get the data from backend
    callAPIget('listings', '')
      .then((response) => {
        // if the component is mounted, set the data
        if (isMounted.current) {
          // set the data
          const theResponse = response as ApiResponse;
          // filter the data with the owner
          const ownerData = theResponse.listings.filter((items) => {
            return items.owner === localStorage.getItem('LoggedUserEmail');
          });
          // set the data
          setData({ listings: ownerData });
          // open the eff2 to re-render the component
          seteff2(!eff2);
        }
      })
      .catch((error) => {
        // if the component is mounted, set the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // if mistake happens, set the loading to false
        setIsLoading(false);
      });
  }, [eff1]);
  // use the useeffect to get the data from backend
  useEffect(() => {
    // if the data is not empty, get the specific data
    if (data && data.listings) {
      console.log(data);
      // open a promise all to get the specific data
      const promises = data.listings.map((item) => {
        console.log(item);
        // get the token
        const token = localStorage.getItem('token') || '';
        // get the specific data
        return callAPIget('listings/' + item.id, token)
          .then((response) => {
            // set the data and set the id and average score
            const r = response as ApiResponseSpecific;
            r.listing.id = String(item.id);
            const scor = r.listing.reviews;
            // calculate the average score
            if (scor.length > 0) {
              const sum = scor.reduce(
                (accumulator, item) => accumulator + item.score,
                0
              );
              const average = sum / scor.length;
              r.listing.score = average;
            } else {
              // if there is no review, set the score to 0
              r.listing.score = 0;
            }
            return r;
          })
          .catch((error) => {
            // if the component is mounted, set the error
            setOpenSnackbar({
              severity: 'error',
              message: meetError(error),
            });
            setOpenSnackbar({
              severity: 'error',
              message: '',
            });
            // if mistake happens, return null
            return null;
          });
      });
      // open a promise all to get the specific data
      Promise.all(promises)
        .then((specificDataArray) => {
          // if the component is mounted, set the data
          console.log(specificDataArray);
          if (isMounted.current) {
            // filter the null value
            const filteredSpecificDataArray = specificDataArray.filter(
              (item): item is ApiResponseSpecific => item !== null
            );
            // setspecific data
            setSpecificData(filteredSpecificDataArray);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          // when the component is mounted, set the error
          setOpenSnackbar({
            severity: 'error',
            message: meetError(error),
          });
          setOpenSnackbar({
            severity: 'error',
            message: '',
          });
          // set the loading to false
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  }, [data?.listings]);
  // when the button is clicked, redirect to the edit page
  const EditHosting = (HostingID: string) => {
    const userId = localStorage.getItem('LoggedUserEmail');
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/edit/${HostingID}`);
    } else {
      navigate('/login');
    }
  };
  // delete the hosting when the button is clicked
  const DeleteHosting = (HostingID: string) => {
    const token = localStorage.getItem('token') || '';
    // call the delete api
    callAPIdelete('listings/' + HostingID, token)
      .then(() => {
        // set the open snackbar
        setOpenSnackbar({
          severity: 'success',
          message: 'Your hosting has been Deleted !',
        });
        // set the open snackbar
        setOpenSnackbar({
          severity: 'success',
          message: '',
        });
        // re-render the component
        seteff1(!eff1);
      })
      .catch((error) => {
        // set the open snackbar
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        // set the open snackbar
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
      });
  };
  // when the button is clicked, redirect to the publish page
  const PublishHosting = (HostingID: string) => {
    const userId = localStorage.getItem('LoggedUserEmail');
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/publish/${HostingID}`);
    } else {
      navigate('/login');
    }
  };
  // when the button is clicked, unpublish the hosting
  const unPublishHosting = (HostingID: string) => {
    // call the backend api
    const token = localStorage.getItem('token') || '';
    callAPIput('listings/unpublish/' + HostingID, {}, token)
      .then(() => {
        // when success, set the open snackbar
        setOpenSnackbar({
          severity: 'success',
          message: 'Your hosting has been successfully downgraded !',
        });
        setOpenSnackbar({
          severity: 'success',
          message: '',
        });
        // rerender the component
        seteff1(!eff1);
      })
      .catch((error) => {
        // when error, set the open snackbar
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
      });
  };
  // initialize the content
  let content;
  if (isLoading) {
    // if the data is loading, show the loading information
    content = <NullListing>Data is comming...</NullListing>;
  } else if (SpecificDatas) {
    if (SpecificDatas.length > 0) {
      // if the data is loaded and not empty, render the data
      content = SpecificDatas.map((item, index) => (
        <ListingRow key={index}>
          <LeftPart>
            <SmallListingImage src={item.listing.thumbnail}></SmallListingImage>
            <ListingInfo>
              <ListingType>{item.listing.metadata.type}</ListingType>
              <ListingTitle>{item.listing.title}</ListingTitle>
              <GuestInfo>
                <LogoPath src='/img/bath.png'></LogoPath>
                <ListingGuest>
                  {item.listing.metadata.bedInfo.Bathrooms}
                </ListingGuest>
                <LogoPath src='/img/bed.png'></LogoPath>
                <ListingGuest>
                  {item.listing.metadata.bedInfo.Beds}
                </ListingGuest>
              </GuestInfo>
              <ListingPrice>${item.listing.price} AUD</ListingPrice>
              <ReviewPart>
                <ReviewBlock>
                  <Publicstar src='/img/star.png'></Publicstar>
                  <PublicreviewRating>
                    {String(item.listing.score.toFixed(2))}
                  </PublicreviewRating>
                </ReviewBlock>
                <ReviewBlock>
                  <Publicstar src='/img/profile.png'></Publicstar>
                  <PublicreviewRating>
                    {item.listing.reviews.length}
                  </PublicreviewRating>
                </ReviewBlock>
              </ReviewPart>
            </ListingInfo>
          </LeftPart>
          <RightButton>
            <ListingBtn
              onClick={() => {
                if (item.listing.published) {
                  unPublishHosting(String(data?.listings[index]?.id));
                } else {
                  PublishHosting(String(data?.listings[index]?.id));
                }
              }}
            >
              {item.listing.published ? 'UnPublish' : 'Publish'}
            </ListingBtn>
            <ListingBtn
              onClick={() => {
                EditHosting(String(data?.listings[index]?.id));
              }}
            >
              Edit
            </ListingBtn>
            <ListingBtn
              onClick={() => {
                DeleteHosting(String(data?.listings[index]?.id));
              }}
            >
              Delete
            </ListingBtn>
            {/* <ListingBtn>Delete</ListingBtn> */}
          </RightButton>
        </ListingRow>
      ));
    } else {
      // if the data is loaded and empty, show the empty information
      content = <NullListing>Seems there not exist any listing</NullListing>;
    }
  } else {
    // if the data is empty, show the empty information
    content = <NullListing>Seems there not exist any listing</NullListing>;
  }

  return <ListingContentOwner>{content}</ListingContentOwner>;
};
// this is the page for the owner to see all the bookings
export const GetAllOwnerBooking = () => {
  // get the error context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the setOpenSnackbar function
  const { setOpenSnackbar } = ErrorValue;
  // initialize a state to store the data from backend
  const [data, setData] = useState<AllBookings>();
  const [SpecificDatas, setSpecificData] = useState<BookingContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // use ref to track whether the component is still mounted
  const isMounted = useRef(true);
  const navigate = useNavigate();
  // when the button clicked, redirect to the detail page
  const showDetail = (index: number) => {
    const HostingId = SpecificDatas[index]?.id;
    if (HostingId) {
      const userId = localStorage.getItem('LoggedUserEmail');
      if (localStorage.token) {
        navigate(`/user/${userId}/listing/${HostingId}/logged`);
      }
    }
  };
  // when the button is clicked, goes to the review page
  const GoesReview = (index: number) => {
    // get the hosting id and booking id
    const HostingId = SpecificDatas[index]?.id;
    const BookingId = SpecificDatas[index]?.bookingid || '';
    localStorage.setItem('BookingId', BookingId);
    // if the user is logged in, redirect to the review page
    if (HostingId) {
      const userId = localStorage.getItem('LoggedUserEmail');
      if (localStorage.token) {
        navigate(`/user/${userId}/listing/${HostingId}/logged/review`);
      } else {
        navigate('/login');
      }
    }
  };
  useEffect(() => {
    // cancel the unfinished async function when the component unmounted
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    // when the component mounted, get the data from backend in the appropriate lifecycle or other
    const token = localStorage.getItem('token') || '';
    callAPIget('bookings', token)
      .then((response) => {
        console.log(response);
        if (isMounted.current) {
          const theResponse = response as AllBookings;
          // filter the data to get the data that the owner is related to and status is not declined
          const ownerData = theResponse.bookings.filter((items) => {
            return (
              items.owner === localStorage.getItem('LoggedUserEmail') &&
              items.status !== 'declined'
            );
          });
          // set the data to the state
          setData({ bookings: ownerData });
        }
      })
      .catch((error) => {
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // if error happens, we also need to set isLoading to false
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && data.bookings) {
      // if the data is loaded and not empty, show the data
      const promises = data.bookings.map((item) => {
        // get the token
        const token = localStorage.getItem('token') || '';
        return callAPIget('listings/' + item.listingId, token)
          .then((response) => {
            const r = response as ApiResponseSpecific;
            // set the id and bookingid and dateRange and totalPrice and status
            const result = r.listing as BookingContent;
            result.id = String(item.listingId);
            result.bookingid = String(item.id);
            result.dateRange = item.dateRange;
            result.totalPrice = item.totalPrice;
            result.status = item.status;
            return result;
          })
          .catch((error) => {
            // show the error message
            setOpenSnackbar({
              severity: 'error',
              message: meetError(error),
            });
            setOpenSnackbar({
              severity: 'error',
              message: '',
            });
            // return null if there is an error
            return null;
          });
      });
      Promise.all(promises)
        .then((specificDataArray) => {
          if (isMounted.current) {
            // filter out the null values
            const filteredSpecificDataArray = specificDataArray.filter(
              (item): item is BookingContent =>
                item !== null && item.published === true
            );
            // set the result to the state
            setSpecificData(filteredSpecificDataArray);
            // set the loading state to false
            setIsLoading(false);
          }
        })
        .catch((error) => {
          // show the error message
          setOpenSnackbar({
            severity: 'error',
            message: meetError(error),
          });
          setOpenSnackbar({
            severity: 'error',
            message: '',
          });
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  }, [data]);
  let content;
  if (isLoading) {
    // if the data is loading, show the loading information
    content = <NullListing>Data is comming...</NullListing>;
  } else if (SpecificDatas) {
    if (SpecificDatas.length > 0) {
      // if the data is loaded and not empty, render the data
      content = SpecificDatas.map((item, index) => (
        <ListingRow key={index}>
          <LeftPart
            onClick={() => {
              showDetail(index);
            }}
          >
            <SmallListingImage src={item.thumbnail}></SmallListingImage>
            <ListingInfo>
              <ListingType>{item.metadata.type}</ListingType>
              <DateRange>
                {dayjs(item.dateRange.startDate).format('MM/DD/YYYY') +
                  ' - ' +
                  dayjs(item.dateRange.endDate).format('MM/DD/YYYY')}
              </DateRange>
              <GuestInfo>
                <LogoPath src='/img/bath.png'></LogoPath>
                <ListingGuest>{item.metadata.bedInfo.Bathrooms}</ListingGuest>
                <LogoPath src='/img/bed.png'></LogoPath>
                <ListingGuest>{item.metadata.bedInfo.Beds}</ListingGuest>
              </GuestInfo>
              <ListingPrice>${item.totalPrice.toFixed(2)} AUD</ListingPrice>
            </ListingInfo>
          </LeftPart>
          <RightButton>
            <ReviewBlock>
              <Pstatus>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Pstatus>
            </ReviewBlock>
            <ListingBtn
              onClick={() => {
                GoesReview(index);
              }}
              disabled={item.status === 'pending'}
            >
              Review
            </ListingBtn>
            {/* <ListingBtn>Delete</ListingBtn> */}
          </RightButton>
        </ListingRow>
      ));
    } else {
      // if there is no data, show a message
      content = <NullListing>There are no eligible orders.</NullListing>;
    }
  } else {
    // if data is empty, show a message
    content = <NullListing>There are no eligible orders.</NullListing>;
  }

  return <BookingContentOwner>{content}</BookingContentOwner>;
};
// this is the page for the owner to see all the booking for a specific listing
export const GetAllOwnerBookingListing = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // set the state for the datas
  const { HostingId } = useParams();
  const [data, setData] = useState<AllBookings>();
  const [isLoading, setIsLoading] = useState(true);
  // use ref to track whether the component is still mounted
  const isMounted = useRef(true);
  // use the navigate hook
  const navigate = useNavigate();
  // when this button is clicked, it will go to the review page
  const GoesReview = (index: number) => {
    // ge1t the booking id
    const BookingId = data?.bookings[index]?.id || '';
    // set the booking id to the local storage
    localStorage.setItem('BookingId', BookingId);
    // get the hosting id
    if (HostingId) {
      // get the user id
      const userId = localStorage.getItem('LoggedUserEmail');
      // if the user is logged in, go to the review page
      if (localStorage.token) {
        navigate(`/user/${userId}/listing/${HostingId}/logged/review`);
      } else {
        navigate('/login');
      }
    }
  };
  // use the effect hook to determine whether the component is mounted
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  // when the component is mounted, get the data from the backend
  useEffect(() => {
    // get the token
    const token = localStorage.getItem('token') || '';
    // if the token is empty, return null
    callAPIget('bookings', token)
    // if the token is not empty, get the data from the backend
      .then((response) => {
        // log the response
        console.log(response);
        // if the component is mounted, set the data to the state
        if (isMounted.current) {
          // set the data to the state
          const theResponse = response as AllBookings;
          // filter out the data that is not related to the current user
          const ownerData = theResponse.bookings.filter((items) => {
            return (
              items.owner === localStorage.getItem('LoggedUserEmail') &&
              items.listingId === HostingId
            );
          });
          // set the data to the state
          setData({ bookings: ownerData });
          // if the data is loaded, set the loading to false
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // if there is an error, log the error
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // if some error happens, set the loading to false
        setIsLoading(false);
      });
  }, [localStorage.getItem('NewBooking')]);
  // initialize the content
  let content;
  // if the data is loading, show the loading message
  if (isLoading) {
    // if the data is loading, show the loading message
    content = <NullListing>Data is comming...</NullListing>;
  } else if (data) {
    // if the data is not empty, show the data
    if (data.bookings.length > 0) {
      content = data.bookings.map((item, index) => (
        <ListingRowInDetail key={index}>
          <LeftPart>
            <ListingInfo2>
              <ListingType>Your order</ListingType>
              <DateRange>Order id: {item.id}</DateRange>
              <DateRange>
                {dayjs(item.dateRange.startDate).format('MM/DD/YYYY') +
                  ' - ' +
                  dayjs(item.dateRange.endDate).format('MM/DD/YYYY')}
              </DateRange>
              <ListingPrice>${item.totalPrice.toFixed(2)} AUD</ListingPrice>
            </ListingInfo2>
          </LeftPart>
          <RightButton>
            <ReviewBlock>
              <Pstatus>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Pstatus>
            </ReviewBlock>
            <ListingBtn
              onClick={() => {
                GoesReview(index);
              }}
              disabled={item.status === 'pending'}
            >
              Review
            </ListingBtn>
            {/* <ListingBtn>Delete</ListingBtn> */}
          </RightButton>
        </ListingRowInDetail>
      ));
    } else {
      // if there is no data, content is null
      content = null;
    }
  } else {
    // if the data is empty, content is null
    // 如果数据为空，显示一个提示
    content = null;
  }
  return <BookingContentOwnerDetails>{content}</BookingContentOwnerDetails>;
};
// this is the page for the hoster to see all the booking about their listing
export const GetAllBookingRequest = () => {
  // get the error context
  const ErrorValue = useContext(ErrorContext);
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  const { setOpenSnackbar } = ErrorValue;
  // Specify the state for the datas
  const [SpecificDatas, setSpecificData] = useState<BookingContent[]>([]);
  // if the data is loading, show the loading message
  const [isLoading, setIsLoading] = useState(true);
  // use this to set the page refresh
  const [hooktoupdate, sethook] = useState(false);
  // use ref to track whether the component is still mounted
  const isMounted = useRef(true);
  // 在组件卸载时取消未完成的异步操作
  // when the component is unmounted, cancel the async function
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  // when the component is mounted, get the data from the backend
  useEffect(() => {
    // if the token is empty, return null
    const token = localStorage.getItem('token') || '';
    // Step 1
    // get the data from the backend
    callAPIget('bookings', token)
      .then((response) => {
        // if the component is mounted, set the data to the state
        if (isMounted.current) {
          // get all booking
          const AllBoooking = response as AllBookings;
          // filter out the data that the status is pending
          AllBoooking.bookings = AllBoooking.bookings.filter(
            (item) => item.status === 'pending'
          );
          // Step2
          // get all the listing that the user owned
          callAPIget('listings', '')
            .then((response) => {
              // if the component is mounted, set the data to the state
              if (isMounted.current) {
                // get all the listing
                const theResponse = response as ApiResponse;
                // filter out the listing that the user owned
                const ownerData = theResponse.listings.filter((items) => {
                  return (
                    items.owner === localStorage.getItem('LoggedUserEmail')
                  );
                });
                // initialize the array
                const ALLmylisting: string[] = [];
                // just get the id of the listing
                ownerData.forEach((item) => {
                  ALLmylisting.push(String(item.id));
                });
                // step 3
                // get the listing that the user owned and the booking is pending
                if (AllBoooking && ALLmylisting) {
                  console.log(ALLmylisting);
                  // filter out the booking that the user owned and the booking is pending
                  const fillteredBooking: Booking[] =
                    AllBoooking.bookings.filter((item) => {
                      return ALLmylisting.includes(String(item.listingId));
                    });
                  // start a promise to get the specific data
                  // for each booking, get the specific data
                  const promises = fillteredBooking.map((item) => {
                    const token = localStorage.getItem('token') || '';
                    return callAPIget('listings/' + item.listingId, token)
                      .then((response) => {
                        // if the component is mounted, set the data to the state
                        const r = response as ApiResponseSpecific;
                        const result = r.listing as BookingContent;
                        // set the id and the date range and the total price and the status and the owner
                        // to the result
                        result.id = String(item.id);
                        result.dateRange = item.dateRange;
                        result.totalPrice = item.totalPrice;
                        result.status = item.status;
                        result.owner = item.owner;
                        // return the result
                        return result;
                      })
                      .catch((error) => {
                        // if the component is mounted, set the data to the state
                        setOpenSnackbar({
                          severity: 'error',
                          message: meetError(error),
                        });
                        // set the data to null
                        setOpenSnackbar({
                          severity: 'error',
                          message: '',
                        });
                        // because have error, return null
                        return null;
                      });
                  });
                  // when all the promise is done, set the data to the state
                  Promise.all(promises)
                    .then((specificDataArray) => {
                      // if the component is mounted, set the data to the state
                      if (isMounted.current) {
                        // filter out the null value
                        const filteredSpecificDataArray =
                          specificDataArray.filter(
                            (item): item is BookingContent => item !== null
                          );
                        // set the data to the state
                        setSpecificData(filteredSpecificDataArray);
                        // set the loading to false
                        setIsLoading(false);
                      }
                    })
                    .catch((error) => {
                      // if the component is mounted, set the data to the state
                      setOpenSnackbar({
                        severity: 'error',
                        message: meetError(error),
                      });
                      setOpenSnackbar({
                        severity: 'error',
                        message: '',
                      });
                      // set the loading to false
                      if (isMounted.current) {
                        setIsLoading(false);
                      }
                    });
                }
              }
            })
            .catch((error) => {
              // if the component is mounted, set the data to the state
              setOpenSnackbar({
                severity: 'error',
                message: meetError(error),
              });
              setOpenSnackbar({
                severity: 'error',
                message: '',
              });
              // if the mistake happened, set the loading to false
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        // if the component is mounted, set the data to the state
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // if the mistake happened, set the loading to false
        setIsLoading(false);
      });
  }, [hooktoupdate]);
  // get the token
  const token = localStorage.getItem('token') || '';
  // accept the request
  const RequestAccept = (id: string) => {
    // call the backend
    callAPIput('bookings/accept/' + String(id), {}, token)
      .then(() => {
        // show the message
        setOpenSnackbar({
          severity: 'info',
          message: 'You accepted a booking.',
        });
        // show the message
        setOpenSnackbar({
          severity: 'info',
          message: '',
        });
        // update the data
        sethook(!hooktoupdate);
      })
      .catch((error) => {
        // show the message
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        // show the message
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
      });
  };
  const RequestReject = (id: string) => {
    // call the backend
    callAPIput('bookings/decline/' + String(id), {}, token)
      .then(() => {
        // show the message
        setOpenSnackbar({
          severity: 'info',
          message: 'You rejecred a booking.',
        });
        // show the message
        setOpenSnackbar({
          severity: 'info',
          message: '',
        });
        // update the data
        sethook(!hooktoupdate);
      })
      .catch((error) => {
        // show the message
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        // show the message
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
      });
  };
  // initialize the content
  let content;
  // if the data is loading, show the loading
  if (isLoading) {
    // if the data is loading, show the loading
    content = <NullListing>Data is comming...</NullListing>;
  } else if (SpecificDatas) {
    // if the data is loaded, show the data
    if (SpecificDatas.length > 0) {
      // if the data is loaded and not empty, show the data
      content = SpecificDatas.map((item) => (
        // map the data and show the data
        <ReservingRow key={item.id}>
          <LeftPart>
            <SmallListingImageReserving
              src={item.thumbnail}
            ></SmallListingImageReserving>
            <ListingInfo>
              <DateRange>
                {item.owner} booked your {item.metadata.type}
              </DateRange>
              <DateRange>{item.title}</DateRange>
              <DateRange>
                {dayjs(item.dateRange.startDate).format('MM/DD/YYYY') +
                  ' - ' +
                  dayjs(item.dateRange.endDate).format('MM/DD/YYYY')}
              </DateRange>
              <GuestInfo>
                <LogoPath src='/img/bath.png'></LogoPath>
                <ListingGuest>{item.metadata.bedInfo.Bathrooms}</ListingGuest>
                <LogoPath src='/img/bed.png'></LogoPath>
                <ListingGuest>{item.metadata.bedInfo.Beds}</ListingGuest>
              </GuestInfo>
              <Earn>Earn: ${item.totalPrice.toFixed(2)} AUD</Earn>
            </ListingInfo>
          </LeftPart>
          <RightButton>
            <ReviewBlock>
              <Pstatus>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Pstatus>
            </ReviewBlock>
            <Accpet
              onClick={() => {
                RequestAccept(item.id);
              }}
              disabled={item.status !== 'pending'}
            >
              Accept
            </Accpet>
            <Reject
              onClick={() => {
                RequestReject(item.id);
              }}
              disabled={item.status !== 'pending'}
            >
              Reject
            </Reject>
          </RightButton>
        </ReservingRow>
      ));
    } else {
      content = null;
    }
  } else {
    // 如果数据为空，显示一个提示
    content = null;
  }

  return <ReservingOwner>{content}</ReservingOwner>;
};
// this is the history of all bookings in a specific listing
export const GetAllOwnerListingSummary = () => {
  // use the navigate hook
  const navigate = useNavigate();
  // set the error value
  const ErrorValue = useContext(ErrorContext);
  // if the error value is null, return null
  if (!ErrorValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
  // get the setOpenSnackbar
  const { setOpenSnackbar } = ErrorValue;
  //  initialize a state to store the data from backend
  const [SpecificDatas, setSpecificData] = useState<ApiResponseSpecific[]>([]);
  // initialize a state to store the data from backend
  const [isLoading, setIsLoading] = useState(true);
  // use the hook to update the data
  const isMounted = useRef(true);
  // use the effect when the component is mounted
  useEffect(() => {
    // when the component is unmounted, cancel the async function
    return () => {
      // set the mounted to false
      isMounted.current = false;
    };
  }, []);
  // use the hook to update the data
  useEffect(() => {
    // when the component is mounted, get the data from backend
    const token = localStorage.getItem('token') || '';
    // Step 1
    callAPIget('bookings', token)
      .then((response) => {
        // if the component is mounted, set the data
        if (isMounted.current) {
          // get the data
          const AllBoooking = response as AllBookings;
          // Step2
          callAPIget('listings', '')
            .then((response) => {
              // if the data is mounted, set the data
              if (isMounted.current) {
                // get the response
                const theResponse = response as ApiResponse;
                // get the owner data filter by the email
                const ownerData = theResponse.listings.filter((items) => {
                  return (
                    items.owner === localStorage.getItem('LoggedUserEmail')
                  );
                });
                // initialize the array to srore the id and number
                const ALLmylisting: string[] = [];
                const ALLmyNumber: number[] = [];
                // get the owner data filter by the email
                ownerData.forEach((item) => {
                  // set the total day to 0
                  let totalday = 0;
                  // get the total day
                  AllBoooking.bookings.forEach((items) => {
                    // if the listing id is the same, add the total day
                    if (items.listingId === String(item.id)) {
                      totalday += items.dateRange.distance;
                    }
                  });
                  // push the data to the array
                  ALLmyNumber.push(totalday);
                  // push the id to the array
                  ALLmylisting.push(String(item.id));
                });
                // set all the data
                if (AllBoooking && ALLmylisting && ALLmyNumber) {
                  console.log(ALLmylisting);
                  // filter the listing
                  const fillteredListing: string[] = ALLmylisting;
                  // for all the listing, get the data
                  const promises = fillteredListing.map((item, index) => {
                    // get the token
                    const token = localStorage.getItem('token') || '';
                    // call the api to get the data
                    return callAPIget('listings/' + item, token)
                      .then((response) => {
                        // get the response
                        const r = response as ApiResponseSpecific;
                        // set the total day and id to the data
                        r.listing.totalday = ALLmyNumber[index] || 0;
                        r.listing.id = item;
                        return r;
                      })
                      .catch((error) => {
                        // show the error message
                        setOpenSnackbar({
                          severity: 'error',
                          message: meetError(error),
                        });
                        // show the error message
                        setOpenSnackbar({
                          severity: 'error',
                          message: '',
                        });
                        // return null
                        return null;
                      });
                  });
                  // after all the promises, set the data
                  Promise.all(promises)
                    .then((specificDataArray) => {
                      if (isMounted.current) {
                        // filter all the null value
                        const filteredSpecificDataArray =
                          specificDataArray.filter(
                            (item): item is ApiResponseSpecific => item !== null
                          );
                        // get specific data
                        setSpecificData(filteredSpecificDataArray);
                        // set the loading to false
                        setIsLoading(false);
                      }
                    })
                    .catch((error) => {
                      // show the error message
                      setOpenSnackbar({
                        severity: 'error',
                        message: meetError(error),
                      });
                      // show the error message
                      setOpenSnackbar({
                        severity: 'error',
                        message: '',
                      });
                      // set the loading to false
                      if (isMounted.current) {
                        setIsLoading(false);
                      }
                    });
                }
              }
            })
            .catch((error) => {
              // show the error message
              setOpenSnackbar({
                severity: 'error',
                message: meetError(error),
              });
              // show the error message
              setOpenSnackbar({
                severity: 'error',
                message: '',
              });
              // set the loading to false
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        // show the error message
        setOpenSnackbar({
          severity: 'error',
          message: meetError(error),
        });
        // show the error message
        setOpenSnackbar({
          severity: 'error',
          message: '',
        });
        // set the loading to false
        setIsLoading(false);
      });
  }, []);
  // this function is to show the history of a listing
  const ShowHistory = (HostingId: number) => {
    // get the user id
    const userId = localStorage.getItem('LoggedUserEmail');
    console.log(userId);
    // get the token
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/myresveration/history/${HostingId}`);
    } else {
      navigate('/login');
    }
  };
  // this function is to set the content
  let content;
  // if the data is loading
  if (isLoading) {
    // show the loading message
    content = <NullListing>Data is comming...</NullListing>;
  } else if (SpecificDatas) {
    if (SpecificDatas.length > 0) {
      // if the data is loaded and not empty, render the data
      content = SpecificDatas.map((item) => (
        <ListingRowR
          key={item.listing.id}
          onClick={() => {
            ShowHistory(Number(item.listing.id));
          }}
        >
          <LeftPart>
            <SmallListingImage src={item.listing.thumbnail}></SmallListingImage>
            <ListingInfoR>
              <ListingType>{item.listing.metadata.type}</ListingType>
              <ListingTitle>{item.listing.title}</ListingTitle>
              <ListingPrice>
                Yearly Booked: {item.listing.totalday} Day
              </ListingPrice>
              <ListingPrice>
                Yearly Earn: $
                {Number(item.listing.price) * item.listing.totalday} AUD
              </ListingPrice>
              <ListingPrice>
                Published{' '}
                {item.listing.postedOn
                  ? GetDistance(new Date(item.listing.postedOn), new Date()) ===
                    0
                    ? 'Today'
                    : GetDistance(new Date(item.listing.postedOn), new Date()) +
                      ' Days Ago'
                  : 'Private'}
              </ListingPrice>
            </ListingInfoR>
          </LeftPart>
        </ListingRowR>
      ));
    } else {
      // if the data is loaded and empty, show the message
      content = <NullListing>Seems there not exist any listing</NullListing>;
    }
  } else {
    // if the data is empty, show the message
    content = <NullListing>Seems there not exist any listing</NullListing>;
  }
  // return the content
  return <ListingContentOwner>{content}</ListingContentOwner>;
};
