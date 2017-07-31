import { Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

/**
 * See contacts/contact-autocomplete.component.ts for an example
 */
export abstract class AutocompleteComponent<T> implements ControlValueAccessor, OnInit {
	@Input() placeholder = '';
	
	onChange: any = () => {};
	onTouched: any = () => {};

	inputControl = new FormControl();

	records: Observable<T[]>;
	private innerValue:T = null;

	get value() {
	
		return this.innerValue;
	}

	set value(val) {

		
		this.innerValue = val;
		this.onChange(val);
		this.onTouched();
	}

	constructor() {}

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
		this.records = this.inputControl.valueChanges
			.debounceTime(300)
			.distinctUntilChanged()
			
			.switchMap(value => value ? this.find(value) : Observable.of<T[]>([])
			
			);
			
		this.inputControl.valueChanges.subscribe(value => {
			
//			if(value instanceof Contact) { 
//			Somehow it't not a contact???
			if (value.id) {
				this.value = value;
			}
			});
	}

	protected abstract find(query: string): Observable<T[]>;

	protected abstract displayFn(record: T): string;

}

