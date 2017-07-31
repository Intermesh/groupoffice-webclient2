import {Record} from './record.model'
import {Deletable} from './deletable.interface';

export class User extends Record implements Deletable {
	pk() {
		return ["id"];
	}
	id: number
	deleted: boolean
	username: string
	password: string
	token: any
}
