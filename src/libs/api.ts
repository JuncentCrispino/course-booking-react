import axios, { AxiosInstance } from 'axios';
import { Auth } from 'aws-amplify';

// Create a new Axios instance
const api: AxiosInstance = axios.create({
  baseURL: 'https://tom4x1cfnb.execute-api.ap-southeast-1.amazonaws.com/', // Replace with your API endpoint
});

// Create an Axios interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const session = await Auth.currentSession();
      const accessToken = session.getAccessToken().getJwtToken();
      config.headers['Authorization'] = accessToken;
    } catch (error) {
      console.log('Access token error:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Create a function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const refreshedSession = user.getSignInUserSession();
    const accessToken = refreshedSession.getAccessToken().getJwtToken();
    api.defaults.headers.common['Authorization'] = accessToken;
    return Promise.resolve();
  } catch (error) {
    console.log('Token refresh error:', error);
    return Promise.reject(error);
  }
};

// Create an Axios interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status code is 401 (Unauthorized) and the original request hasn't already been retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the access token
        await refreshAccessToken();

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] =
          api.defaults.headers.common['Authorization'];
        return api(originalRequest);
      } catch (refreshError) {
        // Handle the refresh token error
        console.log('Token refresh error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { api };
