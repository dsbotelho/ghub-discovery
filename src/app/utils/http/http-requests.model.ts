export interface HttpResponseBody<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T;
}