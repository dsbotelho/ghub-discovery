import { HttpResponseBody } from "../../../../utils/http/http-requests.model";
import { CustomFilterableRequest, PaginatedRequest, SortableRequest } from "../../../../utils/http/request-data.model";
import { RepositoryHttp } from "../repository.model";

export type RepositoryHttpResponse = HttpResponseBody<RepositoryHttp[]>;

export type RepositoryRequestData = PaginatedRequest & SortableRequest & CustomFilterableRequest<RepoFilter>;

export interface RepoFilter {
  language?: string;
  stars?: number;
}
