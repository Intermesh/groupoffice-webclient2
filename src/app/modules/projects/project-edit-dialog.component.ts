import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {MdDialogRef} from '@angular/material';

import {AbstractForm} from '../../shared/form/abstract-form.component';

@Component({
	selector: 'project-edit-dialog',
	templateUrl: './project-edit-dialog.component.html',
})
export class ProjectEditDialog extends AbstractForm implements OnInit {

	ngOnInit(): void {

	}
	constructor(		
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private dialogRef: MdDialogRef<ProjectEditDialog>
	) {	
		super(fb);	
	}
	
	buildForm() {
		return this.fb.group({
			description: ['', Validators.compose([
//				Validators.required
				])
			],
			organization: null,
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
		return this.projectService.save(this.form.value);				
	}
	
	onSuccess(data) {
		this.dialogRef.close(data);
	}
	

}
