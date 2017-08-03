import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Project} from './models/project.model';
import {Issue} from './models/issue.model';
import {ProjectService} from './services/project.service';
import {Observable} from 'rxjs/Observable';
import {IssueEditorService} from './services/issue-editor.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
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
