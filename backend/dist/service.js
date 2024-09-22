"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateListing = exports.unpublishListing = exports.save = exports.resourceLock = exports.reset = exports.removeListing = exports.removeBooking = exports.register = exports.publishListing = exports.makeNewBooking = exports.logout = exports.login = exports.leaveListingReview = exports.getListingDetails = exports.getEmailFromAuthorization = exports.getAllListings = exports.getAllBookings = exports.declineBooking = exports.assertOwnsListing = exports.assertOwnsBooking = exports.addListing = exports.acceptBooking = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _asyncLock = _interopRequireDefault(require("async-lock"));
var _error = require("./error");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var lock = new _asyncLock["default"]();
var JWT_SECRET = 'giraffegiraffebeetroot';
var DATABASE_FILE = './database.json';

/***************************************************************
                       State Management
***************************************************************/

var users = {};
var listings = {};
var bookings = {};
var update = function update(users, listings, bookings) {
  return new Promise(function (resolve, reject) {
    lock.acquire('saveData', function () {
      try {
        _fs["default"].writeFileSync(DATABASE_FILE, JSON.stringify({
          users: users,
          listings: listings,
          bookings: bookings
        }, null, 2));
        resolve();
      } catch (error) {
        reject(new Error('Writing to database failed'));
      }
    });
  });
};
var save = exports.save = function save() {
  return update(users, listings, bookings);
};
var reset = exports.reset = function reset() {
  update({}, {}, {});
  users = {};
  listings = {};
  bookings = {};
};
try {
  var data = JSON.parse(_fs["default"].readFileSync(DATABASE_FILE));
  users = data.users;
  listings = data.listings;
  bookings = data.bookings;
} catch (error) {
  console.log('WARNING: No database found, create a new one');
  save();
}

/***************************************************************
                       Helper Functions
***************************************************************/

var newListingId = function newListingId(_) {
  return generateId(Object.keys(listings));
};
var newBookingId = function newBookingId(_) {
  return generateId(Object.keys(bookings));
};
var resourceLock = exports.resourceLock = function resourceLock(callback) {
  return new Promise(function (resolve, reject) {
    lock.acquire('resourceLock', callback(resolve, reject));
  });
};
var randNum = function randNum(max) {
  return Math.round(Math.random() * (max - Math.floor(max / 10)) + Math.floor(max / 10));
};
var generateId = function generateId(currentList) {
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999999999;
  var R = randNum(max);
  while (currentList.includes(R)) {
    R = randNum(max);
  }
  return R.toString();
};

/***************************************************************
                       Auth Functions
***************************************************************/

var getEmailFromAuthorization = exports.getEmailFromAuthorization = function getEmailFromAuthorization(authorization) {
  try {
    var token = authorization.replace('Bearer ', '');
    var _jwt$verify = _jsonwebtoken["default"].verify(token, JWT_SECRET),
      email = _jwt$verify.email;
    if (!(email in users)) {
      throw new _error.AccessError('Invalid Token');
    }
    return email;
  } catch (error) {
    throw new _error.AccessError('Invalid Token');
  }
};
var login = exports.login = function login(email, password) {
  return resourceLock(function (resolve, reject) {
    if (!email) {
      return reject(new _error.InputError('Must provide an email for user login'));
    } else if (!password) {
      return reject(new _error.InputError('Must provide a password for user login'));
    } else if (email && email in users) {
      if (users[email].password === password) {
        users[email].sessionActive = true;
        resolve(_jsonwebtoken["default"].sign({
          email: email
        }, JWT_SECRET, {
          algorithm: 'HS256'
        }));
      }
    }
    return reject(new _error.InputError('Invalid email or password'));
  });
};
var logout = exports.logout = function logout(email) {
  return resourceLock(function (resolve, reject) {
    users[email].sessionActive = false;
    resolve();
  });
};
var register = exports.register = function register(email, password, name) {
  return resourceLock(function (resolve, reject) {
    if (!email) {
      return reject(new _error.InputError('Must provide an email for user registration'));
    } else if (!password) {
      return reject(new _error.InputError('Must provide a password for user registration'));
    } else if (!name) {
      return reject(new _error.InputError('Must provide a name for user registration'));
    } else if (email && email in users) {
      return reject(new _error.InputError('Email address already registered'));
    } else {
      users[email] = {
        name: name,
        password: password,
        sessionActive: true
      };
      var token = _jsonwebtoken["default"].sign({
        email: email
      }, JWT_SECRET, {
        algorithm: 'HS256'
      });
      resolve(token);
    }
  });
};

