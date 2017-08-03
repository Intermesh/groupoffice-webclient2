import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {ProjectService} from './services/project.service';
import {Issue} from './models/issue.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IssueResolve implements Resolve<Issue> {	
	
  constructor(private projectService: ProjectService) {}
  resolve(route: ActivatedRouteSnapshot) {		
		const id = +route.paramMap.get('id');
		
		return this.projectService.getIssuesService(route.parent.data['project']).read(id);
		
  }
}