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
      this.httpParams = this.httpParams.append('per_page', `${request.per_page}`);
    }

    if (request?.page > 0) {
      this.httpParams = this.httpParams.append('page', `${request.page}`);
    }

    return this;
  }

  sortableRequest(request: SortableRequest): HttpParamsBuilder {
    if (request?.name != null) {
      this.httpParams = this.httpParams.append('name', `${request.name}`);
    }

    if (request?.order != null) {
      this.httpParams = this.httpParams.append('order', `${request.order}`);
    }

    return this;
  }

  // filterableRequest<T extends Search>(request: FilterableRequest<T>): HttpParamsBuilder {
  //   if (request?.groupId != null) {
  //     this.httpParams = this.httpParams.append('groupId', `${request.groupId}`);
  //   }

  //   if (request?.startDate != null && request?.endDate != null) {
  //     this.httpParams = this.httpParams.append('startDate', `${HttpParamsBuilder.httpDateFormat(request.startDate)}`);
  //     this.httpParams = this.httpParams.append('endDate', `${HttpParamsBuilder.httpDateFormat(request.endDate)}`);
  //   }

  //   if (request?.filter?.value != null) {
  //     this.httpParams = this.httpParams.append('filter.value', `${request.filter.value}`);
  //     request.filter.names.forEach(item => {
  //       this.httpParams = this.httpParams.append('filter.names', `${item}`);
  //     });
  //   }

  //   return this;
  // }
}
