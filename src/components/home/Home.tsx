import { FC } from 'react'
import CompaniesTable from '../companies-table/CompaniesTable'
import EmployeesTable from '../employees-table/EmployeesTable'
import styles from './Home.module.css'

const Home: FC = () => {	
	return (
		<div className={styles.home} >
			<CompaniesTable />
			<EmployeesTable />
		</div>
	)
}

export default Home