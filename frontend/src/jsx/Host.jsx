// src/components/HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LogoutModel } from '../App';

export const getAllReservations = () => {
  console.log('111');
};

export const ReservingContent = () => {
  return NaN;
};
export const CreateHosting = () => {
  const [AllImages, setSelectedImage] = useState([]);

  const AddImage = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // 更新已选文件数组
      setSelectedImage([...AllImages, ...files]);
    }
  };
  const ClickUpload = () => {
    document.getElementById('upload').click();
  };
  const navigate = useNavigate();
  const [lengthOfTitle, setlength] = useState(0);
  const setnewlength = (e) => {
    const newLength = e.length;
    setlength(newLength);
  };
  const [HostingType, setType] = useState(null);

  const ChangeType = (event) => {
    setType(event.target.id);
  };

  const goesHost = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/hosting/myhosting`);
  };
  const setPrice = () => {
    return document.getElementById('price').value;
  };
  const setBeds = () => {
    return {
      Guests:
        document.getElementById('Guests').value ||
        document.getElementById('Guests').placeholder,
      Bedrooms:
        document.getElementById('Bedrooms').value ||
        document.getElementById('Bedrooms').placeholder,
      Beds:
        document.getElementById('Beds').value ||
        document.getElementById('Beds').placeholder,
      Bathrooms:
        document.getElementById('Bathrooms').value ||
        document.getElementById('Bathrooms').placeholder,
    };
  };
  const setAddress = () => {
    return {
      Country: document.getElementById('country').value,
      Street: document.getElementById('street').value,
      City: document.getElementById('city').value,
      State: document.getElementById('state').value,
      Postcode: document.getElementById('postcode').value,
    };
  };
  const setItems = () => {
    return {
      'Wi-Fi': document.getElementById('Wi-Fi').checked,
      TV: document.getElementById('TV').checked,
      Kitchen: document.getElementById('Wi-Fi').checked,
      'Washing machine': document.getElementById('Washing machine').checked,
      'Air conditioning': document.getElementById('Air conditioning').checked,
      'Free Parking': document.getElementById('Free Parking').checked,
    };
  };
  const settitle = () => {
    const titles = document.getElementById('hosting-title');
    const titleContent = titles.value;
    setnewlength(titleContent);
    return titleContent;
  };
  const CreatNow = () => {
    const datas = {
      title: String(settitle()),
      price: String(setPrice()),
      type: HostingType,
      address: setAddress(),
      metadata: {
        bedInfo: setBeds(),
        otherInfo: setItems(),
      },
    };
    console.log(datas);
  };
  return (
    <div className='cnh-overall'>
      <div className='cnh-header'>
        <div className='d-flex h-100'>
          <img src='/img/logo_p.png' className='logo'></img>
        </div>
        <div className='max-width-100 d-flex h-100 justify-content-center'>
          <p
            className='h-100 d-flex align-items-center justify-content-center cursor-pointer hosting cnh-header-right'
            onClick={goesHost}
          >
            Exit
          </p>
        </div>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q1-q'>Which of these best describes your place?</p>
        <div className='cnh-Q1-answer'>
          <input
            type='radio'
            className='Q1-s'
            name='accommodation'
            id='house'
            onClick={ChangeType}
          />
          <label htmlFor='house' className='Q1-S'>
            House
          </label>

          <input
            type='radio'
            className='Q1-s'
            name='accommodation'
            id='apartment'
            onClick={ChangeType}
          />
          <label htmlFor='apartment' className='Q1-S'>
            Apartment
          </label>

          <input
            type='radio'
            className='Q1-s'
            name='accommodation'
            id='cabin'
            onClick={ChangeType}
          />
          <label htmlFor='cabin' className='Q1-S'>
            Cabin
          </label>

          <input
            type='radio'
            className='Q1-s'
            name='accommodation'
            id='hotel'
            onClick={ChangeType}
          />
          <label htmlFor='hotel' className='Q1-S'>
            Hotel
          </label>
        </div>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q2-q'>Tell us about your address</p>
        <p className='cnh-Q2-q-sub'>
          Your address is only shared with guests after they’ve made a
          reservation.
        </p>
        <div className='cnh-Q2-answer'>
          <div className='cnh-Q2-answer-row' tabIndex={0}>
            <label className='cnh-Q2-answer-label'>Country/Region</label>
            <input className='cnh-Q2-answer-input' id='country'></input>
          </div>
          <div className='cnh-Q2-answer-row' tabIndex={0}>
            <label className='cnh-Q2-answer-label'>Street address</label>
            <input className='cnh-Q2-answer-input' id='street'></input>
          </div>
          <div className='cnh-Q2-answer-row' tabIndex={0}>
            <label className='cnh-Q2-answer-label'>Suburb/city</label>
            <input className='cnh-Q2-answer-input' id='city'></input>
          </div>
          <div className='cnh-Q2-answer-row' tabIndex={0}>
            <label className='cnh-Q2-answer-label'>State/territory</label>
            <input className='cnh-Q2-answer-input' id='state'></input>
          </div>
          <div className='cnh-Q2-answer-row last' tabIndex={0}>
            <label className='cnh-Q2-answer-label'>Postcode</label>
            <input className='cnh-Q2-answer-input' id='postcode'></input>
          </div>
        </div>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q2-q'>Share some basics about your place</p>
        <p className='cnh-Q2-q-sub'>
          You’ll add more details later, like bed types.
        </p>
        <div className='cnh-Q3-answer'>
          <div className='cnh-Q3-answer-row' tabIndex={0}>
            <label className='cnh-Q3-answer-label'>Guests</label>
            <input
              className='cnh-Q3-answer-input'
              placeholder='1'
              maxLength='2'
              id='Guests'
            ></input>
          </div>
          <div className='cnh-Q3-answer-row' tabIndex={0}>
            <label className='cnh-Q3-answer-label'>Bedrooms</label>
            <input
              className='cnh-Q3-answer-input'
              placeholder='1'
              maxLength='2'
              id='Bedrooms'
            ></input>
          </div>
          <div className='cnh-Q3-answer-row' tabIndex={0}>
            <label className='cnh-Q3-answer-label'>Beds</label>
            <input
              className='cnh-Q3-answer-input'
              placeholder='1'
              maxLength='2'
              id='Beds'
            ></input>
          </div>
          <div className='cnh-Q3-answer-row' tabIndex={0}>
            <label className='cnh-Q3-answer-label'>Bathrooms</label>
            <input
              className='cnh-Q3-answer-input'
              placeholder='1'
              maxLength='2'
              id='Bathrooms'
            ></input>
          </div>
        </div>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q4-q'>Tell guests what your place has to offer</p>
        <p className='cnh-Q2-q-sub'>
          You can add more amenities after you publish your listing.
        </p>
        <div className='cnh-Q1-answer'>
          <input
            type='checkbox'
            className='Q4-s'
            name='accommodation'
            id='Wi-Fi'
          />
          <label htmlFor='Wi-Fi' className='Q4-S'>
            Wi-Fi
          </label>
          <input
            type='checkbox'
            className='Q4-s'
            name='accommodation'
            id='TV'
          />
          <label htmlFor='TV' className='Q4-S'>
            TV
          </label>
          <input
            type='checkbox'
            className='Q4-s'
            name='accommodation'
            id='Kitchen'
          />
          <label htmlFor='Kitchen' className='Q4-S'>
            Kitchen
          </label>
          <input
            type='checkbox'
            className='Q4-s'
            name='accommodation'
            id='Washing machine'
          />
          <label htmlFor='Washing machine' className='Q4-S'>
            Washing machine
          </label>
          <input
            type='checkbox'
            className='Q4-s'
            name='accommodation'
            id='Air conditioning'
          />
          <label htmlFor='Air conditioning' className='Q4-S'>
            Air conditioning
          </label>
          <input
            type='checkbox'
            className='Q4-s'
            name='accommodation'
            id='Free Parking'
          />
          <label htmlFor='Free Parking' className='Q4-S'>
            Free Parking
          </label>
        </div>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q5-q'>Now, let‘s give your barn a title</p>
        <p className='cnh-Q2-q-sub'>
          Short titles work best. Have fun with it—you can always change it
          later.
        </p>
        <div className='cnh-Q1-answer'>
          <textarea
            id='hosting-title'
            className='cnh-Q5-answer'
            maxLength={32}
            onChange={settitle}
          ></textarea>
        </div>
        <p className='length-detector'>{lengthOfTitle}/32</p>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q5-q'>Now, set your price</p>
        <p className='cnh-Q2-q-sub'>You can change it anytime.</p>
        <div className='cnh-Q6-answer'>
          <p className='cnh-Q6-answer'>$</p>
          <input
            id='price'
            className='cnh-Q6-answer'
            placeholder='0'
            maxLength={5}
          ></input>
          <p className='cnh-Q6-answer-small'>/day</p>
        </div>
      </div>
      <div className='cnh-Q1'>
        <p className='cnh-Q5-q'>Add some photos of your barn</p>
        <p className='cnh-Q2-q-sub'>
          You’ll need at least 1 photos to get started. You can add more or make
          changes later.
        </p>
        <div className='cnh-Q7-answer'>
          <input
            id='upload'
            onChange={AddImage}
            className='hidden'
            type='file'
            accept='image/*'
          ></input>
          <button className='upload-button' onClick={ClickUpload}>
            Upload from your device
          </button>
        </div>
        <div>
          {AllImages.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Selected ${index + 1}`}
                className='cnh-Q7-answer'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='cnh-Q1 d-flex justify-content-center'>
        <button className='btn btn-primary btn-change' onClick={CreatNow}>
          Creat your hosting
        </button>
      </div>
    </div>
  );
};
export const SmallHostPage = () => {
  const [isOpen, setOpen] = useState(false);
  const TargetMenu = useRef(null);
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const ClickOther = (event) => {
    if (TargetMenu.current && !TargetMenu.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      // 如果菜单是打开的，添加事件监听器来处理点击页面其他地方的事件
      document.addEventListener('click', ClickOther);
    } else {
      // 如果菜单是关闭的，移除事件监听器
      document.removeEventListener('click', ClickOther);
    }
    return () => {
      // 在组件卸载时，移除事件监听器，以防止内存泄漏
      document.removeEventListener('click', ClickOther);
    };
  }, [isOpen]); // 当 isMenuOpen 改变时，重新设置事件监听器
  return (
    <div className='SmallHomePage'>
      <div ref={TargetMenu}>
        <LogoutModel isOpen={isOpen} istop={true} />
      </div>
      <div className='row banner_height w-100 zeropd'>
        <div className='w-100 d-flex h-100 align-items-center justify-content-center '>
          <div className='height-60 width-90 d-flex border_circle pd-7  justify-content-center search-hover'>
            <input
              placeholder=' Anywhere   |   Any week   |   Add guests '
              className='header_search width-90 h-100 border-0 pd-10'
            ></input>
            <div className='align-items-center search_bg h-100  justify-content-center rounded-circle'>
              <img
                src='/img/search.png'
                className='h-100 search-img cursor-pointer'
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className='small-center-homepage'></div>
      <div className='footer_height'>
        <div className='homepage-bottom'>
          <img src='/img/search.png' className='footer_logo_1'></img>
          <p className=''>Explore</p>
        </div>
        <Routes>
          <Route
            path='/user/:userId'
            element={
              <div className='homepage-bottom' onClick={ClickProfile}>
                <img src='/img/logged.png' className='footer_logo_2'></img>
                <p>Profile</p>
              </div>
            }
          />
          <Route
            path='*'
            element={
              <div className='homepage-bottom' onClick={ClickProfile}>
                <img src='/img/profile.png' className='footer_logo_2'></img>
                <p>Log in</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export const HostingContent = () => {
  return (
    <div className='center-content'>
      <div className='center-title'>
        <p className='header-subtxt'>Your Hosting</p>
      </div>
      <div className='content'></div>
    </div>
  );
};
export const LargeHostPage = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const TargetMenu = useRef(null);
  const [activeTab, setActiveTab] = useState('hosting');
  const ClickProfile = () => {
    setOpen(!isOpen);
  };
  const ClickCreatListing = () => {
    const userId = localStorage.getItem('LoggedUserEmail');
    navigate(`/user/${userId}/CreateListing`);
  };
  const ClickOther = (event) => {
    if (TargetMenu.current && !TargetMenu.current.contains(event.target)) {
      setOpen(false);
    }
  };
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
  useEffect(() => {
    if (isOpen) {
      // 如果菜单是打开的，添加事件监听器来处理点击页面其他地方的事件
      document.addEventListener('click', ClickOther);
    } else {
      // 如果菜单是关闭的，移除事件监听器
      document.removeEventListener('click', ClickOther);
    }
    return () => {
      // 在组件卸载时，移除事件监听器，以防止内存泄漏
      document.removeEventListener('click', ClickOther);
    };
  }, [isOpen]); // 当 isMenuOpen 改变时，重新设置事件监听器
  return (
    <div className='text-center w-100'>
      <div ref={TargetMenu}>
        <LogoutModel isOpen={isOpen} istop={true} />
      </div>
      <div className='row banner_height w-100 zeropd'>
        <div className='remain d-flex h-100'>
          <img src='/img/logo_p.png' className='logo'></img>
        </div>
        <div className='max-width-100 d-flex h-100'>
          <p
            className={`h-100 d-flex align-items-center justify-content-center cursor-pointer d-hosting ${
              activeTab === 'hosting' ? 'selected' : ''
            }`}
            onClick={goesHost}
            id='hos'
          >
            All hosting
          </p>
        </div>
        <div className='max-width-170 d-flex h-100'>
          <p
            className={`h-100 d-flex align-items-center justify-content-center cursor-pointer d-hosting ${
              activeTab === 'reserving' ? 'selected' : ''
            }`}
            onClick={goesReservation}
            id='rsv'
          >
            All reservations
          </p>
        </div>
        <div className='max-width-50'>
          <p
            onClick={goseHome}
            className='h-100 d-flex align-items-center justify-content-center cursor-pointer hosting'
          >
            Switch to listing
          </p>
        </div>
        <div className='max-width margin-left-15  h-100 d-flex align-items-center justify-content-center'>
          <div
            className='max-width shadow-hover height-60 border_circle width-70 d-flex align-items-center justify-content-center cursor-pointer'
            onClick={ClickProfile}
          >
            <img src='/img/more.png' className='height-40 '></img>
            <img
              src='/img/logged.png'
              className='height-80 margin-left-15'
            ></img>
          </div>
        </div>
      </div>
      <div className='w-100 center'>
        <div className='center-header'>
          <p className='header-txt'>
            Welcome, {localStorage.getItem('LoggedUserEmail')}!
          </p>
          <button className='header-btn' onClick={ClickCreatListing}>
            Create your listing
          </button>
        </div>
        <Routes>
          <Route path='/myreservation' element={<ReservingContent />} />
          <Route path='/myhosting' element={<HostingContent />} />
        </Routes>
      </div>
    </div>
  );
};
