import {Deletable} from '../../../shared/models/deletable.interface';
import {Record} from '../../../shared/models/record.model';
import {User} from '../../../shared/models/user.model';
import {Project} from './project.model';

export class Issue extends Record{
	public pk() {
		return ["id"];
	}
	
	id: number
	projectId: number
	project: Project
	title: string
	creator: User
	assignedTo: User
	closedAt: Date
	creadtedAt: Date
	modifiedAt: Date	
	
}
