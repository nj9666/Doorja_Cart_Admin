import { BaseModel } from '../../_base/crud';

export class CategoryModel  extends BaseModel {
	id: number;
	pCatId: number;
	name: string;
	createDt: Date;
	updateDt: Date;
	isActive: boolean;
	
	clear() {
		this.id = 0;
		this.pCatId = 0;
		this.name = '';
		this.createDt = new Date();
		this.updateDt = new Date();
		this.isActive = true;
	}
}