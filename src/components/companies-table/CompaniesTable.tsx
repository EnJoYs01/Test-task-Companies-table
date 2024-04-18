import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ISetCompanyPayloadData } from '@/shared/types/company/companies.types'
import { ITable } from '@/shared/types/table.types'
import { companiesArr, companiesTableHeaders } from '@/store/companies/companies.data'
import { generateId } from '@/utils/createId.util'
import { ChangeEvent, FC } from 'react'
import Table from '../ui/table/Table'

interface ICompaniesTable {}

const CompaniesTable: FC<ICompaniesTable> = ({}) => {
  const {
		addNewCompany, 
		deleteCompanies,
		updateCompanyField, 
		addOrDeleteCompanyToSelected,
		setCompaniesFieldsData,
		setCompanyWithId,
		setCompanyEmployees,
		clearCompanies,
		clearEmployees,
		setEmployeesFieldsData
	} = useActions();
	
	const companies = useTypedSelector(({companies}) => companies.companies);
	
	if (companies[0]?.id === 'init state companies') {
		clearCompanies();
		clearEmployees();
		companiesArr.forEach((company) => {
			const {employees: _,...companyWithoutEmp} = company;
			const companyId = generateId('companies');
			const companyField: ISetCompanyPayloadData = {
				id: companyId,
				numberOfEmployees: company.employees.length,
				...companyWithoutEmp
			};
			setCompanyWithId(companyField);
			setCompanyEmployees({companyId, employees: company.employees});
		})
		setCompaniesFieldsData();
		setEmployeesFieldsData();
	}
	
  const addNewRow = () => {
    addNewCompany();
  }
  
  const deleteSelectedRows = () => {
    deleteCompanies()
  }
	
	const updateHandler = (e: ChangeEvent<HTMLInputElement>, name: string, id: string) => {
		const newValue = e.target.value;
		updateCompanyField({newValue, fieldName: name, id});
	}
	
	const updateCheckBoxHandler = (isSelected: boolean, id: string) => {
		updateCompanyField({newValue: !isSelected, fieldName: 'isSelected', id});
		addOrDeleteCompanyToSelected(id);
	}
	
	const props: ITable = {
		headers: companiesTableHeaders,
		data: companies,
		tableName: 'companies',
		addRowFunc: addNewRow,
		deleteRowsFunc: deleteSelectedRows,
		updateFieldFunc: updateHandler,
		updateCheckBoxFunc: updateCheckBoxHandler
	}
	return (
		<div>
			<Table {...props} />
		</div>
	)
}

export default CompaniesTable