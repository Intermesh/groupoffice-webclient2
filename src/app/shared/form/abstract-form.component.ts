import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Observable, Subject} from 'rxjs/Rx';

export abstract class AbstractForm {

	submit: Subject<any>;
	form: FormGroup
	isSubmitting: boolean = false;
	constructor(
		protected fb: FormBuilder	
	) {

		// create form group using the form builder
		this.form = this.buildForm();
		
		this.form.statusChanges
      .subscribe(data => this.onStatusChanged(data));
 
    this.onStatusChanged(); // (re)set validation messages now
	}
	
	protected abstract buildForm(): FormGroup;
	


	formErrors: {[key: string ]: any} = {
		'description': ''
	};

	validationMessages: {[key: string ]: any} = {
		'description': {
			'required': 'A description is required.',			
			1: "Server says required"
		}
	};

	onStatusChanged(data?: any) {
			
		if (!this.form) {return;}
		const form = this.form;

		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);

			if (control && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	};


	submitForm() {

		if (this.form.invalid) {
			return;
		}

		this.isSubmitting = true;	
		
		
		return this.internalSubmit().subscribe(data => {
			this.isSubmitting = false;
			this.onSuccess(data);			
		}, data => {
			this.isSubmitting = false;			
			this.handleServerValidationErrors(this.form.controls, data.data, this.formErrors);
			this.onError(data);
		});
	}
	
	protected onSuccess(data: any) {
		
	}
	
	protected onError(data: any) {
		
	}
	
	protected abstract internalSubmit(): Observable<any>;
	
	handleServerValidationErrors(controls: any, data: any, formErrors: any) {
		
		for (let key in controls) {
			let control = controls[key];
			
			if(control instanceof FormArray) {
				
				if(data[key]) {
					formErrors[key] = formErrors[key] || [];				
					this.handleServerValidationErrors(control.controls, data[key], formErrors[key]);				
				}
			} else
			{
				if(data.validationErrors && data.validationErrors[key]) {
					formErrors[key] = data.validationErrors[key].code;
					let errors: any = {};
					errors[data.validationErrors[key].code] = true;
					control.setErrors(errors);
				}
			}
		}
	};

}

