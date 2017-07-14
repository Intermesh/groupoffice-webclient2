import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Rx';
import {ApiService} from './api.service';
import {Deletable} from '../models/deletable.interface';
import {Record} from '../models/record.model';

export abstract class CrudService<T extends Record & Deletable> {
	constructor(
		protected apiService: ApiService
		
	) {}
	
	public dataChanged: Subject<T[]> = new Subject<T[]>();
	
	protected abstract getStorePath():string;
	
	protected getReadPath(pk: any): string {
		return this.getStorePath() + '/' + pk;
	};	
	
	protected getCreatePath(resource: T) {
		return this.getStorePath();
	};	
	
	protected getUpdatePath(resource: T): string {
		return this.getReadPath(resource.pk().join('/'));
	}	
	
	
	find(params: {[key: string]: string} = null): Observable<{data: T[], count: number}> {
    return this.apiService
    .get(
			this.getStorePath(),
      params
    );
  }
	
	read(pk: any, params: {[key: string]: string} = null) : Observable<T> {		
		return this.apiService.get(this.getReadPath(pk), params).map(data => data.data);
	}
	
	save (resource: T): Observable<T> {		
		let result;		
		if (resource.isNew()) {
			result = this.apiService.post(this.getCreatePath(resource), {data: resource});		
		} else
		{
			result = this.apiService.put(this.getUpdatePath(resource), {data: resource});
		}
		const obs = result.map(data => Object.assign(resource, data.data));				
		obs.subscribe(data => this.dataChanged.next([data]));				
		return obs;
	}
	
	deletedResources: Deletable[];
	
	delete(resources: T[]): Observable<T[]> {
		
		this.deletedResources = [];
		
		for (let resource of resources) {			
			const dResource = {
				deleted: true
			};
			for (const key in resource.pk()) {
				dResource[key] = resource[key];
			}
			this.deletedResources.push(dResource);
		}
		
		return this.apiService.put(this.getStorePath(), {data: this.deletedResources}).map(data => data.data);
	}
	
	unDelete(): Observable<T[]> {
		for (let resource of this.deletedResources) {
			resource.deleted = false;				
		}
		
		let response = this.apiService.put(this.getStorePath(), {data: this.deletedResources}).map(data => data.data);

		this.deletedResources = [];
		
		return response;
	}
}
