import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from './models/project.model';
import { Issue } from './models/issue.model';
import { ProjectService } from './services/project.service';
import { Observable } from 'rxjs/Observable';
import { IssueEditorService } from './services/issue-editor.service';




@Component({
	selector: 'app-project-issues',
	templateUrl: './project-issues.component.html',
	styleUrls: ['./project-issues.component.css'],

})
export class ProjectIssuesComponent implements OnInit {

	project: Project;

	issues: Observable<Issue[]>;
	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectService,
		private issueEditorService: IssueEditorService

	) { }

	ngOnInit() {

		this.route.parent.data.subscribe(data => {
			this.project = data['project'];

			this.issues = this.projectService.getIssuesService(this.project).find({
				returnProperties: '*,creator'
			}).map(data => data.data);
		});


	}

	create() {
		this.issueEditorService.create(this.project);
	}

	onScroll () {
		
	}

}
