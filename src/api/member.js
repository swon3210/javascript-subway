export const requestLoginToken = async (email, password) => {
  try {
    const response = await fetch(`${API_END_POINT}/login/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, password }),
    });
    const { accessToken } = await response.json();

    return accessToken ? accessToken : 'guest';
  } catch (error) {
    console.log(error);
    return 'guest';
  }
};

export const requestSignUp = async (email, name, password) => {
  try {
    const response = await fetch(`${API_END_POINT}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, name, password }),
    });

    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};
