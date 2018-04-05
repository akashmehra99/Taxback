import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonServiceService {

  request;
  endPointUrl = 'https://jointhecrew.in/api/txns/';

  constructor(private http: Http) { }

  extractData(res: Response) {
    return (res.json()) || {};
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  createTransaction(): Observable<any> {
    return this.http.post(this.endPointUrl, this.request)
    .map(this.extractData).catch(this.handleErrorObservable);
  }

  getTransactions(): Observable<any> {
    return this.http.get(this.endPointUrl + this.request)
    .map(this.extractData).catch(this.handleErrorObservable);
  }

}
