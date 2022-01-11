export interface Class {
  id?: number;
  creation_time: string;
  modification_time: string;
  classname: string;
  code?: string;
  img?: string;
  room?:string;
  subject?:string;
}

export const initClass: Class = {
  id: -1,
  creation_time: "",
  modification_time: "",
  classname: "",
};
