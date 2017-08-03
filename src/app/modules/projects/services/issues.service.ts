import {Injectable} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {Issue} from '../models/issue.model';
import {Project} from '../models/project.model';

import {CrudService} from '../../../shared/services/crud.service';

export class IssuesService extends CrudService<Issue> {
	
	
	constructor(
		apiService: ApiService,
		private project: Project
	) {
		super(apiService, Issue);
	}	
	
	protected getStorePath():string {
		return '/projects/' + this.project.id + '/issues';
	}
}