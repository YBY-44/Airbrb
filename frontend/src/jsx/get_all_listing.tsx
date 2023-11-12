import { callAPIget } from './API';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { meetError, AppContext } from '../App';
import { styled } from '@mui/material';
import dayjs from 'dayjs';
import {
  useNavigate,
  BrowserRouter as Router,
  // useParams,
  Route,
  Routes,
} from 'react-router-dom';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// 可以添加其他属性，以匹配实际响应的数据结构
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
type ApiResponse = {
  listings: ListingOver[];
};
type availdata = {
  startDate: Date;
  endDate: Date;
  distance: number;
};
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
  published: boolean;
  postedOn: string;
  reviews: {
    score: number;
    content: string;
  }[];
};
type ApiResponseSpecific = {
  listing: ListingContent;
};
const NullListing = styled('p')({
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
const ListingContent = styled('div')({
  zIndex: '0',
  padding: '20px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
  overflowY: 'scroll',
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
  margin: '0px',
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
  padding: '10px',
  cursor: 'pointer',
});
const IMGcontainer = styled('div')({
  width: '100%',
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
export const GetAllListing = () => {
  const navigate = useNavigate();
  const FilterValue = useContext(AppContext);
  if (!FilterValue) {
    // Handle the case where contextValue is null (optional)
    return null;
  }
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
  const [data, setData] = useState<ApiResponse>(); // 初始化一个状态来存储从后端获取的数据
  const [SpecificDatas, setSpecificData] = useState<ApiResponseSpecific[]>([]); // 初始化一个状态来存储从后端获取的数据
  const [isLoading, setIsLoading] = useState(true); // 初始化一个状态来表示数据是否正在加载
  const isMounted = useRef(true); // 使用 ref 来跟踪组件是否仍然挂载
  const DetailLooking = (HostingID: string) => {
    const userId = localStorage.getItem('LoggedUserEmail');
    if (localStorage.token) {
      navigate(`/user/${userId}/listing/${HostingID}`);
    } else {
      navigate(`/listing/${HostingID}`);
    }
  };
  useEffect(() => {
    // 在组件卸载时取消未完成的异步操作
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    // 在组件挂载时或其他适当的生命周期中从后端获取数据
    // 你可以使用axios、fetch或其他方法来获取数据
    callAPIget('listings', '')
      .then((response) => {
        const Minp = MinPrice || 1;
        const Maxp = MaxPrice || 99999;
        if (isMounted.current) {
          const theResponse = response as ApiResponse;
          const ownerData = theResponse.listings;
          const filterdata = ownerData.filter((item): item is ListingOver => {
            const address = item.address;
            const totalAddress = `${address.Street}, ${address.City}, ${address.State}, ${address.Postcode}, ${address.Country}`;
            return (
              item !== null &&
              Number(item.price) <= Maxp &&
              Number(item.price) >= Minp &&
              (item.title.includes(searchcontent) ||
                totalAddress.includes(searchcontent))
            );
          });
          setData({ listings: filterdata });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // 如果发生错误，也需要设置isLoading为false
      });
  }, []);

  useEffect(() => {
    if (data && data.listings) {
      const promises = data.listings.map((item) => {
        const token = localStorage.getItem('token') || '';
        return callAPIget('listings/' + item.id, token)
          .then((response) => {
            const r = response as ApiResponseSpecific;
            r.listing.id = String(item.id);
            const scor = r.listing.reviews;
            if (scor.length > 0) {
              const sum = scor.reduce(
                (accumulator, item) => accumulator + item.score,
                0
              );
              const average = sum / scor.length;
              r.listing.score = average;
            } else {
              r.listing.score = 0;
            }
            return r;
          })
          .catch((error) => {
            meetError(error);
            return null; // 处理错误，返回一个默认值
          });
      });
      Promise.all(promises)
        .then((specificDataArray) => {
          const MinB = MinBed || 1;
          const MaxB = MaxBed || 99999;
          if (isMounted.current) {
            // 过滤掉可能为null的值
            let NotNoneArray = specificDataArray.filter(
              (item): item is ApiResponseSpecific =>
                item !== null &&
                item.listing.published === true &&
                Number(item.listing.metadata.bedInfo.Beds) <= MaxB &&
                Number(item.listing.metadata.bedInfo.Beds) >= MinB
            );
            if (Checkin && Checkout) {
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
              NotNoneArray = NotNoneArray.filter(
                (item): item is ApiResponseSpecific =>
                  item.listing.availability.some(
                    (items): items is availdata =>
                      dayjs(items.endDate) >= dayjs(Checkout) &&
                      dayjs(items.startDate) <= dayjs(Checkout)
                  )
              );
            }
            let sortedData;
            if (sortWay === null) {
              sortedData = NotNoneArray.sort(
                (a: ApiResponseSpecific, b: ApiResponseSpecific) => {
                  const titleA = a.listing.title.toLowerCase();
                  const titleB = b.listing.title.toLowerCase();
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
            setSpecificData(sortedData);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  }, [data]);
  let content;
  if (isLoading) {
    // 如果数据正在加载，显示加载中信息
    content = <NullListing>All listing is comming...</NullListing>;
  } else if (SpecificDatas) {
    if (SpecificDatas.length > 0) {
      console.log(SpecificDatas);
      // 如果数据已加载并且不为空，渲染数据
      content = SpecificDatas.map((item) => (
        <PublicListing
          key={item.listing.id}
          onClick={() => {
            DetailLooking(item.listing.id);
          }}
        >
          {/* 在这里渲染每条数据 */}
          <IMGcontainer>
            <PublicListingImg src={item.listing.thumbnail}></PublicListingImg>
          </IMGcontainer>
          <PublicBottom>
            <PublicListingTitle>{item.listing.title}</PublicListingTitle>
            <PublicReview>
              <Publicstar src='/img/star.png'></Publicstar>
              <PublicreviewRating>
                {String(item.listing.score)}
              </PublicreviewRating>
            </PublicReview>
          </PublicBottom>
          <PublicDate>
            {dayjs(item.listing.availability[0]?.startDate).format(
              'YYYY/MM/DD'
            ) +
              '—' +
              dayjs(item.listing.availability[0]?.endDate).format('YYYY/MM/DD')}
          </PublicDate>
          <Publicprice>${item.listing.price} AUD</Publicprice>
        </PublicListing>
      ));
    }
  } else {
    // 如果数据为空，显示一个提示
    content = <NullListing>Seems there not exist any listing</NullListing>;
  }
  return <ListingContent>{content}</ListingContent>;
};
const ListingRow = styled('div')({
  width: '100%',
  height: '100px',
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
const LeftPart = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '0px',
  height: '100%',
});
const SmallListingImage = styled('img')({
  '@media (min-width: 480px)': {
    width: '80px',
    height: '80px',
  },
  '@media (max-width: 480px)': {
    width: '40px',
    height: '40px',
  },
  borderRadius: '10px',
  margin: '10px 15px 10px 10px',
  boxShadow: '0px 2px 5px 2px rgba(100, 100, 100, 0.5)',
  // border: '1px solid rgb(130, 130, 130)',
  objectFit: 'cover',
});
const ListingInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '110px',
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
});
const ReviewPart = styled('div')({
  paddingTop: '10px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  aligItems: 'flex-start',
});

const RightButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
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
  letterSpacing: '0.3px',
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
});
export const GetAllOwnerListing = () => {
  const [data, setData] = useState<ApiResponse>(); // 初始化一个状态来存储从后端获取的数据
  const [SpecificDatas, setSpecificData] = useState<ApiResponseSpecific[]>([]); // 初始化一个状态来存储从后端获取的数据
  const [isLoading, setIsLoading] = useState(true); // 初始化一个状态来表示数据是否正在加载
  const isMounted = useRef(true); // 使用 ref 来跟踪组件是否仍然挂载
  const navigate = useNavigate();
  useEffect(() => {
    // 在组件卸载时取消未完成的异步操作
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    // 在组件挂载时或其他适当的生命周期中从后端获取数据
    // 你可以使用axios、fetch或其他方法来获取数据
    callAPIget('listings', '')
      .then((response) => {
        if (isMounted.current) {
          const theResponse = response as ApiResponse;
          const ownerData = theResponse.listings.filter((items) => {
            return items.owner === localStorage.getItem('LoggedUserEmail');
          });
          setData({ listings: ownerData });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // 如果发生错误，也需要设置isLoading为false
      });
  }, []);

  useEffect(() => {
    if (data && data.listings) {
      console.log(data);
      const promises = data.listings.map((item) => {
        console.log(item);
        const token = localStorage.getItem('token') || '';
        return callAPIget('listings/' + item.id, token)
          .then((response) => response as ApiResponseSpecific)
          .catch((error) => {
            meetError(error);
            return null; // 处理错误，返回一个默认值
          });
      });
      Promise.all(promises)
        .then((specificDataArray) => {
          console.log(specificDataArray);
          if (isMounted.current) {
            // 过滤掉可能为null的值
            const filteredSpecificDataArray = specificDataArray.filter(
              (item): item is ApiResponseSpecific => item !== null
            );
            setSpecificData(filteredSpecificDataArray);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  }, [data]);
  const EditHosting = (HostingID: string) => {
    const userId = localStorage.getItem('LoggedUserEmail');
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/edit/${HostingID}`);
    } else {
      navigate('/login');
    }
  };
  const PublishHosting = (HostingID: string) => {
    const userId = localStorage.getItem('LoggedUserEmail');
    if (localStorage.token) {
      navigate(`/user/${userId}/hosting/publish/${HostingID}`);
    } else {
      navigate('/login');
    }
  };
  const unPublishHosting = (HostingID: string) => {
    console.log(HostingID);
    return null;
  };
  let content;
  if (isLoading) {
    // 如果数据正在加载，显示加载中信息
    content = <NullListing>Data is comming...</NullListing>;
  } else if (SpecificDatas) {
    if (SpecificDatas.length > 0) {
      console.log(SpecificDatas);
      // 如果数据已加载并且不为空，渲染数据
      content = SpecificDatas.map((item, index) => (
        <ListingRow key={index}>
          {/* 在这里渲染每条数据 */}
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
            </ListingInfo>
            <ReviewPart>
              <ReviewBlock>
                <Publicstar src='/img/star.png'></Publicstar>
                <PublicreviewRating>1.32</PublicreviewRating>
              </ReviewBlock>
              <ReviewBlock>
                <Publicstar src='/img/profile.png'></Publicstar>
                <PublicreviewRating>
                  {item.listing.reviews.length}
                </PublicreviewRating>
              </ReviewBlock>
            </ReviewPart>
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
            {/* <ListingBtn>Delete</ListingBtn> */}
          </RightButton>
        </ListingRow>
      ));
    } else {
      content = <NullListing>Seems there not exist any listing</NullListing>;
    }
  } else {
    // 如果数据为空，显示一个提示
    content = <NullListing>Seems there not exist any listing</NullListing>;
  }

  return <ListingContentOwner>{content}</ListingContentOwner>;
};
