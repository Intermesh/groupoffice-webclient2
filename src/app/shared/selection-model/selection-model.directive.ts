import {Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';
import {SelectionModel} from './selection-model.service';

@Directive({
  selector: '[goSelectionModel]'
})
export class SelectionModelDirective {
	
	@Input('goSelectionModel') selectionModel: SelectionModel<any>;
	@Input('goSelectValue') selectValue: any;
	
	@HostBinding('class.go-selected')
	 get isSelected(): boolean {
//		console.log(this.selectionModel.isSelected(this.selectValue));
		return this.selectionModel.isSelected(this.selectValue);
	}
	
//	ngOnInit() {
//		this.selectionModel.selected.subscribe(() => {
//			console.log('selection change');
//			if (this.selectionModel.isSelected(this.selectValue)) {
//				this.el.nativeElement.classList.add('go-selected');
//				
//			}else
//			{
//				this.el.nativeElement.classList.remove('go-selected');
//			}
//		});
//		
//	}
  constructor(private el: ElementRef) {
		
		
	}
 
  @HostListener('click', ['$event']) onClick($event) {
		this.selectionModel.select(this.selectValue, $event);
		
		
  }
 


}
