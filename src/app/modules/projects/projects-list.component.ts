
import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from './models/project.model';
import {ProjectService} from './services/project.service';
import {MdDialog, MdPaginator, MdSort} from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';

import {ProjectEditDialog} from './project-edit-dialog.component';

import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import {SelectionModel} from '../../shared/selection-model/selection-model.service';


@Component({
	selector: 'projects-list',
	templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
	

	pageIndex: number = 0;
	pageSize: number = 5;
	
	data: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);  
	selectionModel = new SelectionModel<Project>(this.data);
	constructor(private projectService: ProjectService, private dialog: MdDialog, private route: ActivatedRoute, private router: Router) {}
	
	ngOnInit() {
//		this.dataSource = new ProjectDataSource(this.projectService, this.paginator, this.sort);
		this.load();
		
		this.selectionModel.selected.subscribe(selected  => {
			if (selected.length == 1) {
				this.router.navigate(['/projects', selected[0].id]);
			}
		});
	}
	
	onScroll() {
		this.load();
	}
	
	
	delete() {
		console.log('delete click');
	}
	
	
	public load() {	
			
		this.projectService.find({
				offset: String(this.data.value.length), 
				limit: "10",
				returnProperties: 'id,description,number,organization[id,name]',
//				orderDirection: this.sort.direction,
//				orderColumn: this.sort.active,
				q: JSON.stringify([['joinRelation', 'organization', true, 'LEFT']])
				
				
			}).subscribe(data => {				
			this.data.next(this.data.value.concat(data.data));
		});
	}
	


}




