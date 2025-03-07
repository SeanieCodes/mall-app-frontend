const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vouchers`;

const index = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'No token found. Please log in again.' };
    }

    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { error: 'Authentication expired. Please log in again.' };
      }
      
      return { error: `Error fetching vouchers: ${res.status}` };
    }
    
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: error.message || 'Network error. Please try again.' };
  }
};

const create = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'No token found. Please log in again.' };
    }

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { error: 'Authentication expired. Please log in again.' };
      }
      return { error: `Failed to create voucher (${res.status}). Please try again later.` };
    }

    return await res.json();
  } catch (error) {
    console.error("Create error:", error);
    return { error: error.message || 'Network error. Please try again.' };
  }
};

const update = async (voucherId, formData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'No token found. Please log in again.' };
    }

    const res = await fetch(`${BASE_URL}/${voucherId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { error: 'Authentication expired. Please log in again.' };
      }
      return { error: `Failed to update voucher (${res.status}). Please try again later.` };
    }

    return await res.json();
  } catch (error) {
    console.error("Update error:", error);
    return { error: error.message || 'Network error. Please try again.' };
  }
};

const remove = async (voucherId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'No token found. Please log in again.' };
    }

    const res = await fetch(`${BASE_URL}/${voucherId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { error: 'Authentication expired. Please log in again.' };
      }
      return { error: `Failed to delete voucher (${res.status}). Please try again later.` };
    }

    return await res.json();
  } catch (error) {
    console.error("Delete error:", error);
    return { error: error.message || 'Network error. Please try again.' };
  }
};

const redeem = async (voucherId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'No token found. Please log in again.' };
    }

    const res = await fetch(`${BASE_URL}/redeem/${voucherId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { error: 'Authentication expired. Please log in again.' };
      }
      const errorData = await res.json();
      return { error: errorData.error || `Failed to redeem voucher (${res.status}). Please try again later.` };
    }

    return await res.json();
  } catch (error) {
    console.error("Redeem error:", error);
    return { error: error.message || 'Network error. Please try again.' };
  }
};

export { index, create, update, remove, redeem };