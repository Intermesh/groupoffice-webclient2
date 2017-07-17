import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Rx';
import {ApiService} from './api.service';
import {Deletable} from '../models/deletable.interface';
import {Record} from '../models/record.model';

export abstract class CrudService<T extends Record & Deletable> {
	constructor(
		protected apiService: ApiService,
		private modelClass: { new(...args: any[]): T }
		
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
		
		return this.getReadPath(resource[resource.pk()[0]]);
	}	
	
	private dataToModel (data): T {
		let model = new this.modelClass ();
		model = Object.assign(model, data);
		return model;
	}
	
	
	find(params: {[key: string]: string} = null): Observable<{data: T[], count: number}> {
    return this.apiService
    .get(
			this.getStorePath(),
      params
    )
			.share()
			.map(data => {
			
				for(let i =0, l=data.data.length;i<l;i++) {
					data.data[i] = this.dataToModel(data.data[i]);
				}

				return data;
			});
  }
	
	read(pk: any, params: {[key: string]: string} = null) : Observable<T> {		
		
		return this.apiService.get(this.getReadPath(pk), params)
			.share()
			.map(data => this.dataToModel(data.data));
	}
	
	save (resource: T): Observable<T> {		
		let result;		
		if (resource.isNew()) {
			result = this.apiService.post(this.getCreatePath(resource), {data: resource});		
		} else
		{
			result = this.apiService.put(this.getUpdatePath(resource), {data: resource});
		}
		const obs = result.share().map(data => Object.assign(resource, data.data));				
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
			for (const key of resource.pk()) {
				dResource[key] = resource[key];
			}
			this.deletedResources.push(dResource);
		}
		
		const obs = this.apiService.put(this.getStorePath(), {data: this.deletedResources})
			.share()
			.map(data => data.data);
		obs.subscribe(data => this.dataChanged.next(data.data));
		return obs;
	}
	
	unDelete(): Observable<T[]> {
		for (let resource of this.deletedResources) {
			resource.deleted = false;				
		}
		
		let obs = this.apiService.put(this.getStorePath(), {data: this.deletedResources})
			.share()
			.map(data => data.data);

		this.deletedResources = [];
		
		obs.subscribe(data => this.dataChanged.next(data.data));
		
		return obs;
	}
}
