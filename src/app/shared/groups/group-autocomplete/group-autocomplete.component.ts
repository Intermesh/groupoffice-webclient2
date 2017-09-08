import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs/Rx';
import {Group} from '../group.model';
import {AutocompleteComponent} from '../../form/input/autocomplete/autocomplete.component';

@Component({
	selector: 'go-group-autocomplete',
	templateUrl: '../../form/input/autocomplete/autocomplete.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GroupAutocompleteComponent),
			multi: true
		}
	]
})

export class GroupAutocompleteComponent extends AutocompleteComponent<Group> {
	constructor(private apiService: ApiService) {
		super();
	}
	protected find(query: string): Observable<Group[]> {
		return this.apiService.get("/auth/groups", {searchQuery: query}).map(data => data.data);
	}

	public displayFn(user: Group): string {
		return user ? user.name : "";
	}

}
