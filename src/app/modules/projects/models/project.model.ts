import {Deletable} from '../../../shared/models/deletable.interface';
import {Record} from '../../../shared/models/record.model';

export class ProposalItem extends Record implements Deletable{
	public pk() {
		return ["id"];
	}
	
	title: string
	content: string
	unitPrice: number
	quantity: number = 0
	quantityInHours: boolean = false
	deleted: boolean = false
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
}
