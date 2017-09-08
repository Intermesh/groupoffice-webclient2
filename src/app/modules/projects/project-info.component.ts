import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Project} from './models/project.model';

@Component({  
  templateUrl: './project-info.component.html',
//  styleUrls: ['./project.component.css']
})
export class ProjectInfoComponent implements OnInit{
	
	public project: Project;


  constructor(
  private route: ActivatedRoute
	) { }
	
	ngOnInit(): void {
		this.route.parent.data.subscribe(data => { 
			this.project = data['project']; 
		});
	}
	
  


}
