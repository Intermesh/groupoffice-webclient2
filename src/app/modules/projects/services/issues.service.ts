import {Injectable} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {Project} from '../models/project.model';
import {CrudService} from '../../../shared/services/crud.service';

export class IssuesService extends CrudService<Project> {
	
	
	constructor(
		apiService: ApiService,
		private project: Project
	) {
		super(apiService, Project);
	}	
	
	protected getStorePath():string {
		return '/projects' + this.project.id + '/issues';
	}
}