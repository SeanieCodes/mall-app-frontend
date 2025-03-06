const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vouchers`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('Failed to create voucher. Please try again later.');
    }

    return res.json(); 
  } catch (error) {
    console.error(error);
    return { error: error.message }; 
  }
};

const update = async (voucherId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${voucherId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('Failed to update voucher. Please try again later.');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { error: error.message }; 
  }
};

const remove = async (voucherId) => {
  try {
    const res = await fetch(`${BASE_URL}/${voucherId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete voucher. Please try again later.');
    }

    return res.json(); 
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const redeem = async (voucherId) => {
  try {
    const res = await fetch(`${BASE_URL}/redeem/${voucherId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to redeem voucher. Please try again later.');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export { index, create, update, remove, redeem };