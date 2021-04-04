import request from './request.js';

export const requestLoginToken = async (email, password) => {
  const response = await request.post({
    url: `${API_END_POINT}/login/token`,
    bodyContent: {email, password}
  });
  const { accessToken, status } = await response.json();
  if (status) {
    throw new Error('로그인 실패');
  }

  return accessToken;
};

export const requestSignUp = async (email, name, password) => {
  const response = await request.post({
    url: `${API_END_POINT}/members`,
    bodyContent: {email, name, password}
  });
};
