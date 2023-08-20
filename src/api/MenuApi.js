import axiosClient from './AxiosClient';

const menuApi = {
  async getAll(params) {
    const menuList = await axiosClient.get('/timkiemmonan', {params});

    // Build response and return
    return {
      data: menuList
    };
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data, file) {
    const url = '/themmonan';
    const formData = new FormData();
    formData.append("tenmonan", data.tenmonan)
    formData.append("gia", data.gia)
    formData.append("mota", data.mota)
    formData.append("in_file", file)
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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

export default menuApi;