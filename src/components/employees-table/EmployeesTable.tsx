import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IEmployee } from '@/shared/types/employees/employees.types'
import { ITable } from '@/shared/types/table.types'
import { employeesTableHeaders } from '@/store/employees/employees.data'
import cn from 'clsx'
import { ChangeEvent, FC } from 'react'
import Table from '../ui/table/Table'
import styles from './EmployeesTable.module.css'

interface IEmployeesTable {}

const EmployeesTable: FC<IEmployeesTable> = ({}) => {
	const {
		updateEmployeeField,
		addOrDeleteEmployeeToSelected,
		addNewEmployeeToCompany,
		updateCompanyField,
		deleteEmployees,
		setCurrentCompany
	} = useActions();
	
	let employees: Array<IEmployee> | null = null;

	const selectedCompanies = useTypedSelector(({companies}) => companies.selected);
	
	const selectedEmployeesCount = useTypedSelector(({employees}) => employees.selected.length)
	
	const numberOfEmpOfSelectedCompany = useTypedSelector(({companies}) => {
		if (selectedCompanies.length !== 1) return 0
		let numberOfEmp = 0;
		companies.numberOfEmployees.forEach((el) => {
			if (el.id === selectedCompanies[0]) {
				numberOfEmp = el.data
			}
		})
		return numberOfEmp
	})
	
	const employeesWithCompanies = useTypedSelector(
		({employees}) => employees.employees
	);
	
	if (selectedCompanies.length === 1) {
		const companyId = selectedCompanies[0]
		setTimeout(() =>setCurrentCompany(companyId),100)
		
		employeesWithCompanies.forEach((employeesWithCompany) => {
			if (Object.keys(employeesWithCompany)[0] === companyId) {
				employees = employeesWithCompany[companyId]
			}
		})
		
		const addNewRow = () => {
			addNewEmployeeToCompany();
			updateCompanyField(
				{
					newValue: numberOfEmpOfSelectedCompany + 1, 
					fieldName: 'numberOfEmployees', 
					id: companyId
				}
			);
		}
		
		const deleteSelectedRows = () => {
			deleteEmployees();
			updateCompanyField({
				newValue: numberOfEmpOfSelectedCompany - selectedEmployeesCount, fieldName: 'numberOfEmployees', 
				id: companyId}
			)
		}
		
		const updateHandler = (e: ChangeEvent<HTMLInputElement>, name: string, id: string) => {
			const newValue = e.target.value;
			updateEmployeeField({newValue, fieldName: name, id});
		}
		
		const updateCheckBoxHandler = (isSelected: boolean, id: string) => {
			updateEmployeeField({newValue: !isSelected, fieldName: 'isSelected', id});
			addOrDeleteEmployeeToSelected(id);
		}
		
		let props: ITable = {
			headers: employeesTableHeaders,
			data: employees ? employees : [],
			tableName: 'employees',
			addRowFunc: addNewRow,
			deleteRowsFunc: deleteSelectedRows,
			updateFieldFunc: updateHandler,
			updateCheckBoxFunc: updateCheckBoxHandler
		}
		return (
			<div className={cn(styles.employeesTable,styles.visible)}>
				<Table {...props} />
			</div>
		)
	}
	return <div></div>	
}

export default EmployeesTable