import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {ProjectService} from './services/project.service';
import {ProjectEditorService} from './services/project-editor.service';
import {Project} from './models/project.model';
@Component({  
  templateUrl: './project-proposal.component.html',
//  styleUrls: ['./project.component.css']
})
export class ProjectProposalComponent implements OnInit{
	ngOnInit(): void {
		
	}

  constructor(
	private route: ActivatedRoute,
  
	) { }
	
  


}
