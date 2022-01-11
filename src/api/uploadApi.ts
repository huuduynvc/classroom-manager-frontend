import { axiosInstance } from "config/axios";

const uploadApi = {
  importListUser(classid,formData): Promise<any> {
    const url = `/class/${classid}/upload`;
    return axiosInstance({
      method: "POST",
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  importGrades(classid,formData): Promise<any> {
    const url = `/class/${classid}/upload`;
    return axiosInstance({
      method: "POST",
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default uploadApi;
