export const getToken = () => JSON.parse(localStorage.getItem('token'));

export const getRefreshToken = () => JSON.parse(localStorage.getItem('refreshToken'));

export const setAuthToken = ({ token, refreshToken }) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
};

export const decodeToken = (token) => {
  if (token) {
    try {
      const jwtDecode = require('jwt-decode');
      return jwtDecode(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  return null;
};

export const isNotExpired = (token) => {
  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;
    const date = decodedToken.exp ? decodedToken.exp : null;
    // convert to millis
    return new Date(date * 1000) > Date.now();
  } catch (error) {
    throw new Error(error);
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
