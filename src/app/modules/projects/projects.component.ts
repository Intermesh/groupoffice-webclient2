import { Component } from '@angular/core';
import {ProjectEditorService} from './services/project-editor.service';



@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
	
  constructor(private projectEditorService: ProjectEditorService) {}
	
	add() {
		this.projectEditorService.open();
	}
}
