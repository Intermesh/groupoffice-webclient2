

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class SelectionModel<T> {	

	constructor(private data: BehaviorSubject<T[]>) {

	}

	selected: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
	
	lastSelection: T;
	
	select(model: T, event) {		
		
		if(event.shiftKey) {
			
			const newSelection = [];
			let select = false;
			
			for(let i of this.data.value) {
				if(select) {
					newSelection.push(i);
				}
				
				if (i == this.lastSelection || i == model) {					
					if(select) {
						break;
					} else {
						select = true;
						newSelection.push(i);
					}
				}
			}
			
			this.selected.next(newSelection);
			
			event.preventDefault();
			
		} else if(event.ctrlKey) {
		
			if (this.isSelected(model)) {
				this.selected.next(this.selected.value.filter(i => i != model));
			} else {		
				this.selected.next(this.selected.value.concat([model]));
			}
		}else{
			this.selected.next([model]);
		}
		
		this.lastSelection = model;
	}
	
	isSelected(model: T): boolean {
		return this.selected.value.indexOf(model) > -1;
	}
	
	clear(): void {
		this.selected.next([]);
	}
}
