import { ListParams, ListResponse, Class, Assignment } from 'models';
import { axiosInstance } from 'config/axios';

const classApi = {
  getAll(params?: ListParams): Promise<ListResponse<Class>> {
    const url = '/class';
    return axiosInstance.get(url, { params });
  },

  findByUserId(id: string): Promise<Class> {
    const url = `/class/user/${id}`;
    return axiosInstance.get(url);
  },

  getById(id: string): Promise<Class> {
    const url = `/class/${id}`;
    return axiosInstance.get(url);
  },

  add(data: Class): Promise<Class> {
    const url = '/class';
    return axiosInstance.post(url, data);
  },

  update(data: Partial<Class>): Promise<Class> {
    const url = `/class/${data.id}`;
    return axiosInstance.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/class/${id}`;
    return axiosInstance.delete(url);
  },

  getTeachersById(id: string): Promise<Class> {
    const url = `/class/${id}/teachers`;
    return axiosInstance.get(url);
  },

  getStudentsById(id: string): Promise<Class> {
    const url = `/class/${id}/students`;
    return axiosInstance.get(url);
  },

  getClassMemnersById(id: string): Promise<Class> {
    const url = `/class/${id}/members`;
    return axiosInstance.get(url);
  },

  getGradeStructByClassId(id: string): Promise<Class> {
    const url = `/grade/class/${id}`;
    return axiosInstance.get(url);
  },

  updateGradeByClassId(id:string,assignments: Assignment[]): Promise<any> {
    const url = `/grade/class/${id}`;
    return axiosInstance.post(url,{assignments})
  },

  joinClass(code,role): Promise<any> {
    const url = `/class/invite/bylink?cjc=${code}&role=${role}`;
    return axiosInstance.get(url)
  },
};

export default classApi;