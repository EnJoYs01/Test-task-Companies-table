import { FC } from 'react'
import styles from './Checkbox.module.css'

interface ICheckbox {
	onChange: () => void;
	isSelected: boolean
}

const Checkbox: FC<ICheckbox> = ({onChange, isSelected}) => {
	return (
		<input
			className={styles.checkBox}
			type='checkbox'
			onChange={onChange}
			checked={isSelected}
		/>
	)
}

export default Checkbox;