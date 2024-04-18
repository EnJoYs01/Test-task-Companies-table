import { RootState } from '@/store/store'
import { ChangeEvent } from 'react'

export type RowType = {
	id: string;
} & Record<string, ICell | string>

export interface ICell {
	data: string | number | boolean;
	isEditable?: boolean;
	isBold?: boolean;
}

export interface IBooleanCell extends ICell {
	data: boolean;
}
export interface IStringCell extends ICell {
	data: string;
}
export interface INumberCell extends ICell {
	data: number;
}

export type InputValueType = string | number

export type HeaderType = string | boolean

export type tableNameType = keyof RootState

export interface ITable {
  headers: Array<HeaderType>;
  data: Array<RowType>;
  tableName: tableNameType;
  addRowFunc: () => void;
  deleteRowsFunc: () => void;
  updateFieldFunc: (e: ChangeEvent<HTMLInputElement>, name: string, id: string) => void;
  updateCheckBoxFunc: (isSelected: boolean, id: string) => void;
}

export type ITableManage = Omit<ITable, 'headers' | 'data'>
export type ICellManage = Omit<ITableManage, 'addRowFunc' | 'deleteRowsFunc'>
