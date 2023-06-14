import axios from 'axios';
import { environment } from '../Environments/environment';
import { getItemFromLs } from './LocalStorage';
const netWorkService = {
  setupInterceptors: (store) => {
    axios.interceptors.request.use(
        config => {
          const { origin } = new URL(config.url);
          const allowedOrigins = [environment.serverUrl];
          const token = localStorage.getItem('valet-auth-token');
          if (allowedOrigins[0].indexOf(origin) > -1 && token) {
            config.headers.authorization = `Bearer ${token}`;  
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
      
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        //console.log(response, store);
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error) {
            //?? Do something with error
        //   if (!ignoreErrorToaster(error)) {
        //     const ErrorMessage = getErrorMessage(error);
        //     notification.error({
        //       message: ErrorMessage
        //         ? ErrorMessage
        //         : error && error.response && error.response.data && error.response.data.message ? error.response.data.message : ERROR_CONSTANT.API_ERROR,
        //     });
        //   }

        }
        return Promise.reject(error);
      });

  }
};

export default netWorkService;