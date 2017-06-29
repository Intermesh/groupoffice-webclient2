import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {AccessTokenService} from '../services/access-token.service';

@Injectable()
export class ApiService {
	constructor(
		private http: Http,
		private accessTokenService: AccessTokenService
	) {}

	private setHeaders(): Headers {
		let headersConfig = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		if (this.accessTokenService.getToken()) {
			headersConfig['Authorization'] = `Token ${this.accessTokenService.getToken()}`;
		}

		return new Headers(headersConfig);
	}

	private formatErrors(error: any) {
		return Observable.throw(error.json());
	}

	post(path: string, body: Object = {}): Observable<any> {
		return this.http.post(`${environment.apiUrl}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
			.catch(this.formatErrors)
			.map((res: Response) => res.json());
	}

	get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
		return this.http.get(`${environment.apiUrl}${path}`, {headers: this.setHeaders(), search: params})
			.catch(this.formatErrors)
			.map((res: Response) => res.json());
	}

	put(path: string, body: Object = {}): Observable<any> {
		return this.http.put(`${environment.apiUrl}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
			.catch(this.formatErrors)
			.map((res: Response) => res.json());
	}
	
	
	delete(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
		return this.http.delete(`${environment.apiUrl}${path}`, {headers: this.setHeaders(), search: params})
			.catch(this.formatErrors)
			.map((res: Response) => res.json());
	}
	


}
