import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {ProjectService} from './services/project.service';
import {Project} from './models/project.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectResolve implements Resolve<Project> {
	
	private project: Project;

  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot) {
		
		const id = +(route.paramMap.get('id') || route.parent.paramMap.get('id'));
//		console.log(this.project.value);
//		console.log(id);
		if(!this.project || this.project.id != id) {			
		
			const obs = this.projectService.read(id, {returnProperties: '*,organization,proposalItems'});
			obs.subscribe(project => {
				this.project = project;
			});
			
			return obs;
		}else {
			return Observable.of(this.project);
		}
		
		
		
		
//		return this.project.asObservable().first();
//		return this.projectService.read(route.paramMap.get('id'));
  }
}