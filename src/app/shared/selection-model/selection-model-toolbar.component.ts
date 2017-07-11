import { Component, Input } from '@angular/core';

import {SelectionModel} from './selection-model.service';

@Component({
  selector: 'go-selection-model-toolbar',
  templateUrl: './selection-model-toolbar.component.html',
	styleUrls: ['./selection-model-toolbar.component.scss']
})
export class SelectionModelToolbar {


  @Input()
  selectionModel: SelectionModel<any>;


}

