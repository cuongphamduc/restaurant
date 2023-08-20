import axiosClient from './AxiosClient';

const billApi = {
  async getAll(params) {
    const formData = new FormData();
    params.idhoadon = ""
    const menuList = await axiosClient.get('/timkiemhoadon', {params});

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
    const url = '/themhoadon';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default billApi;