import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsTableComponent } from './projects-table.component';
import {ProjectService} from './services/project.service';

import {ProjectEditorService} from './services/project-editor.service';


import { Title } from '@angular/platform-browser';

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
	host: {class: 'myClass'},
})
export class ProjectsComponent implements OnInit {
	
  constructor(private titleService: Title, private projectEditorService: ProjectEditorService) {}
	
	ngOnInit() {
		this.titleService.setTitle("Projects")
	}	
	
	add() {
		this.projectEditorService.open();
	}
}
