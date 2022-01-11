import { User } from './../models/User';
import { axiosInstance } from 'config/axios';

const adminApi = {
  getAdmins(): Promise<any> {
    const url = '/admin/list-admins';
    return axiosInstance.get(url);
  },

  getUsers(): Promise<any> {
    const url = '/admin/list-users';
    return axiosInstance.get(url);
  },

  getClasses(): Promise<any> {
    const url = '/admin/list-users';
    return axiosInstance.get(url);
  },

  createAdmin({username,name,password}): Promise<any> {
    const url = '/admin/list-admins';
    return axiosInstance.post(url,{username,name,password});
  },
  updateUser(user:User): Promise<any> {
    const url = '/admin/list-admins';
    return axiosInstance.post(url,{user});
  },
};

export default adminApi;