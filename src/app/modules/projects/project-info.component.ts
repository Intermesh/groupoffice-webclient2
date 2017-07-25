import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {ProjectService} from './services/project.service';
import {ProjectEditorService} from './services/project-editor.service';
import {Project} from './models/project.model';
@Component({  
  templateUrl: './project-info.component.html',
//  styleUrls: ['./project.component.css']
})
export class ProjectInfoComponent implements OnInit{
	ngOnInit(): void {
		this.route.data.subscribe(data => { this.project = data['project']; });
	}

  constructor(
	private projectService: ProjectService,
  private route: ActivatedRoute,
  private location: Location,
	private projectEditorService: ProjectEditorService
	) { }
	private project: Project;

  


}
