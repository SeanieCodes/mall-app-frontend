const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (error) {
    throw new Error(error);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      
      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      
      localStorage.setItem('user', JSON.stringify({
        username: data.user.username,
        role: data.user.role,
        _id: decoded._id
      }));

      return {
        username: data.user.username,
        role: data.user.role,
        _id: decoded._id
      };
    }

    throw new Error('Invalid response from server');
  } catch (error) {
    throw new Error(error);
  }
};

export {
  signUp,
  signIn,
};
