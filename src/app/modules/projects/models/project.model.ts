import {Deletable} from '../../../shared/models/deletable.interface';
import {Record} from '../../../shared/models/record.model';

export class Project extends Record implements Deletable{
	public pk() {
		return ["id"];
	}
	
	id: number
	number: string
	description: string
	deleted: true
}
