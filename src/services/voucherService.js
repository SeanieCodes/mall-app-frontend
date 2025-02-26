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

    // Check if the response is successful
    if (!res.ok) {
      throw new Error('Failed to create voucher. Please try again later.');
    }

    return res.json(); // Return the created voucher data
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Handle the error
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

    // Check if the response is successful
    if (!res.ok) {
      throw new Error('Failed to update voucher. Please try again later.');
    }

    return res.json(); // Return the updated voucher data
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Handle the error
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

    // Check if the response is successful
    if (!res.ok) {
      throw new Error('Failed to delete voucher. Please try again later.');
    }

    return res.json(); // Return the deleted voucher data or a confirmation message
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Handle the error
  }
};

const redeem = async (voucherId) => {
  try {
    const res = await fetch(`${BASE_URL}/redeem/${voucherId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is passed
      },
    });

    // Check if the response is successful
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || 'Failed to redeem voucher. Please try again later.');
    }

    return res.json(); // Return the response data after successfully redeeming the voucher
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Handle any error that occurs
  }
};

export { index, create, update, remove, redeem };