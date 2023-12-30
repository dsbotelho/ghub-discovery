import { HttpParams } from '@angular/common/http';
import { PaginatedRequest, SortableRequest } from './request-data.model';

export class HttpParamsBuilder {
  private httpParams = new HttpParams();

  build(): HttpParams {
    const params = this.httpParams;
    this.clear();
    return params;
  }

  clear(): void {
    this.httpParams = new HttpParams();
  }

  paginatedRequest(request: PaginatedRequest): HttpParamsBuilder {
    if (request?.per_page != null) {
      this.httpParams = this.httpParams.append(
        'per_page',
        `${request.per_page}`
      );
    }

    if (request?.page > 0) {
      this.httpParams = this.httpParams.append('page', `${request.page}`);
    }

    return this;
  }

  sortableRequest(request: SortableRequest): HttpParamsBuilder {
    if (request?.sort != null) {
      this.httpParams = this.httpParams.append('sort', `${request.sort}`);
    }

    if (request?.order != null) {
      this.httpParams = this.httpParams.append('order', `${request.order}`);
    }

    return this;
  }
}
