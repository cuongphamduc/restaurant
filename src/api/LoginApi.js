import axiosClient from './AxiosClient';

const loginApi = {
  login(data) {
    const url = '/kiemtranguoidung';
    return axiosClient.post(url, data);
  },

  reconnect(data) {
    const url = '/reconnect';
    return axiosClient.post(url, data);
  }
};

export default loginApi;