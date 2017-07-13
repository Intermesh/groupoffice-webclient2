import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {MdDialogRef, MdDialog} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {Project} from './models/project.model';

@Component({
	selector: 'project-edit-dialog',
	templateUrl: './project-edit-dialog.component.html',
})
export class ProjectEditDialog extends AbstractForm implements OnInit {

	ngOnInit(): void {

	}
	constructor(		
		@Inject(MD_DIALOG_DATA) public project: Project = new Project(),
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
		
		if(!this.project) {
			this.project = new Project();
		}
		
		Object.assign(this.project, this.form.value);
		return this.projectService.save(this.project);				
	}
	
	onSuccess(data) {
		this.dialogRef.close(data);
	}
	
	

}
