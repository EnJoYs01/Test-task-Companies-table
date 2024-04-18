import { IBooleanCell, IStringCell } from '../table.types'

export interface IEmployee {
	isSelected: IBooleanCell;
	name: IStringCell;
	surname: IStringCell;
	position: IStringCell;
	id: string;
}

export interface IEmployeesState {
	employees: Array<CompanyEmployees>;
	isSelected: Array<IEmployeesBooleanFieldData>;
	name: Array<IEmployeesStringFieldData>;
	surname: Array<IEmployeesStringFieldData>;
	position: Array<IEmployeesStringFieldData>;
	selected: Array<string>;
	ids: Array<string>;
	currentCompany: {id: string; idx: number}
}

interface IEmployeesFieldsData {
	id: string;
	data: string | boolean;
}

interface IEmployeesBooleanFieldData extends IEmployeesFieldsData {
	data: boolean;
}

interface IEmployeesStringFieldData extends IEmployeesFieldsData {
	data: string;
}
export type IEmployeesFieldsType = IEmployeesStringFieldData | IEmployeesBooleanFieldData

export type IEmployeesFields = Omit<IEmployeesState, 'employees' | 'ids' | 'selected' | 'currentCompany'>

export interface IUpdateEmployeeField {
	newValue: string | boolean;
	fieldName: string;
	id: string;
}

export interface CompanyEmployees {
	[key: string]: Array<IEmployee>;
}

export interface IEmployeeFromServer {
	name: string;
	surname: string;
	position: string;
}

export interface ISetCompanyEmployeesPayloadData {
	employees: Array<IEmployeeFromServer>;
	companyId: string;
}