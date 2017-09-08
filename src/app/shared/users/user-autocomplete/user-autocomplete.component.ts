import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Rx';
import {User} from '../../models/user.model';
import {AutocompleteComponent} from '../../form/input/autocomplete/autocomplete.component';

@Component({
	selector: 'go-user-autocomplete',
	templateUrl: '../../form/input/autocomplete/autocomplete.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UserAutocompleteComponent),
			multi: true
		}
	]
})

export class UserAutocompleteComponent extends AutocompleteComponent<User> {
	constructor(private userService: UserService) {
		super();
	}
	protected find(query: string): Observable<User[]> {
		return this.userService.find({searchQuery: query}).map(data => data.data);
	}

	public displayFn(user: User): string {
		return user ? user.username : "";
	}

}
