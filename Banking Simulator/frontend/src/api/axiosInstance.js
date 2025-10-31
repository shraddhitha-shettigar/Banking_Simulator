import axios from 'axios';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/bank-simulator/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status,data } = error.response;

      let errorMessage = 'An error occurred';

      if (data && data.message) {
        errorMessage = data.message;
      } else if (data && data.error) {
        errorMessage = data.error;
      } else {
        switch (status) {
          case 400:
            errorMessage = 'Bad Request - Please check your input';
            break;
          case 401:
            errorMessage = 'Unauthorized - Please login again';
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');
            break;
          case 403:
            errorMessage = 'Forbidden - You do not have permission';
            break;
          case 404:
            errorMessage = 'Not Found - The requested resource was not found';
            break;
          case 500:
            errorMessage = 'Internal Server Error - Please try again later';
            break;
          default:
            errorMessage = `Error ${status} - ${error.response.statusText}`;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#dc2626',
      });
    } else if (error.request) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to the server. Please check your connection.',
        confirmButtonColor: '#dc2626',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred',
        confirmButtonColor: '#dc2626',
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;