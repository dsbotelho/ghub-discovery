export interface RequestData { }

export interface QueryRequestData {
  language?: string;
  stars?: number;
}

export interface PaginatedRequest extends RequestData {
  per_page: number;
  page: number;
}

export interface SortableRequest extends RequestData {
  name?: string;
  order?: string;
}

export interface Sort {
  name: string;
  order: string;
}

export interface CustomFilterableRequest<T> extends RequestData {
  filter: T;
}