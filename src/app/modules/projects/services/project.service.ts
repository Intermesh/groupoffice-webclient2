import {Injectable} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {Project} from '../models/project.model';
import {CrudService} from '../../../shared/services/crud.service';

@Injectable()
export class ProjectService extends CrudService<Project> {
	constructor(
		apiService: ApiService
	) {
		super(apiService);
		
	}	
	
	protected getStorePath():string {
		return '/projects';
	}
}