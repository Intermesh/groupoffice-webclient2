import { Input, OnInit, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {ReplaySubject} from 'rxjs/ReplaySubject';

/**
 * See contacts/contact-autocomplete.component.ts for an example
 */
export abstract class AutocompleteComponent<T> implements ControlValueAccessor, OnInit, OnDestroy {
	
	private destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
	
	@Input() placeholder = '';
	
	onChange: any = () => {};
	onTouched: any = () => {};

	inputControl = new FormControl();

	records: Observable<T[]>;

	constructor() {}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value) {
		this.inputControl.setValue(value);
	}

	ngOnInit(): void {
		this.records = this.inputControl.valueChanges
			.takeUntil(this.destroyed)
			.debounceTime(300)
			.distinctUntilChanged()			
			.switchMap(value => value ? this.find(value) : Observable.of<T[]>([]));
			
			
		this.inputControl.valueChanges
			.takeUntil(this.destroyed)
			.subscribe(value => {
			this.onChange(value);
			});
	}
	
	ngOnDestroy(): void {
		this.destroyed.next(true);
		this.destroyed.complete();
	}

	protected abstract find(query: string): Observable<T[]>;

	protected abstract displayFn(record: T): string;

}

