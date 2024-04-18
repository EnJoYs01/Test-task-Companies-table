import { ICellManage, RowType } from '@/shared/types/table.types'
import { FC } from 'react'
import TableCell from '../table-cell/TableCell'
import styles from './TableRow.module.css'

interface ITableRow extends ICellManage {
	data: RowType,
}

const TableRow: FC<ITableRow> = (props) => {
	const {data} = props;
	const {data: _, ...propsWithoutData} = props;
	const rowId = data.id;
	const dataArray = Object.entries(data);
	const idIndex = dataArray.findIndex((array) => array[0] === 'id');
	const rowDataWithoutId = [
		...dataArray.slice(0, idIndex),
		...dataArray.slice(idIndex+ 1)
	]
	
	return (
		<tr className={styles.tableRow}>
			{
				rowDataWithoutId.map((rowItem, idx) => {
					const columnName = rowItem[0];
					if (typeof rowItem[1] === 'string') return
					const rowCell = rowItem[1];
					return <TableCell
						key={idx}
						name={columnName}
						id={rowId}
						isEditable={rowCell.isEditable}
						isBold={rowCell.isBold}
						{...propsWithoutData}
					/>
				})
			}
		</tr>
	)
}

export default TableRow;