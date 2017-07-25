
import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {Project} from './models/project.model';
import {ProjectService} from './services/project.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {SelectionModel} from '../../shared/selection-model/selection-model.service';
import {DragulaService} from 'ng2-dragula';

@Component({
	selector: 'projects-list',
	templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit, OnDestroy {

	private destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
	public data: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
	public selectionModel = new SelectionModel<Project>(this.data);

	constructor(
		private projectService: ProjectService,
		private router: Router,
		private dragulaService: DragulaService,
		private elementRef: ElementRef) {}

	ngOnInit() {
		this.load();
		
		//If a single selectiono is made then navigate to the project
		this.selectionModel.selected.takeUntil(this.destroyed).subscribe(selected => {
			if (selected.length == 1) {
				
				this.router.navigate(['/projects', selected[0].id, 'info']);
			}
		});

		//reload the list when the project data changes
		this.projectService.dataChanged.takeUntil(this.destroyed).subscribe(data => {
			this.load(true);
		});


		//Set the mirror container to the list component so the list CSS styles apply to the mirrror
		this.dragulaService.setOptions('list-bag', {
			mirrorContainer: this.elementRef.nativeElement
		});
		//Handle drop
		this.dragulaService.drop.takeUntil(this.destroyed).subscribe(event => this.onSort(event));
	}

	private onSort(sortEvent) {
		const draggedRecord = this.data.value.find(function (p) {
			return p.id == sortEvent[1].dataset.id;
		});

		if (sortEvent[4]) {
			const dropRecord = this.data.value.find(function (p) {
				return p.id == sortEvent[4].dataset.id;
			});

			const isMovedUp = draggedRecord.sortOrder > dropRecord.sortOrder;

			draggedRecord.sortOrder = isMovedUp ? dropRecord.sortOrder : dropRecord.sortOrder - 1;
		} else {
			//if there's after the dragged record it's at the end of the list				
			draggedRecord.sortOrder = this.data.value[this.data.value.length - 1].sortOrder;
		}

		this.projectService.save(draggedRecord);
	}

	ngOnDestroy(): void {
		this.destroyed.next(true);
		this.destroyed.complete();
	}

	onScroll() {
		this.load();
	}

	public load(reload: boolean = false) {

		this.projectService.find({
			offset: reload ? "0" : String(this.data.value.length),
			limit: reload ? String(this.data.value.length) : "10",
			returnProperties: 'id,description,number,sortOrder,organization[id,name]',
			//				orderDirection: this.sort.direction,
			//				orderColumn: this.sort.active,
			q: JSON.stringify([['joinRelation', 'organization', true, 'LEFT']])

		}).subscribe(data => {
			this.data.next(reload ? data.data : this.data.value.concat(data.data));
		});
	}
}




