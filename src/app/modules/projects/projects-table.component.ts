
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

@Component({
	selector: 'projects-table',
	templateUrl: './projects-table.component.html'
})
export class ProjectsTableComponent implements OnInit {
	
	
	dataSource: ProjectDataSource | null;
	displayedColumns:string[] = ['number', 'description', 'organization'];
	
	@ViewChild(MdSort) sort: MdSort;
	@ViewChild(MdPaginator) paginator: MdPaginator;
	
	public selectedRows: Project[] = [];
	
	pageIndex: number = 0;
	pageSize: number = 5;
	

	constructor(private projectService: ProjectService, private dialog: MdDialog, private route: ActivatedRoute, private router: Router) {}
	
	ngOnInit() {
		this.dataSource = new ProjectDataSource(this.projectService, this.paginator, this.sort);
		this.paginator.page.subscribe(() => {			
			this.router.navigate(['/projects'], {queryParams: {pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize}});
		});
		this.route.queryParams.subscribe(data => {
			if(data.pageIndex) {
				this.pageIndex = data.pageIndex;
			}			
			if(data.pageSize) {
				this.pageSize = data.pageSize;
			}
		});
	}
	

	public edit() {
		let dialogRef = this.dialog.open(ProjectEditDialog, {width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {				
//				this.loadProjects(false);
				this.router.navigate(['/projects', result.id]);
			}
		});
	}

}




/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ProjectDataSource extends DataSource<any> {
  constructor(private projectService: ProjectService, private paginator: MdPaginator, private sort: MdSort) {
    super();
		
		
  }
	
	public count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	public data: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
	
	public load() {	
			
		this.projectService.find({
				offset: String(this.paginator.pageSize * this.paginator.pageIndex), 
				limit: String(this.paginator.pageSize),
				returnProperties: 'id,description,number,organization[id,name]',
				orderDirection: this.sort.direction,
				orderColumn: this.sort.active,
				q: JSON.stringify([['joinRelation', 'organization', true, 'LEFT']])
				
				
			}).subscribe(data => {
			this.count.next(data.count);					
			this.data.next(data.data);
		});
	}

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Project[]> {
		
		 const displayDataChanges = [
      this.paginator.page,
      this.sort.mdSortChange,
    ];
		
		
		Observable.merge(...displayDataChanges).subscribe(() => {
      this.load();
    });
		
		this.load();
			
		return this.data;
  }

  disconnect() {}
}