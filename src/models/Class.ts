export interface Class {
  id?: number;
  creation_time: string;
  modification_time: string;
  classname: string;
  code?: string;
  img?: string;
  room?:string;
  subject?:string;
  id_class?:number;
  role_member?:number;
}

export const initClass: Class = {
  id: -1,
  creation_time: "",
  modification_time: "",
  classname: "",
};
