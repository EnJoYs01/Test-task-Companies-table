import { actions as companiesActions } from '@/store/companies/companies.slice'
import { actions as employeesActions } from '@/store/employees/employees.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

const rootActions = {
	...companiesActions,
	...employeesActions
}

export const useActions = () => {
	const dispatch = useDispatch();
	
	return useMemo(() => 
		bindActionCreators(rootActions, dispatch),[dispatch]
	);
}