import {  SignInForm, UpdateProfileForm} from 'models';
import { axiosInstance } from 'config/axios';

const userApi = {
  login({username,password}: SignInForm): Promise<any> {
    const url = '/auth';
    return axiosInstance.post(url, { username,password });
  },

  updateProfile({id,fullname,studentid}: UpdateProfileForm): Promise<any> {
    const url = `/user/${id}`;
    return axiosInstance.patch(url, {id,fullname,studentid});
  },

};

export default userApi;