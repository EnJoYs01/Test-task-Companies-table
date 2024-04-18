import { CompanyEmployees, IEmployee, IEmployeesFields, IEmployeesState, ISetCompanyEmployeesPayloadData, IUpdateEmployeeField } from '@/shared/types/employees/employees.types'
import { generateId } from '@/utils/createId.util'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initStateArr: Array<CompanyEmployees> = [
	{
	'init state employee': []
	}
]

const initialState: IEmployeesState = {
	employees: initStateArr,
	isSelected: [],
	name: [],
	surname: [],
	position: [],
	selected: [],
	ids: [],
	currentCompany: {id: '', idx: 0}
}

export const employeesSlice = createSlice({
	name: 'employees',
	initialState: initialState,
	reducers: {
		clearEmployees: (state) => {
			state.employees.splice(0, state.employees.length);
		},
		setCompanyEmployees: (
			state, {payload}: PayloadAction<ISetCompanyEmployeesPayloadData>
		) => {
			const {companyId, employees} = payload;
			const employeesRow: Array<IEmployee> = employees.map((employee) => {
				const employeeId = generateId(state);
				state.ids.push(employeeId);
				return {
					id: employeeId,
					isSelected: {data: false},
					name: {data: employee.name},
					surname: {data: employee.surname},
					position: {data: employee.position}
				}
			});
			
			const companyEmployees: CompanyEmployees = {
				[companyId]: employeesRow
			};
			
			state.employees.push(companyEmployees);
		},
		setEmployeesFieldsData: (state) => {
			const employeesArray = state.employees;
			
			employeesArray.forEach((employeesWithCompany) => {
				const [employees] = Object.values(employeesWithCompany);
				employees.forEach((employee) => {
					state.isSelected.push({id: employee.id, data: employee.isSelected.data});
					state.name.push({id: employee.id, data: employee.name.data});
					state.surname.push(
						{id: employee.id, data: employee.surname.data}
					);
					state.position.push({id: employee.id, data: employee.position.data});
				})
			});
		},
		setCurrentCompany: (state, {payload}: PayloadAction<string>) => {
			state.currentCompany.id = payload;
			state.currentCompany.idx = state.employees.findIndex(
				(employeesCompany) => Object.keys(employeesCompany)[0] === payload
			)
		},
		setAllEmployeesRowsSelected: (state, {payload}:PayloadAction<boolean>) => {
			const isSelected = payload;
			const companyId = state.currentCompany.id;
			const companyIdx = state.currentCompany.idx
			let selectedArr: Array<string> = [];
			state.selected.splice(0,state.isSelected.length);
			
			const currentCompanyEmpIds = state.employees[companyIdx][companyId]
			.map((employee) => {
				return employee.id
			})
			
			if (isSelected) {
				state.isSelected.forEach((field) => {
					if (currentCompanyEmpIds.includes(field.id)){
						field.data = false
					}
				});
			} else {
				state.isSelected.forEach((field) => {
					if (currentCompanyEmpIds.includes(field.id)){
						field.data = true
						selectedArr.push(field.id)
					}
				});
			}
			state.selected = [...selectedArr];
		},
		updateEmployeeField: (
			state, {payload}: PayloadAction<IUpdateEmployeeField>
		) => {
			const {newValue, fieldName, id} = payload;
			const fieldIndex = state[fieldName as keyof IEmployeesFields].findIndex((field) => field.id === id);
			
			if (fieldIndex === -1) {
				throw new Error(`Failed to update field! Field with id ${id} was not found.`);
			}
			state[fieldName as keyof IEmployeesFields][fieldIndex].data = newValue;
		},
		addNewEmployeeToCompany: (state) => {
			const companyId = state.currentCompany.id;
			const companyIndex = state.currentCompany.idx
			const newEmployeeId = generateId(state);
			state.ids.push(newEmployeeId);
			
			const newEmployee: IEmployee = {
				isSelected: {data: false},
				name: {data: ''},
				surname: {data: '', isEditable: false},
				position: {data: ''},
				id: newEmployeeId
			};

			state.employees[companyIndex][companyId].push(newEmployee);
			
			state.isSelected.push(
				{id: newEmployeeId,data: newEmployee.isSelected.data}
			);
			
			state.name.push({id: newEmployeeId, data: newEmployee.name.data});
			
			state.surname.push(
				{id: newEmployeeId,data: newEmployee.surname.data}
			);
			
			state.position.push({id: newEmployeeId,data: newEmployee.position.data});
		},
		addOrDeleteEmployeeToSelected: (state, {payload}: PayloadAction<string>) => {
			const employeeId = payload;
			const isSelectedIndex = state.selected.findIndex(
				(id) => id === employeeId
			);
			
			if (isSelectedIndex !== -1) {
				state.selected.splice(isSelectedIndex,1)
			} else {				
				state.selected.push(employeeId);
			}
		},
		deleteEmployees: (state) => {	
			state.selected.forEach((id) => {
				const companyId = state.currentCompany.id;
				const companyIndex = state.currentCompany.idx
				
				const deletedEmployeeCompanyIndex = 
					state.employees[companyIndex][companyId]
					.findIndex((employee) => employee.id === id)
					
				if (deletedEmployeeCompanyIndex === -1) {
					throw new Error(`Failed to delete employee! Employee with id ${id} was not found.`)
				}
				
				state.employees[companyIndex][companyId].splice(deletedEmployeeCompanyIndex, 1)
				
				const deletedEmployeeIndex = state.ids.findIndex((el) => el === id)
				state.isSelected.splice(deletedEmployeeIndex,1);
				state.name.splice(deletedEmployeeIndex, 1)
				state.surname.splice(deletedEmployeeIndex,1);
				state.position.splice(deletedEmployeeIndex,1);
				state.ids.splice(deletedEmployeeIndex,1);
			})
			state.selected.splice(0,state.selected.length);
		}
	},
})
export const { reducer, actions } = employeesSlice;