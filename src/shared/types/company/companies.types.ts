import { IEmployeeFromServer } from '../employees/employees.types'
import { IBooleanCell, INumberCell, IStringCell, RowType } from '../table.types'

export interface ICompany {
	isSelected: IBooleanCell;
	name: IStringCell;
	numberOfEmployees: INumberCell;
	address: IStringCell;
}

export interface ICompaniesState {
	companies: Array<RowCompanyType>;
	isSelected: Array<ICompaniesBooleanFieldData>;
	name: Array<ICompaniesStringFieldData>;
	numberOfEmployees: Array<ICompaniesNumberFieldData>;
	address: Array<ICompaniesStringFieldData>;
	selected: Array<string>;
	ids: Array<string>
}

interface ICompaniesFieldData {
	id: string,
	data: string | number | boolean
}

interface ICompaniesBooleanFieldData extends ICompaniesFieldData {
	data: boolean
}

interface ICompaniesStringFieldData extends ICompaniesFieldData {
	data: string
}

interface ICompaniesNumberFieldData extends ICompaniesFieldData {
	data: number
}

export type ICompaniesFieldsType = ICompaniesBooleanFieldData | ICompaniesStringFieldData | ICompaniesNumberFieldData

export type ICompaniesFields = Omit<ICompaniesState, 'companies' | 'ids' | 'selected'>

export interface IUpdateCompanyField {
	newValue: string | number | boolean;
	fieldName: string;
	id: string;
}

export type RowCompanyType = RowType & ICompany

export interface ICompanyFromServer {
	name: string;
	address: string;
	employees: Array<IEmployeeFromServer>;
}

export interface ISetCompanyPayloadData {
	id: string;
	name: string;
	address: string;
	numberOfEmployees: number;
}