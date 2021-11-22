import { DefaultRootState } from "react-redux";
import { ClassState } from 'features/class/classSlide';
import { PeopleState } from 'features/people/peopleSlide';

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
  people: PeopleState
}