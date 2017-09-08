import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ApiService} from '../../shared/services/api.service';
import {Observable} from 'rxjs/Rx';
import {Contact} from '../contacts/models/contact.model';
import {AutocompleteComponent} from '../../shared/form/input/autocomplete/autocomplete.component';

@Component({
	selector: 'go-contact-autocomplete',
	templateUrl: '../../shared/form/input/autocomplete/autocomplete.component.html',
	styleUrls: ['./contact-autocomplete.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ContactAutocompleteComponent),
			multi: true
		}
	]
})

export class ContactAutocompleteComponent extends AutocompleteComponent<Contact> {
	constructor(private apiService: ApiService) {
		super();
	}
	protected find(query: string): Observable<Contact[]> {
		return this.apiService.get('/contacts', {searchQuery: query}).map(data => data.data as Contact[]);
	}

	public displayFn(contact: Contact): string {
		return contact ? contact.name : "";
	}

}
