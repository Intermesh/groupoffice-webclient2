import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ApiService} from '../../../shared/services/api.service';
import {Project} from '../models/project.model';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ProjectService {

	constructor(
		private apiService: ApiService
	) {}
	
	find(params): Observable<Project[]> {
    // Convert any filters over to Angular's URLSearchParams
    const urlParams: URLSearchParams = new URLSearchParams();

    Object.keys(params)
    .forEach((key) => {
      urlParams.set(key, params[key]);
    }); 

    return this.apiService
    .get(
      '/projects',
      urlParams
    ).map(data => data.data);
  }


	// Update the user on the server (email, pass, etc)
	save (project: Project): Observable<Project> {
		
		let result;
		if(project.id) { 
			result = this.apiService.put('/projects', {data: project});
		} else
		{
			result = this.apiService.post('/projects', {data: project});
		}
		
		return result.map(data => Object.assign(project, data.data));
	}

}

