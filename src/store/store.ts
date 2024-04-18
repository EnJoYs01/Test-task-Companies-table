import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as companiesReducer } from './companies/companies.slice'
import { reducer as employeesReducer } from './employees/employees.slice'

const reducers = combineReducers({
	companies: companiesReducer,
	employees: employeesReducer
})

export const store = configureStore({
	reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>;