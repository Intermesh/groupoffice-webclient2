import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';

import {ProjectService} from './services/project.service';
import {ProjectEditorService} from './services/project-editor.service';
import {Project} from './models/project.model';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(
	private projectService: ProjectService,
  private route: ActivatedRoute,
  private router: Router,
	private projectEditorService: ProjectEditorService
	) { }
	private project: Project;

  ngOnInit() {
		
		
//		
//		this.route.paramMap.subscribe(data => {
//			
//			console.log(this.project);
//			this.project = null;
//		})
		
		this.route.data.subscribe(data => { 			
			this.project = data['project']; 
		});
		
//		this.route.paramMap
//    .switchMap((params: ParamMap) => this.projectService.read(+params.get('id'), {returnProperties: '*,organization'}))
//    .subscribe(project => this.project = project);
  }
//	
//	back() {
//		this.location.back();
//	}
	
	edit(project: Project) {
		this.projectEditorService.open(project);
	}

}