/***************************************************************
                       Listing Functions
***************************************************************/

var newListingPayload = function newListingPayload(title, owner, address, price, thumbnail, metadata) {
  return {
    title: title,
    owner: owner,
    address: address,
    price: price,
    thumbnail: thumbnail,
    metadata: metadata,
    reviews: [],
    availability: [],
    published: false,
    postedOn: null
  };
};
var assertOwnsListing = exports.assertOwnsListing = function assertOwnsListing(email, listingId) {
  return resourceLock(function (resolve, reject) {
    if (!(listingId in listings)) {
      return reject(new _error.InputError('Invalid listing ID'));
    } else if (listings[listingId].owner !== email) {
      return reject(new _error.InputError('User does not own this Listing'));
    } else {
      resolve();
    }
  });
};
var assertOwnsBooking = exports.assertOwnsBooking = function assertOwnsBooking(email, bookingId) {
  return resourceLock(function (resolve, reject) {
    if (!(bookingId in bookings)) {
      return reject(new _error.InputError('Invalid booking ID'));
    } else if (bookings[bookingId].owner !== email) {
      return reject(new _error.InputError('User does not own this booking'));
    } else {
      resolve();
    }
  });
};
var addListing = exports.addListing = function addListing(title, email, address, price, thumbnail, metadata) {
  return resourceLock(function (resolve, reject) {
    if (title === undefined) {
      return reject(new _error.InputError('Must provide a title for new listing'));
    } else if (Object.keys(listings).find(function (key) {
      return listings[key].title === title;
    }) !== undefined) {
      return reject(new _error.InputError('A listing with this title already exists'));
    } else if (address === undefined) {
      return reject(new _error.InputError('Must provide an address for new listing'));
    } else if (price === undefined || isNaN(price)) {
      return reject(new _error.InputError('Must provide a valid price for new listing'));
    } else if (thumbnail === undefined) {
      return reject(new _error.InputError('Must provide a thumbnail for new listing'));
    } else if (metadata === undefined) {
      return reject(new _error.InputError('Must provide property details for this listing'));
    } else {
      var id = newListingId();
      listings[id] = newListingPayload(title, email, address, price, thumbnail, metadata);
      resolve(id);
    }
  });
};
var getListingDetails = exports.getListingDetails = function getListingDetails(listingId) {
  return resourceLock(function (resolve, reject) {
    resolve(_objectSpread({}, listings[listingId]));
  });
};
var getAllListings = exports.getAllListings = function getAllListings() {
  return resourceLock(function (resolve, reject) {
    resolve(Object.keys(listings).map(function (key) {
      return {
        id: parseInt(key, 10),
        title: listings[key].title,
        owner: listings[key].owner,
        address: listings[key].address,
        thumbnail: listings[key].thumbnail,
        price: listings[key].price,
        reviews: listings[key].reviews
      };
    }));
  });
};
var updateListing = exports.updateListing = function updateListing(listingId, title, address, thumbnail, price, metadata) {
  return resourceLock(function (resolve, reject) {
    if (address) {
      listings[listingId].address = address;
    }
    if (title) {
      listings[listingId].title = title;
    }
    if (thumbnail) {
      listings[listingId].thumbnail = thumbnail;
    }
    if (price) {
      listings[listingId].price = price;
    }
    if (metadata) {
      listings[listingId].metadata = metadata;
    }
    resolve();
  });
};
var removeListing = exports.removeListing = function removeListing(listingId) {
  return resourceLock(function (resolve, reject) {
    delete listings[listingId];
    resolve();
  });
};
var publishListing = exports.publishListing = function publishListing(listingId, availability) {
  return resourceLock(function (resolve, reject) {
    if (availability === undefined) {
      return reject(new _error.InputError('Must provide listing availability'));
    } else if (listings[listingId].published === true) {
      return reject(new _error.InputError('This listing is already published'));
    } else {
      listings[listingId].availability = availability;
      listings[listingId].published = true;
      listings[listingId].postedOn = new Date().toISOString();
      resolve();
    }
  });
};
var unpublishListing = exports.unpublishListing = function unpublishListing(listingId) {
  return resourceLock(function (resolve, reject) {
    if (listings[listingId].published === false) {
      return reject(new _error.InputError('This listing is already unpublished'));
    } else {
      listings[listingId].availability = [];
      listings[listingId].published = false;
      listings[listingId].postedOn = null;
      resolve();
    }
  });
};
var leaveListingReview = exports.leaveListingReview = function leaveListingReview(email, listingId, bookingId, review) {
  return resourceLock(function (resolve, reject) {
    if (!(bookingId in bookings)) {
      return reject(new _error.InputError('Invalid booking ID'));
    } else if (!(listingId in listings)) {
      return reject(new _error.InputError('Invalid listing ID'));
    } else if (bookings[bookingId].owner !== email) {
      return reject(new _error.InputError('User has not stayed at this listing'));
    } else if (bookings[bookingId].listingId !== listingId) {
      return reject(new _error.InputError('This booking is not associated with this listing ID'));
    } else if (review === undefined) {
      return reject(new _error.InputError('Must provide review contents'));
    } else {
      listings[listingId].reviews.push(review);
      resolve();
    }
  });
};

