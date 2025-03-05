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
      // Decode token to get user information
      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      return {
        token: data.token,
        username: decoded.username,
        role: decoded.role,
        _id: decoded._id
      };
    }

    throw new Error('Invalid response from server');
  } catch (error) {
    throw new Error(error.message || 'An error occurred during sign up');
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
      // Decode the token to get the full user information
      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      
      return {
        token: data.token,
        username: data.user.username,
        role: data.user.role,
        _id: decoded._id
      };
    }

    throw new Error('Invalid response from server');
  } catch (error) {
    throw new Error(error.message || 'An error occurred during sign in');
  }
};

export {
  signUp,
  signIn,
};