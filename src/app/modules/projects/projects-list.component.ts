
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Project} from './models/project.model';
import {ProjectService} from './services/project.service';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SelectionModel} from '../../shared/selection-model/selection-model.service';


@Component({
	selector: 'projects-list',
	templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
	
	
	data: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);  
	selectionModel = new SelectionModel<Project>(this.data);
	constructor(private projectService: ProjectService, private router: Router) {}
	
	ngOnInit() {
		this.load();
		
		this.selectionModel.selected.subscribe(selected  => {
			if (selected.length == 1) {
				this.router.navigate(['/projects', selected[0].id]);
			}
		});		
		
		this.projectService.dataChanged.subscribe(data => {
			console.log(data);
			this.load(true);
		});
	}
	
	onScroll() {
		this.load();
	}
	
	
	
	
	
	public load(reload: boolean = false) {	
			
		this.projectService.find({
				offset: reload ? "0" : String(this.data.value.length), 
				limit: reload ? String(this.data.value.length) : "10",
				returnProperties: 'id,description,number,organization[id,name]',
//				orderDirection: this.sort.direction,
//				orderColumn: this.sort.active,
				q: JSON.stringify([['joinRelation', 'organization', true, 'LEFT']])
				
				
			}).subscribe(data => {				
			this.data.next(reload ? data.data : this.data.value.concat(data.data));
		});
	}
}




