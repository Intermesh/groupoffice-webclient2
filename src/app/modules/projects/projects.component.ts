import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsTableComponent } from './projects-table.component';
import {ProjectService} from './services/project.service';
import {MdSnackBar} from '@angular/material';


import { Title } from '@angular/platform-browser';

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	
	@ViewChild(ProjectsTableComponent) projectsTable: ProjectsTableComponent
	
  constructor(private titleService: Title, private projectService: ProjectService, private snackBar: MdSnackBar) {}
	
	ngOnInit() {
		this.titleService.setTitle("Projects")
	}
	
//	onScroll() {
//		this.projectsTable.projectDatabase.load();
//	}
	
	
	add() {
		this.projectsTable.edit();
	}
	
//	delete() {
//		this.projectService.delete(this.projectsTable.selectedRows).subscribe(deletedProjects => {
//			
////			this.projectsTable.projectDatabase.load(false);
//			this.projectsTable.selectedRows = [];
//			
//			this.snackBar.open(
//			deletedProjects.length + " deleted",
//			"UNDO",
//			{
//				duration: 30000
//			}
//			).onAction().subscribe(() => {
//				
//				this.projectService.unDelete().subscribe(data => { this.projectsTable.projectDatabase.load(false); })
//			});
//			
//		});
//	}

}
