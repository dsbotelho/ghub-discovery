import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpParamsBuilder } from '../../../../utils/http/http-params-builder.model';
import {
  RepositoryHttpResponse,
  RepositoryRequestData,
} from '../../models/api/repository-http.model';
import { GithubHttpService } from './github-http.service';
import { RepositoryHandlerService } from './handlers/repository-handler.service';

describe('GithubHttpService', () => {
  let service: GithubHttpService;
  let httpMock: HttpTestingController;
  let handler: RepositoryHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionStorageService],
    });

    service = TestBed.inject(GithubHttpService);
    handler = TestBed.inject(RepositoryHandlerService);
    httpMock = TestBed.inject(HttpTestingController);

    jest
      .spyOn(HttpParamsBuilder.prototype, 'paginatedRequest')
      .mockReturnValue(new HttpParamsBuilder());
    jest
      .spyOn(HttpParamsBuilder.prototype, 'sortableRequest')
      .mockReturnValue(new HttpParamsBuilder());
    jest
      .spyOn(HttpParamsBuilder.prototype, 'build')
      .mockReturnValue(new HttpParams().set('per_page', 10));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get repository list by language', waitForAsync(() => {
    const requestData: RepositoryRequestData = {
      per_page: 10,
      page: 1,
      filter: {
        language: 'test',
        stars: 10,
      },
    };
    const expectedApiResponse: RepositoryHttpResponse = {
      incomplete_results: true,
      items: [],
      total_count: 10,
    };
    jest.spyOn(handler, 'mapRepositoryHttpResponse').mockReturnValue([]);

    service.getRepoListByLanguage$(requestData).subscribe((item) => {
      expect(handler.mapRepositoryHttpResponse).toHaveBeenCalledWith(
        expectedApiResponse
      );
      expect(item).toEqual([]);
    });

    const expectedQuery = encodeURIComponent(
      `language:${requestData.filter.language} stars:>${requestData.filter.stars}`
    );
    const request = httpMock.expectOne(
      `${service.gitHubUrl}${expectedQuery}&per_page=10`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(expectedApiResponse);
    httpMock.verify();
  }));
});
