import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {MdDialogRef} from '@angular/material';
import {ApiService} from '../../shared/services/api.service';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Contact} from '../contacts/models/contact.model';

@Component({
	selector: 'project-edit-dialog',
	templateUrl: './project-edit-dialog.component.html',
})
export class ProjectEditDialog implements OnInit {

	ngOnInit(): void {
	
	}

	form: FormGroup
	isSubmitting: boolean = false;
	constructor(
		private fb: FormBuilder,
		private projectService: ProjectService,
		private dialogRef: MdDialogRef<ProjectEditDialog>,
		private apiService: ApiService
	) {

		// create form group using the form builder
		this.form = this.fb.group({
			description: '',
			organization: null
		});

	}



	submitForm() {
		this.isSubmitting = true;


		this.projectService.save(this.form.value).subscribe(data => {
			this.isSubmitting = false;
			this.dialogRef.close(data);
		}, data => {
			this.isSubmitting = false;

			console.log(data);
		});

	}

}
