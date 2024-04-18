import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { tableNameType } from '@/shared/types/table.types'
import { FC } from 'react'
import Checkbox from '../../table-cell/input/checkbox/Checkbox'
import styles from './TableHeaderCell.module.css'

interface ITableHeaderCell {
	data: string | boolean
	tableName: tableNameType
}

const TableHeaderCell: FC<ITableHeaderCell> = ({
	data, 
	tableName
}) => {
	const {
		setAllCompaniesRowsSelected,
		setAllEmployeesRowsSelected
	} = useActions();
	let isSelected = false;
	
	if (tableName === 'companies') {		
		isSelected = useTypedSelector(
			({companies}) => 
				companies.selected.length 
				=== 
				companies.isSelected.length
		);
	} else {
		isSelected = useTypedSelector(({employees}) => {
			const companyId = employees.currentCompany.id;
			const companyIdx = employees.currentCompany.idx;
			if (!companyIdx) return false
			return employees.selected.length 
			=== 
			employees.employees[companyIdx][companyId].length	
		})
	}
	
	const updateHandler = () => {
		tableName === 'companies' ? 
		setAllCompaniesRowsSelected(isSelected) 
		: 
		setAllEmployeesRowsSelected(isSelected)
	}
	
	if (typeof data === 'boolean') {
		return (
			<th className={styles.headerCell}>
				<div>
					<Checkbox onChange={updateHandler} isSelected={isSelected} />
				</div>
			</th>
		)
	}
	return <th className={styles.headerCell}>{data}</th>
}

export default TableHeaderCell