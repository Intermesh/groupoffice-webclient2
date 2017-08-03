import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Rx';
import {ApiService} from './api.service';
import {Deletable} from '../models/deletable.interface';
import {Record} from '../models/record.model';

export abstract class CrudService<T extends Record> {
	constructor(
		protected apiService: ApiService,
		private modelClass: { new(...args: any[]): T }
		
	) {}
	
	/**
	 * Fires when a new resource was added, modified or deleted
	 */
	public dataChanged: Subject<T[]> = new Subject<T[]>();
	
	/**
	 * Get the path to the store of the resources. eg. '/contacts'
	 */
	protected abstract getStorePath():string;
	
	/**
	 * Get the path to read a resource	
	 */
	protected getReadPath(pk: any): string {
		return this.getStorePath() + '/' + pk;
	};	
	
	/**
	 * Get the path to create a resource
	 */
	protected getCreatePath(resource: T) {
		return this.getStorePath();
	};	
	
	/**
	 * Get the path to update a resource
	 */
	protected getUpdatePath(resource: T): string {
		
		return this.getReadPath(resource[resource.pk()[0]]);
	}	
	
	private dataToModel (data): T {
		let model = new this.modelClass ();
		model = Object.assign(model, data);
		return model;
	}
	
	/**
	 * Find resources
	 */
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
	
	/**
	 * Read a resource from the server
	 */
	read(pk: any, params: {[key: string]: string} = null) : Observable<T> {		
		
		return this.apiService.get(this.getReadPath(pk), params)
			.share()
			.map(data => this.dataToModel(data.data));
	}
	
	/**
	 * Save a resource
	 */
	save (resource: T, returnProperties: string = "*"): Observable<T> {		
		let result;		
		if (resource.isNew()) {
			result = this.apiService.post(this.getCreatePath(resource), {data: resource}, {returnProperties: returnProperties});		
		} else
		{
			result = this.apiService.put(this.getUpdatePath(resource), {data: resource}, {returnProperties: returnProperties});
		}
		const obs = result.share().map(data => {
			Object.assign(resource, data.data);
			return resource;
		});				
		obs.subscribe(data => this.dataChanged.next([data]));				
		return obs;
	}
	
	deletedResources: Deletable[];
	
	/**
	 * Delete resources on the server
	 */
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
	
	/**
	 * Undelete resources
	 */
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
