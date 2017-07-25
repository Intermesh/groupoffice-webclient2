import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders, HttpClient, HttpResponse, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {AccessTokenService} from '../services/access-token.service';

@Injectable()
export class ApiService {
	constructor(
		private http: HttpClient,
		private accessTokenService: AccessTokenService
	) {}

	private setHeaders(): HttpHeaders {
		let headersConfig = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		if (this.accessTokenService.getToken()) {
			headersConfig['Authorization'] = `Token ${this.accessTokenService.getToken()}`;
		}

		return new HttpHeaders(headersConfig);
	}

	private formatErrors(error: any) {
		return Observable.throw(error.json());
	}

	post(path: string, body: Object = {}): Observable<any> {
		return this.http.post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
			headers: this.setHeaders(), 
			withCredentials: true
			})
			.catch(this.formatErrors);
			
	}
	
	private paramsToURLSearchParams(params: {[key: string]: string} = {}): HttpParams {
			let urlParams: HttpParams = new HttpParams();

			Object.keys(params)
			.forEach((key) => {
				urlParams = urlParams.set(key, params[key]);
			}); 
			
			return urlParams;
	}

	get(path: string, queryParams: {[key: string]: string} = {}): Observable<any> {
		
		const params = this.paramsToURLSearchParams(queryParams);
		
		return this.http.get(`${environment.apiUrl}${path}`, {
				headers: this.setHeaders(), 
				params, 
				withCredentials: true
			})
			.catch(this.formatErrors);
	}

	put(path: string, body: Object = {}): Observable<any> {
		return this.http.put(`${environment.apiUrl}${path}`, JSON.stringify(body), {
				headers: this.setHeaders(), 
				withCredentials: true
			})
			.catch(this.formatErrors)
	}
	
	
	delete(path: string, queryParams: {[key: string]: string } = {}): Observable<any> {
		return this.http.delete(`${environment.apiUrl}${path}`, {
				headers: this.setHeaders(), 
				params: this.paramsToURLSearchParams(queryParams), 
				withCredentials: true
			})
			.catch(this.formatErrors);
	}
}