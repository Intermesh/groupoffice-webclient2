import {Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {MdDialogRef, MdDialog} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {WysiwygComponent} from '../../shared/form/input/wysiwyg/wysiwyg.component';

import {Project} from './models/project.model';

@Component({
	selector: 'project-edit-dialog',
	templateUrl: './project-edit-dialog.component.html',
	
})
export class ProjectEditDialog extends AbstractForm {
	
	
	@ViewChild(WysiwygComponent) wysiwyg: WysiwygComponent

	constructor(		
		@Inject(MD_DIALOG_DATA) public data: Project = null,
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private dialogRef: MdDialogRef<ProjectEditDialog>
	) {	
		super(fb);	
		
		
		if(data) {
			this.form.patchValue(data);
		}
	}
	
	buildForm() {
		return this.fb.group({
			description: ['', Validators.compose([
//				Validators.required
				])
			],
			organization: null,
			deadline: null,
			startsAt: null
//			members: this.fb.array([
//				this.initMember(),
//			])
			
			
		});
	}
	
//	
//	initMember() {
//        // initialize our address
//        return this.fb.group({
//            username: ['']
//        });
//    }


	internalSubmit() {
		
		if(!this.data) {
			this.data = new Project();
		}
		
		
		
		Object.assign(this.data, this.form.value);
		return this.projectService.save(this.data);				
	}
	
	onSuccess(data) {
		this.dialogRef.close(data);
	}
	
	

}
