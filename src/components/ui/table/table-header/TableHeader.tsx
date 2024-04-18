import { HeaderType, tableNameType } from '@/shared/types/table.types'
import { FC } from 'react'
import styles from './TableHeader.module.css'
import TableHeaderRow from './table-header-row/TableHeaderRow'

interface ITableHeader {
	headers: Array<HeaderType>
	tableName: tableNameType
}

const TableHeader: FC<ITableHeader> = ({headers, tableName}) => {
	return (
		<thead className={styles.tableHeader}>
			<TableHeaderRow headers={headers} tableName={tableName}/>
		</thead>
	)
}

export default TableHeader;