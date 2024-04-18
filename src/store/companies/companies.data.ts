import { ICompany, ICompanyFromServer } from '@/shared/types/company/companies.types'
import { HeaderType } from '@/shared/types/table.types'

export const companiesArray: Array<ICompany> = [
	{
		isSelected: {data: false},
		name: {data: 'Coca-Cola'},
		numberOfEmployees: {data: 200, isEditable: false},
		address: {data: 'USA'}
	},
	{
		isSelected: {data: false},
		name: {data: 'Nike'},
		numberOfEmployees: {data: 300, isEditable: false},
		address: {data: 'England'}
	},
	{	
		isSelected: {data: false},
		name: {data: 'Pepsi'},
		numberOfEmployees: {data: 100, isEditable: false},
		address: {data: 'USA'}
	},
	{	
		isSelected: {data: false},
		name: {data: 'Теремок'},
		numberOfEmployees: {data: 50, isEditable: false},
		address: {data: 'Russia'}
	}
]
export const companiesTableHeaders: Array<HeaderType> = [
	false, 'Company name', 'Number of employees', 'Address'
];

export const companiesArr: Array<ICompanyFromServer> = [
	{
		name: 'Coca-Cola',
		address: 'USA',
		employees: [
			{
				name: 'Robert',
				surname: 'Wright',
				position: 'driver'
			},
			{
				name: 'Larry',
				surname: 'Hoffman',
				position: 'Top manager'
			},
			{
				name: 'Michael',
				surname: 'Hudson',
				position: 'manager'
			}
		]
	},
	{
		name: 'Microsoft',
		address: 'USA',
		employees: [
			{
				name: 'Bill',
				surname: 'Gates',
				position: 'founder'
			},
			{
				name: 'Rafael',
				surname: 'Johnson',
				position: 'Top manager'
			},
			{
				name: 'Bradley',
				surname: 'Price',
				position: 'manager'
			}
		]
	},
	{
		name: 'Adidas',
		address: 'Germany',
		employees: [
			{
				name: 'Ronald',
				surname: 'Ramos',
				position: 'developer of new models'
			},
			{
				name: 'Clyde',
				surname: 'Rogers',
				position: 'Top manager'
			},
			{
				name: 'Justin',
				surname: 'Daniels',
				position: 'manager'
			}
		]
	},
	{
		name: 'Auchan',
		address: 'France',
		employees: [
			{
				name: 'Gerard',
				surname: 'Mulier',
				position: 'founder'
			},
			{
				name: 'Max',
				surname: 'Lopez',
				position: 'Top manager'
			},
			{
				name: 'Steve',
				surname: 'Mason',
				position: 'cashier'
			}
		]
	}
]