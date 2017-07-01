import {ITdDataTableColumn} from '@covalent/core';
import {Component, OnInit} from '@angular/core';
import {Project} from './models/project.model';
import {ProjectService} from './services/project.service';
import {MdDialog} from '@angular/material';

import {ProjectEditDialog} from './project-edit-dialog.component';

@Component({
	selector: 'projects-table',
	templateUrl: './projects-table.component.html'
})
export class ProjectsTableComponent implements OnInit {
	constructor(private projectService: ProjectService, private dialog: MdDialog) {}
	
	private loading = false;	
	private data: Project[] = [];
	
	ngOnInit() {
		this.loadProjects()
	}
	public loadProjects(append: boolean = true) {
		this.loading = true;
    //this.data = [];
		
		let offset: number;
		let limit: number;
		
		offset = append ? this.data.length : 0;
		limit = append ? 5 :  this.data.length;
		
		this.projectService.find({offset: offset, limit: limit, returnProperties: 'id,description,number,organization[id,name]'})
    .subscribe(data => {
      this.loading = false;
			
			if(append) {
				this.data = this.data.concat(data);
			} else
			{
				this.data = data;
			}
      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      //this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    });
	}
	
	public reload() {
		
	}
	
	public edit() {
		let dialogRef = this.dialog.open(ProjectEditDialog, {width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.loadProjects(false);
			}
		});
	}

	
	
	private columns: ITdDataTableColumn[] = [
		{name: 'number', label: 'Project #', sortable: true},
		{name: 'description', label: 'Description'},
		{name: 'organization.name', label: 'Organization'}
	];

}
