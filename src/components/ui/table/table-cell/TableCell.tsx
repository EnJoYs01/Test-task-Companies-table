import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ICompaniesFields, ICompaniesFieldsType } from '@/shared/types/company/companies.types'
import { IEmployeesFields, IEmployeesFieldsType } from '@/shared/types/employees/employees.types'
import { ICell, ICellManage } from '@/shared/types/table.types'
import cn from 'clsx'
import { FC } from 'react'
import styles from './TableCell.module.css'
import Input from './input/Input'
import Checkbox from './input/checkbox/Checkbox'
import { useInputType } from './useInputType'

interface ITableCell extends Omit<ICell, 'data'>, ICellManage {
	name: string;
	id: string;
}

const TableCell: FC<ITableCell> = (props) => {
	const {
		tableName,
		name,
		id,
		isEditable = true,
		isBold = false,
		updateFieldFunc,
		updateCheckBoxFunc
	} = props
	
	let field: ICompaniesFieldsType | IEmployeesFieldsType | undefined;
	
	if (tableName === 'companies') {
		field = useTypedSelector(
			(state) => state[tableName][name as keyof ICompaniesFields].find(
				(field) => field.id === id
		));
	} else {
		field = useTypedSelector(
			(state) => state[tableName][name as keyof IEmployeesFields].find(
				(field) => field.id === id
		));
	}	

	const isSelected = useTypedSelector((state) => {
		let isSelected = false
		if (name !== 'isSelected') {
			const field = state[tableName].isSelected.find(
				(field) =>	field.id === id
			);
			if (field?.data) {
				isSelected = field.data
			}
		} else {
			isSelected = typeof field?.data === 'boolean' ? field.data : false;
		}
		return isSelected
	})
	
	let data: string | number | boolean = ''
	
	if (name === 'isSelected') {
		data = field?.data ?? false;
	} else {
		data = field?.data ?? '';
	}
	
	const type = useInputType(data);
	
	if (isBold) {
		return (
			<th className={cn(
				styles.tableCell, 
				styles.tableHCell, 
				{[styles.selected]: isSelected}
			)}>
				{
					isEditable ?
						<div>
							{
								type !== 'checkbox' ? 
									<Input 
										type={type}
										value={data}
										onChange={(e) => updateFieldFunc(e,name,id)} 
									/> : 
									<Checkbox 
										onChange={() => updateCheckBoxFunc(isSelected, id)} 
										isSelected={isSelected}
									/>
							}
						</div>
					:
						data
				}
			</th>
		)
	}
	
	return (
		<td className={cn(styles.tableCell, {[styles.selected]: isSelected})}>
				{
					isEditable ? 	
						<div>
							{
								type !== 'checkbox' ? 
									<Input 
										type={type} 
										value={data} 
										onChange={(e) => updateFieldFunc(e,name,id)} 
									/> : 
									<Checkbox 
										onChange={() => updateCheckBoxFunc(isSelected, id)}
										isSelected={isSelected}
									/>
							}
						</div>
					:
						<span>{data}</span> 
				}
		</td>
	)
}

export default TableCell;