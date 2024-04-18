import { ITable } from '@/shared/types/table.types'
import { FC } from 'react'
import styles from './Table.module.css'
import TableBody from './table-body/TableBody'
import TableHeader from './table-header/TableHeader'

const Table: FC<ITable> = (props) => {  
  const {
    headers, 
    data,
    addRowFunc, 
    deleteRowsFunc,
    tableName
  } = props;
  
  const bodyProps = (({tableName, updateFieldFunc, updateCheckBoxFunc}) => ({tableName, updateFieldFunc, updateCheckBoxFunc}))(props)
  return (
    <div className={styles.table}>
      <div className={styles.tableManage}>
        <button type='button' onClick={addRowFunc}>+</button>
        <button type='button' onClick={deleteRowsFunc} >x</button>
      </div>
      <table>
        <TableHeader headers={headers} tableName={tableName}/>
        <TableBody data={data} {...bodyProps} />
      </table>
    </div>
  )
}

export default Table;
