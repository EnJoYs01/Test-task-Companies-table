import { ICellManage, RowType } from '@/shared/types/table.types'
import { FC } from 'react'
import TableRow from '../table-row/TableRow'
import styles from './TableBody.module.css'

interface ITableBody extends ICellManage {
	data: Array<RowType>
}

const TableBody: FC<ITableBody> = (props) => {
	const {data} = props
	const {data: _, ...propsWithoutData} = props
	return (
		<tbody className={styles.tableBody}>
			{data.map(
				(el, idx) =><TableRow key={idx} data={el} {...propsWithoutData} />
			)}
		</tbody>
	)
}

export default TableBody;