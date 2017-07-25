import {Component, Input, forwardRef, OnInit, ElementRef, EventEmitter} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {AccessTokenService} from '../../../services/access-token.service';
import {Observable} from 'rxjs/Rx';

import {environment} from '../../../../../environments/environment';
import {HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http'

@Component({
		
  selector: 'wysiwyg',
  template: `
	<trix-editor placeholder="{{placeholder}}"></trix-editor>`,
							
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WysiwygComponent),
			multi: true
		}
	]
})
export class WysiwygComponent implements OnInit, ControlValueAccessor {
	writeValue(obj: any): void {
		this.editor.loadHTML(obj);
	}
	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}
	setDisabledState(isDisabled: boolean): void {
		throw new Error("Method not implemented.");
	}
	onChange: any = () => {};
	onTouched: any = () => {};
	
	@Input() placeholder:string = '';
	
	editor: any;
	
	attachmentAdded: Observable<any> = new Observable();
	
	constructor(private elementRef: ElementRef, private httpClient: HttpClient, private accessTokenService: AccessTokenService) {}
	
	ngOnInit(): void {
		this.editor = this.elementRef.nativeElement.querySelector('trix-editor').editor;
		
		const el = this.editor.element;
		this.editor.element.addEventListener('trix-change', event => 	{
			this.onChange(this.editor.element.value);
		});
		
		this.attachmentAdded = Observable.fromEvent(el, "trix-attachment-add");

		this.attachmentAdded.subscribe(data => {
			this.onAttachmentAdded(data);
		});
	}
	
	private onAttachmentAdded(attachEvent) {
		if (!attachEvent.attachment.file) {
			return;
		}

		
		const file = attachEvent.attachment.file;
		let form:FormData = new FormData();
    form.append('file', file, file.name);
		
		const req = new HttpRequest('POST', environment.apiUrl + '/upload', form, {
			headers: new HttpHeaders({
				'Authorization': `Token ${this.accessTokenService.getToken()}`
			}),
			reportProgress: true
		});
		
		this.httpClient.request(req).subscribe(event => {			
			if (event.type === HttpEventType.UploadProgress) {
				// This is an upload progress event. Compute and show the % done:				
				const percentDone = Math.round(100 * event.loaded / event.total);				
		
				attachEvent.attachment.setUploadProgress(percentDone);
//				console.log(`File is ${percentDone}% uploaded.`);
			} else if (event instanceof HttpResponse) {
			console.log(attachEvent.attachment);
				return attachEvent.attachment.setAttributes({
					url: environment.apiUrl + "/thumb/" + event.body["data"].blobId + "?w=100&h=100&zc=1",
          href: environment.apiUrl + "/download/" + event.body["data"].blobId,
        });
			}
		});
	
	}
	

}