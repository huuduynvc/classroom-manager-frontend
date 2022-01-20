import { axiosInstance } from "config/axios";

const pointApi = {
  getPoints(classid): Promise<any> {
    const url = `/point/${classid}`;
    return axiosInstance({
      method: "GET",
      url,
    });
  },
  saveChangeGrades(classid,columns,rows): Promise<any> {
    const url = `/point/${classid}`;
    return axiosInstance({
      method: "POST",
      url,
      data: {columns,rows}
    });
  },
};

export default pointApi;
