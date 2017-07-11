import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {ProjectService} from './services/project.service';
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
  private location: Location
	) { }
	private project: Project;

  ngOnInit() {
		this.route.paramMap
    .switchMap((params: ParamMap) => this.projectService.get(+params.get('id'), {returnProperties: '*,organization'}))
    .subscribe(project => this.project = project);
  }
	
	back() {
		this.location.back();
	}

}
