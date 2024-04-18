export type inputType = 'text' | 'number' | 'checkbox';

export const useInputType = (data?: string | number | boolean) => {
	let type: inputType = 'text';
	if (typeof data === 'number') {
		type = 'number';
	} 
	else if (typeof data === 'boolean') {
		type = 'checkbox';
	}
	
	return type
}