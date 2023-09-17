import axiosClient from './AxiosClient';

const customerApi = {
  async getAll(params) {
    return {
      data: [],
      paginition: {
        page: 1,
        limit: 1,
        total_pages: 1,
        total_records: 1
      }
    }

    const formData = new FormData();
    params.idhoadon = ""
    const menuList = await axiosClient.get('/timkiemkhachhang', {params});

    // Build response and return
    return {
      data: menuList.data,
      paginition: menuList.info
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