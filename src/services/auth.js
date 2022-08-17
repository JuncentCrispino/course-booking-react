export const signup = async (body) => {
  try {
    const signupReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const signupRes = await signupReq.json();
    return signupRes;
  } catch (error) {
    console.log(error)
  }
}

export const login = async (body) => {
  try {
    const loginReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (loginReq.status === 200) {
      const loginRes = await loginReq.json();
      return loginRes;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const logoutReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    if (logoutReq.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error)
  }
}

export const checkEmail = async (email) => {
  try {
    const checkEmailReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    });
    return checkEmailReq.status
  } catch (error) {
    console.log(error)
  }
}