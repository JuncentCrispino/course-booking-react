export default async function access() {
  try {
    if (!localStorage.getItem('accessToken')) {
      return null
    }
    const validAccessToken = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    if (validAccessToken.status === 200) {
      return await validAccessToken.json();
    }
    const validRefreshToken = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/refresh-access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
      }
    })
    if (validRefreshToken.status === 200) {
      const { accessToken } = await validRefreshToken.json();
      localStorage.setItem('accessToken', accessToken);
      return await validAccessToken.json()
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null
  } catch (error) {
    console.log(error)
  }
}