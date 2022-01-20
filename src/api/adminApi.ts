import { User } from './../models/User';
import { axiosInstance } from 'config/axios';

const adminApi = {
  getAdmins(): Promise<any> {
    const url = '/admin';
    return axiosInstance.get(url);
  },
  getAdminDetail(adminId): Promise<any> {
    const url = `/admin/${adminId}`;
    return axiosInstance.get(url);
  },

  getUsers(): Promise<any> {
    const url = '/user';
    return axiosInstance.get(url);
  },
  getUserDetail(userId): Promise<any> {
    const url = `/user/${userId}`;
    return axiosInstance.get(url);
  },

  getClasses(): Promise<any> {
    const url = '/class';
    return axiosInstance.get(url);
  },
  getClassDetail(classId): Promise<any> {
    const url = `/class/${classId}`;
    return axiosInstance.get(url);
  },

  createAdmin({username,name,password,email}): Promise<any> {
    const url = '/admin';
    return axiosInstance.post(url,{username,fullname:name,password,email});
  },
  updateUser(user:User): Promise<any> {
    const url = '/user';
    return axiosInstance.patch(url,{user});
  },
};

export default adminApi;