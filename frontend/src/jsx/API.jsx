import config from '../config.json';
const port = config.BACKEND_PORT;

export const errorMessage = (text) => {
  const bodyMain = document.querySelector('body');
  const div = document.createElement('div');
  const para = document.createElement('p');
  para.textContent = text;
  para.className = 'error-text';
  div.className = 'error-message';
  const btn = document.createElement('button');
  btn.innerText = 'X';
  btn.className = 'close-button';
  div.appendChild(para);
  div.appendChild(btn);
  bodyMain.appendChild(div);
  // when click close the message would be removed
  btn.addEventListener('click', () => {
    bodyMain.removeChild(div);
  });
  // when press 'x' the message would be removed
  window.addEventListener('keydown', (event) => {
    if (event.key === 'x' && bodyMain.contains(div)) {
      bodyMain.removeChild(div);
    }
  });
};

// all post request send by this question
export const callAPIpost = (path, inputdata) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          reject(errorReason);
        } else {
          const errorReason = 'net';
          reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// call post request with token send by this function
export const CallAPIPostWithToken = (path, inputdata, token) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'POST',
      headers: {
        Authorization: String(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          reject(errorReason);
        } else {
          const errorReason = 'net';
          reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//  all put request with token send by this message
export const callAPIput = (path, inputdata, token) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'PUT',
      headers: {
        Authorization: String(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          reject(errorReason);
        } else {
          const errorReason = 'net';
          reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// all GET request send by this function
export const callAPIget = (path, token) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'GET',
      headers: {
        Authorization: String(token),
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          reject(errorReason);
        } else {
          const errorReason = 'net';
          reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// All delete request send by this function
export const callAPIdelete = (path, token) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + String(port) + '/' + String(path), {
      method: 'DELETE',
      headers: {
        Authorization: String(token),
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          return response.json();
        } else if (response.status === 400) {
          const errorReason = 'info';
          reject(errorReason);
        } else if (response.status === 403) {
          const errorReason = 'access';
          reject(errorReason);
        } else {
          const errorReason = 'net';
          reject(errorReason);
        }
      })
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
