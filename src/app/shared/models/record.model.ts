export abstract class Record {
	abstract pk(): string[] | number[];
	
	public isNew() {
		for(const col of this.pk()) {
			if(this[col] != null) {
				return false;
			}
		}
		
		return true;
	}
}
