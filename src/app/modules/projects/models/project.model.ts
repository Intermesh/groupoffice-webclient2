import {Deletable} from '../../../shared/models/deletable.interface';
import {Record} from '../../../shared/models/record.model';

export class ProposalItem extends Record implements Deletable{
	public pk() {
		return ["id"];
	}
	
	id: number
	sortOrder: number
	title: string
	content: string
	unitPrice: number
	quantity: number = 0
	quantityInHours: boolean = false
	deleted: boolean = false
}

export class ProjectGroup extends Record{
	public pk() {
		return ["projectId", "groupId"];
	}
	markDeleted: boolean
	projectId: number
	groupId: number
	role: number
}

export class Project extends Record implements Deletable{
	public pk() {
		return ["id"];
	}
	
	id: number
	number: string
	description: string
	deleted: true
	sortOrder: number
	proposalItems: ProposalItem[]
	groups: ProjectGroup[]
	organization: any
}
