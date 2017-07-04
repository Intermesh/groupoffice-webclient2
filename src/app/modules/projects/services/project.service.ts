import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ApiService} from '../../../shared/services/api.service';
import {Project} from '../models/project.model';

@Injectable()
export class ProjectService {

	constructor(
		private apiService: ApiService
	) {}
	
	find(params: {[key: string]: string} = null): Observable<Project[]> {

    return this.apiService
    .get(
      '/projects',
      params
    ).map(data => data.data);
  }
	
	get(id: number, params: {[key: string]: string} = null) : Observable<Project> {
		
		return this.apiService.get('/projects/' + id, params).map(data => data.data);
	}


	// Update the user on the server (email, pass, etc)
	save (project: Project): Observable<Project> {
		
		let result;
		if(project.id) { 
			result = this.apiService.put('/projects/' + project.id, {data: project});
		} else
		{
			result = this.apiService.post('/projects', {data: project});
		}
		
		return result.map(data => Object.assign(project, data.data));
	}
	
	deletedProjects: any[];
	
	delete(projects: Project[]): Observable<any[]> {
		
		this.deletedProjects = [];
		
		for (let project of projects) {
			this.deletedProjects.push({
				id: project.id,
				deleted: true
			});
		}
		
		return this.apiService.put('/projects', {data: this.deletedProjects}).map(data => this.deletedProjects);
	}
	
	unDelete(): Observable<any[]> {
		for (let project of this.deletedProjects) {
			project.deleted = false;				
		}
		
		let response = this.apiService.put('/projects', {data: this.deletedProjects}).map(data => this.deletedProjects);

		this.deletedProjects = [];
		
		return response;
	}

}

