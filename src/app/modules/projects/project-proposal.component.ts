import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {Project, ProposalItem} from './models/project.model';
import {MdDialog} from '@angular/material';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {ProjectProposalEditDialog} from './project-proposal-edit-dialog.component';

@Component({
	templateUrl: './project-proposal.component.html',
	  styleUrls: ['./project-proposal.component.css']
})
export class ProjectProposalComponent  implements OnInit {

	private project: Project;

	constructor(
		private route: ActivatedRoute,
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private dialog: MdDialog,
	) {

	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			this.project = data['project'];		
		});
	}
		
	edit(item: ProposalItem):void {
		let dialogRef = this.dialog.open(ProjectProposalEditDialog, {data: item, width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			
			this.projectService.save(this.project);
//			if(result) {				
//				
//			}
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
