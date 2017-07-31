import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {ProjectService} from './services/project.service';
import {Project} from './models/project.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectResolve implements Resolve<Project> {	
	
  constructor(private projectService: ProjectService) {}
  resolve(route: ActivatedRouteSnapshot) {		
		const id = +route.paramMap.get('id');
		return this.projectService.read(id, {returnProperties: '*, organization, proposalItems, groups[*,group[*, user[username,photoBlobId]]'});
			
  }
}