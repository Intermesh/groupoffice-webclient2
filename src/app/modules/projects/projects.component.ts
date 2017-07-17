import { Component, ViewChild } from '@angular/core';
import {ProjectEditorService} from './services/project-editor.service';
import {ProjectsListComponent} from './projects-list.component';
import {MdSidenav, MdSnackBar} from '@angular/material';
import {ProjectService} from './services/project.service';

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
	
	@ViewChild(MdSidenav) sidenav: MdSidenav
	@ViewChild(ProjectsListComponent) list: ProjectsListComponent
	
  constructor(private projectEditorService: ProjectEditorService, private snackBar: MdSnackBar, private projectService: ProjectService,) {}
	
	add() {
		this.projectEditorService.open();
	}
	
	delete() {
		this.projectService.delete(this.list.selectionModel.selected.value).subscribe(deletedProjects => {	

			this.list.selectionModel.clear();
			
			this.snackBar.open(
			deletedProjects.length + " deleted",
			"UNDO",
			{
				duration: 30000
			}
			).onAction().subscribe(() => {
				
				this.projectService.unDelete();
			});
			
		});
	}
	
	toggleSidenav() {
		this.sidenav.toggle()
	}
}
