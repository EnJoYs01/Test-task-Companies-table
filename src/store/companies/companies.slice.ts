import { ICompaniesFields, ICompaniesState, ICompany, ISetCompanyPayloadData, IUpdateCompanyField, RowCompanyType } from '@/shared/types/company/companies.types'
import { generateId } from '@/utils/createId.util'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initStateArr: Array<RowCompanyType> = [{
	id:'init state companies',
	isSelected: {data:false}, 
	name: {data: ''},
	numberOfEmployees: {data: 0},
	address: {data: ''}
}]

const initialState: ICompaniesState = {
	companies: initStateArr,
	isSelected: [],
	name: [],
	numberOfEmployees: [],
	address: [],
	selected: [],
	ids: []
}

export const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		clearCompanies: (state) => {
			state.companies.splice(0,state.companies.length);
		},
		setCompanyWithId: (
			state, {payload}: PayloadAction<ISetCompanyPayloadData>
		) => {
			const company = payload;
			const rowCompany: RowCompanyType = {
				id: company.id,
				isSelected: {data: false},
				name: {data: company.name},
				numberOfEmployees: {data: company.numberOfEmployees, isEditable: false},
				address: {data: company.address}
			};
			state.ids.push(company.id);
			state.companies.push(rowCompany);
		},
		setCompaniesWithIds: (
			state, {payload}: PayloadAction<Array<ICompany>>
		) => {
			const companies = payload;
			const companiesWithIds: Array<RowCompanyType> = companies.map(
				(company) => {
					const id = generateId(state);
					state.ids.push(id);
					return {...company, id: id}
			});
			state.companies = [...companiesWithIds];
		},
		setCompaniesFieldsData: (state) => {
			const companiesArray = state.companies;
			companiesArray.forEach((company) => {
				state.isSelected.push({id: company.id, data: company.isSelected.data});
				
				state.name.push({id: company.id, data: company.name.data});
				
				state.numberOfEmployees.push(
					{id: company.id, data: company.numberOfEmployees.data}
				);
				
				state.address.push({id: company.id, data: company.address.data});
			});
		},
		setAllCompaniesRowsSelected: (state, {payload}:PayloadAction<boolean>) => {
			const isSelected = payload;
			let selectedArr: Array<string> = [];
			
			state.selected.splice(0,state.isSelected.length);
			
			if (isSelected) {
				state.isSelected.map((field) => field.data = false);
			} else {
				state.isSelected.map((field) => {
					field.data = true;
					selectedArr.push(field.id)
				});
			}
			
			state.selected = [...selectedArr];
		},
		updateCompanyField: (
			state, {payload}: PayloadAction<IUpdateCompanyField>
		) => {
			const {newValue, fieldName, id} = payload;
			const fieldIndex = state[fieldName as keyof ICompaniesFields].findIndex((field) => field.id === id)
			
			if (fieldIndex === -1) {
				throw new Error(`Failed to update field! Field with id ${id} was not found.`)
			}
			state[fieldName as keyof ICompaniesFields][fieldIndex].data = newValue;
			
		},
		addNewCompany: (state) => {
			const newCompanyId = generateId(state);
			state.ids.push(newCompanyId);
			
			const newCompany: RowCompanyType = {
				isSelected: {data: false},
				name: {data: ''},
				numberOfEmployees: {data: 0, isEditable: false},
				address: {data: ''},
				id: newCompanyId
			};
			state?.companies?.push(newCompany);
			state.isSelected.push(
				{id: newCompanyId,data: newCompany.isSelected.data}
			);
			state.name.push({id: newCompanyId, data: newCompany.name.data});
			state.numberOfEmployees.push(
				{id: newCompanyId,data: newCompany.numberOfEmployees.data}
			);
			state.address.push({id: newCompanyId,data: newCompany.address.data});
		},
		addOrDeleteCompanyToSelected: (state, {payload}: PayloadAction<string>) => {
			const companyId = payload;
			const isSelectedIndex = state.selected.findIndex(
				(id) => id === companyId
			);
			
			if (isSelectedIndex !== -1) {
				state.selected.splice(isSelectedIndex,1)
			} else {				
				state.selected.push(companyId);
			}
		},
		deleteCompanies: (state) => {			
			state.selected.forEach((id) => {
				const deletedCompanyIndex = state.companies.findIndex(
					(company) => company.id === id
				);
				if (deletedCompanyIndex === -1) {
					throw new Error(`Failed to delete company! Company with id ${id} was not found.`)
				}

				state.companies.splice(deletedCompanyIndex, 1)
				state.isSelected.splice(deletedCompanyIndex,1);
				state.name.splice(deletedCompanyIndex,1);
				state.numberOfEmployees.splice(deletedCompanyIndex,1);
				state.address.splice(deletedCompanyIndex,1);
				state.ids.splice(deletedCompanyIndex,1);
			})
			state.selected.splice(0,state.selected.length);
		}
	}
})

export const { reducer, actions } = companiesSlice;