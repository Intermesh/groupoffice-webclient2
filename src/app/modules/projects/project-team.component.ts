import { Component, OnInit } from '@angular/core';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {Observable} from 'rxjs/Observable';
import {ProjectService} from './services/project.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Project, ProposalItem} from './models/project.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent extends AbstractForm implements OnInit {
	
	project: Project;
	
	roles: string[] = [];
	
	protected buildForm() {
		return this.fb.group({
			group: ['', Validators.compose([
				Validators.required
				])
			],
			role: [1]			
		});
	}
	
  constructor(		
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private route: ActivatedRoute
		
	) {	
		super(fb);	
		
		this.roles = [
		'Manager',
		'Worker',
		'Client'
		]

	}
  ngOnInit() {
		this.route.parent.data.subscribe(data => {
			this.project = data['project'];		
		});
  }
	
	protected validate() {
		
		if (this.project.groups.find(data => data.groupId == this.form.value.group.id)) {
			this.form.reset({
				group: null,
				role: 1
			});
			return false;
		}
		
		return super.validate();
	}
	

	
	
	protected internalSubmit(): Observable<any> {
		
		
		this.project.groups.push(this.form.value);
		
		this.form.reset();
		
		return this.projectService.save(this.project, 'groups[*,group[*,user[photoBlobId]]]');
	}


	delete (index) {
		this.project.groups[index].markDeleted = true;
		return this.projectService.save(this.project, "groups[*,group[*,user[photoBlobId]]]");
	}

}
