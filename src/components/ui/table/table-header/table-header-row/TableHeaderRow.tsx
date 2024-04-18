import { tableNameType } from '@/shared/types/table.types'
import { FC } from 'react'
import styles from '../../table-row/TableRow.module.css'
import TableHeaderCell from '../table-header-cell/TableHeaderCell'

interface ITableHeaderRow {
	headers: Array<string | boolean>,
	tableName: tableNameType
}

const TableHeaderRow: FC<ITableHeaderRow> = ({headers, tableName}) => {
	return (
		<tr className={styles.tableRow}>
			{headers.map((header, idx) => 
			<TableHeaderCell 
				key={idx} 
				data={header} 
				tableName={tableName} 
			/>)}
		</tr>
	)
}

export default TableHeaderRow