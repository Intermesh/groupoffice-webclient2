import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsTableComponent } from './projects-table.component';



import { Title } from '@angular/platform-browser';

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	
	@ViewChild(ProjectsTableComponent) projectsTable: ProjectsTableComponent
	
  constructor(private titleService: Title) {}
	
	ngOnInit() {
		this.titleService.setTitle("Projects")
	}
	
	onScroll() {
		console.log('scrolled');
		this.projectsTable.loadProjects();
	}
	
	
	add() {
		this.projectsTable.edit();
	}

}
