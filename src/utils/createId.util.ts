import { useTypedSelector } from '@/hooks/useTypedSelector'
import { tableNameType } from '@/shared/types/table.types'
import { RootState } from '@/store/store'

export const generateId: 
(arg: tableNameType | RootState[keyof RootState]) => string 
= (arg) => {
	let ids = [];
	
	if (typeof arg === 'string') {
		ids = useTypedSelector((state) => state[arg].ids)
	} else {
		ids = arg.ids
	}
	
	let isAlreadyExists = true;
	let id = '';
	
	while (isAlreadyExists) {
		id = [...Array(10)]
		.map(() => (Math.random().toString(36)+'00000000000000000')[2])
		.join('');
		
		if (!ids.includes(id)) {
			isAlreadyExists = false;
		}
	}
	
	return id;
}