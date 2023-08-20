import axiosClient from './AxiosClient';

const customerApi = {
  async getAll(params) {
    const formData = new FormData();
    params.idhoadon = ""
    const menuList = await axiosClient.get('/timkiemkhachhang', {params});

    // Build response and return
    return {
      data: menuList
    };
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/themkhachhang';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = '/suakhachhang';
    return axiosClient.post(url, data);
  },

  remove(id) {
    const url = '/xoakhachhang';
    return axiosClient.post(url, {sdt: id});
  },
};

export default customerApi;