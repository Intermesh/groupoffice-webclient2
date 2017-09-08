import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Project} from './models/project.model';
import {Issue} from './models/issue.model';
import {ProjectService} from './services/project.service';
import {Observable} from 'rxjs/Observable';
import {IssueEditorService} from './services/issue-editor.service';

import {trigger, state, animate, style, transition} from '@angular/core';

// function routerTransition() {
//   return slideToLeft();
// }

// function slideToLeft() {
//   return trigger('routerTransition', [
//     state('void', style({position:'fixed', width:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%'}) ),
//     transition(':enter', [  // before 2.1: transition('void => *', [
//       style({transform: 'translateX(100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
//     ]),
//     transition(':leave', [  // before 2.1: transition('* => void', [
//       style({transform: 'translateX(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
//     ])
//   ]);
// }

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
	// animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class IssueComponent implements OnInit {
	
	project: Project;
	issue: Issue;

  constructor(
			private route: ActivatedRoute,
			private projectService: ProjectService,
			private issueEditorService: IssueEditorService

	) { }


  ngOnInit() {
		
		this.route.parent.data.subscribe(data => {
			this.project = data['project'];		
		});
		
		this.route.data.subscribe(data => {
			this.issue = data['issue'];
		});
		
		
  }

}