/***************************************************************
                       Booking Functions
***************************************************************/

var newBookingPayload = function newBookingPayload(owner, dateRange, totalPrice, listingId) {
  return {
    owner: owner,
    dateRange: dateRange,
    totalPrice: totalPrice,
    listingId: listingId,
    status: 'pending'
  };
};
var makeNewBooking = exports.makeNewBooking = function makeNewBooking(owner, dateRange, totalPrice, listingId) {
  return resourceLock(function (resolve, reject) {
    if (!(listingId in listings)) {
      return reject(new _error.InputError('Invalid listing ID'));
    } else if (dateRange === undefined) {
      return reject(new _error.InputError('Must provide a valid date range for the booking'));
    } else if (totalPrice === undefined || totalPrice < 0 || isNaN(totalPrice)) {
      return reject(new _error.InputError('Must provide a valid total price for this booking'));
    } else if (listings[listingId].owner === owner) {
      return reject(new _error.InputError('Cannot make bookings for your own listings'));
    } else if (listings[listingId].published === false) {
      return reject(new _error.InputError('Cannot make a booking for an unpublished listing'));
    } else {
      var id = newBookingId();
      bookings[id] = newBookingPayload(owner, dateRange, totalPrice, listingId);
      resolve(id);
    }
  });
};
var getAllBookings = exports.getAllBookings = function getAllBookings() {
  return resourceLock(function (resolve, reject) {
    resolve(Object.keys(bookings).map(function (key) {
      return {
        id: parseInt(key, 10),
        owner: bookings[key].owner,
        dateRange: bookings[key].dateRange,
        totalPrice: bookings[key].totalPrice,
        listingId: bookings[key].listingId,
        status: bookings[key].status
      };
    }));
  });
};
var removeBooking = exports.removeBooking = function removeBooking(bookingId) {
  return resourceLock(function (resolve, reject) {
    delete bookings[bookingId];
    resolve();
  });
};
var acceptBooking = exports.acceptBooking = function acceptBooking(owner, bookingId) {
  return resourceLock(function (resolve, reject) {
    if (!(bookingId in bookings)) {
      return reject(new _error.InputError('Invalid booking ID'));
    } else if (Object.keys(listings).find(function (key) {
      return key === bookings[bookingId].listingId && listings[key].owner === owner;
    }) === undefined) {
      return reject(new _error.InputError("Cannot accept bookings for a listing that isn't yours"));
    } else if (bookings[bookingId].status === 'accepted') {
      return reject(new _error.InputError('Booking has already been accepted'));
    } else if (bookings[bookingId].status === 'declined') {
      return reject(new _error.InputError('Booking has already been declined'));
    } else {
      bookings[bookingId].status = 'accepted';
      resolve();
    }
  });
};
var declineBooking = exports.declineBooking = function declineBooking(owner, bookingId) {
  return resourceLock(function (resolve, reject) {
    if (!(bookingId in bookings)) {
      return reject(new _error.InputError('Invalid booking ID'));
    } else if (Object.keys(listings).find(function (key) {
      return key === bookings[bookingId].listingId && listings[key].owner === owner;
    }) === undefined) {
      return reject(new _error.InputError("Cannot accept bookings for a listing that isn't yours"));
    } else if (bookings[bookingId].status === 'declined') {
      return reject(new _error.InputError('Booking has already been declined'));
    } else if (bookings[bookingId].status === 'accepted') {
      return reject(new _error.InputError('Booking has already been accepted'));
    } else {
      bookings[bookingId].status = 'declined';
      resolve();
    }
  });
};