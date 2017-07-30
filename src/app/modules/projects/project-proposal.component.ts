import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {Project, ProposalItem} from './models/project.model';
import {MdDialog} from '@angular/material';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {ProjectProposalEditDialog} from './project-proposal-edit-dialog.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {SelectionModel} from '../../shared/selection-model/selection-model.service';
import {DragulaService} from 'ng2-dragula';

@Component({
	templateUrl: './project-proposal.component.html',
	  styleUrls: ['./project-proposal.component.css']
})
export class ProjectProposalComponent  implements OnInit, OnDestroy {

	private project: Project;
	private destroyed: ReplaySubject<boolean> = new ReplaySubject(1);

	constructor(
		private route: ActivatedRoute,
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private dialog: MdDialog,
		private dragulaService: DragulaService
	) {

	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			this.project = data['project'];		
		});
	//Handle drop
		this.dragulaService.drop.takeUntil(this.destroyed).subscribe(event => this.onSort(event));
	}

	private onSort(sortEvent) {
		if(sortEvent[0] != 'pi-bag') {
			return;
		}
		const draggedRecord = this.project.proposalItems.find(function (p) {
			return p.id == sortEvent[1].dataset.id;
		});

		if (sortEvent[4]) {
			const dropRecord = this.project.proposalItems.find(function (p) {
				return p.id == sortEvent[4].dataset.id;
			});

			const isMovedUp = draggedRecord.sortOrder > dropRecord.sortOrder;

			draggedRecord.sortOrder = isMovedUp ? dropRecord.sortOrder : dropRecord.sortOrder - 1;
		} else {
			//if there's after the dragged record it's at the end of the list				
			draggedRecord.sortOrder = this.project.proposalItems[this.project.proposalItems.length - 1].sortOrder;
		}
		this.projectService.save(this.project);
	}
		
	edit(item: ProposalItem = null):void {
		
		if(!item) {
			item = new ProposalItem();
					
		}
		
		let dialogRef = this.dialog.open(ProjectProposalEditDialog, {data: item, width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			
			if(result) {
				if(item.isNew()) {
					this.project.proposalItems.push(item);
				}
				
				this.projectService.save(this.project);
			}

		});
	}
	
	
	toggleDelete(item: ProposalItem) {
		item.deleted = !item.deleted;
		
		this.projectService.save(this.project);
	}
	
	/**
	 * Opens images in a new tab
	 */
	onClick(event) {
		let el = event.target;
		
		while(el.parentElement && (el = el.parentElement)) {
			if(el.tagName == 'A') {
				window.open(el.href);
				event.preventDefault();
			}
		}
	}

ngOnDestroy(): void {
		this.destroyed.next(true);
		this.destroyed.complete();
	}


}




//
//
////import {Component, OnInit} from '@angular/core';
//import {ActivatedRoute} from '@angular/router';
//import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
//import {ProjectService} from './services/project.service';
//import {Project} from './models/project.model';
//
//import {AbstractForm} from '../../shared/form/abstract-form.component';
//
//@Component({
//	templateUrl: './project-proposal.component.html',
//	  styleUrls: ['./project-proposal.component.css']
//})
//export class ProjectProposalComponent extends AbstractForm implements OnInit {
//	protected buildForm(): FormGroup {
//		return this.fb.group({
//			proposalItems: this.fb.array([
//				this.initProposalItem(),
//			])
//			
//			
//		});
//	}
//	
//	initProposalItem() {
//        // initialize our address
//        return this.fb.group({
//            title: [''],
//						content: ['']
//        });
//    }
//	
//	protected internalSubmit() {
//		
//		Object.assign(this.project, this.form.value);		
//		return this.projectService.save(this.project);
//	}
//
//	private project: Project;
//
//	constructor(
//		private route: ActivatedRoute,
//		protected fb: FormBuilder,
//		private projectService: ProjectService
//	) {
//
//		super(fb)
//	}
//
//	ngOnInit(): void {
//		this.route.data.subscribe(data => {
//			this.project = data['project'];
//			
//			const dataLength = this.project.proposalItems.length;
//			
//			const control = <FormArray>this.form.controls["proposalItems"];
//			const formLength = control.controls.length;
//			
//			if (dataLength > formLength) {
//				for (let i = formLength; i < dataLength; i++) {
//					control.insert(i, this.initProposalItem());
//				}
//			}else
//			{
//				for (let i = formLength; i > dataLength; i--) {
//					control.removeAt(i);
//				}
//			}
//			
//			this.form.patchValue(this.project);
//			
//			console.log(this.form);
//		});
//	}
//
//
//
//}
