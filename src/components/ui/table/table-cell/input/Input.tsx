import { ChangeEvent, FC } from 'react'
import styles from './Input.module.css'

interface IInput {
	type: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInput> = ({type, value, onChange}) => {
	return (
		<input
			className={styles.input}
			type={type}
			value={value}
			onChange={onChange}
		/>
	)
}

export default Input;