import axiosClient from './AxiosClient';

const menuApi = {
  async getAll(params) {
    const menuList = await axiosClient.get('/timkiemmonan', {params});

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

  update(name, data, file) {
    const url = '/suamonan';
    const formData = new FormData();
    formData.append("old_tenmonan", name)
    formData.append("tenmonan", data.tenmonan)
    formData.append("gia", data.gia)
    formData.append("mota", data.mota)
    if (file !== undefined){
      formData.append("in_file", file)
    }
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  remove(name) {
    const url = `/xoamonan`;
    return axiosClient.post(url, {tenmonan: name},)
  },
};

export default menuApi;