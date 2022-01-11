import { AdminState } from './../features/admin/adminSlide';
import { PointState } from './../features/point/pointSlide';
import { UploadState } from './../features/upload/uploadSlide';
import { AddClassState } from './../features/class/addClassSlide';
import { GradeState } from './../features/grade/gradeSlide';
import { DefaultRootState } from "react-redux";
import { ClassState } from 'features/class/classSlide';
import { PeopleState } from 'features/people/peopleSlide';
import { UserState } from 'features/user/userSlide';

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";

  [key: string]: any;
}

export interface StoreState extends DefaultRootState{
  class:ClassState,
  people: PeopleState,
  user: UserState,
  grade: GradeState,
  addClass: AddClassState,
  upload: UploadState,
  point: PointState,
  admin: AdminState,
}