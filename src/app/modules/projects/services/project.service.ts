import {Injectable} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {Project} from '../models/project.model';
import {CrudService} from '../../../shared/services/crud.service';
import {IssuesService} from './issues.service';
@Injectable()
export class ProjectService extends CrudService<Project> {
	constructor(
		apiService: ApiService
	) {
		super(apiService, Project);
	}	
	
	protected getStorePath():string {
		return '/projects';
	}
	
	
	public getIssuesService(project: Project) {
		return new IssuesService(this.apiService, project);
	}
}