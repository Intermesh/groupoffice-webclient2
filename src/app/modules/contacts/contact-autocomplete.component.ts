import {Component, Input, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';
import {ApiService} from '../../shared/services/api.service';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Contact} from '../contacts/models/contact.model';

@Component({
	selector: 'go-contact-autocomplete',
	templateUrl: './contact-autocomplete.component.html',
	styleUrls: ['./contact-autocomplete.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ContactAutocompleteComponent),
			multi: true
		}
	]
})
export class ContactAutocompleteComponent implements ControlValueAccessor, OnInit {
	@Input() placeholder = 'Contact';
	
	onChange: any = () => {};
	onTouched: any = () => {};

	inputControl = new FormControl();

	organizations: Observable<Contact[]>;
	private innerValue:Contact = null;

	get value() {
	
		return this.innerValue;
	}

	set value(val) {

		
		this.innerValue = val;
		this.onChange(val);
		this.onTouched();
	}

	constructor(private apiService: ApiService) {}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value) {
		if (value) {
			this.value = value;
			this.inputControl.setValue(value);
		}
	}

	ngOnInit(): void {
		this.organizations = this.inputControl.valueChanges
			.debounceTime(300)
			.distinctUntilChanged()
			
			.switchMap(value => value ? this.findOrganizations(value) : Observable.of<Contact[]>([])
			
			);
			
		this.inputControl.valueChanges.subscribe(value => {
			
//			if(value instanceof Contact) { 
//			Somehow it't not a contact???
			if (value.id) {
				this.value = value;
			}
			});
	}

	findOrganizations(query: string): Observable<Contact[]> {
		return this.apiService.get('/contacts', {searchQuery: query}).map(data => data.data as Contact[]);
	}

	displayFn(contact: Contact): string {
		return contact ? contact.name : "";
	}

}
