import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

import {HttpHeaders, HttpClient, HttpResponse, HttpParams} from '@angular/common/http';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'apiUrl'})
export class ApiUrlPipe implements PipeTransform {

	constructor() {}
	transform(value: string, params: {[key: string]: string} = null): string {

		let url = environment.apiUrl + value;

		if (params) {
			const p = this.convertParams(params);
			url += '?' + p.toString();
		}

		return url;
	}

	private convertParams(params: {[key: string]: string} = {}): HttpParams {
		let urlParams: HttpParams = new HttpParams();

		Object.keys(params)
			.forEach((key) => {
				urlParams = urlParams.set(key, params[key]);
			});

		return urlParams;
	}
}
