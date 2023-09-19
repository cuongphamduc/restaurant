import axiosClient from './AxiosClient';

const billApi = {
  async getAll(params) {
    const formData = new FormData();
    params.idhoadon = ""
    const menuList = await axiosClient.get('/timkiemhoadon', {params});

    // Build response and return
    return {
      data: menuList.data,
      paginition: menuList.info
    };
  },

  async getDetail(id) {
    const params = {
      idhoadon: id
    }
    const url = `/chitiethoadon`;
    const menuList = await axiosClient.get(url, {params});
    return {
      customer: menuList.khachhang,
      dish: menuList.monan
    };
  },

  async add(data) {
    const url = '/themhoadon';
    const response = await axiosClient.post(url, data).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
    return response
  },

  async note(data) {
    const url = '/inghichu';
    const response = await axiosClient.post(url, data).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
    return response
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