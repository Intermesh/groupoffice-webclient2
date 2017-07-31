import {Record} from '../models/record.model'
import {Deletable} from '../models/deletable.interface';

export class Group extends Record implements Deletable {
	pk() {
		return ["id"];
	}
	id: number
	deleted: boolean
	name: string
	
}
