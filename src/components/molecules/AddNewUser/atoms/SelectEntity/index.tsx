import {
  FormControl,
  FormControlTypeMap,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { lazy, useState } from "react";
import useUpperCase from "../../../../../hooks/useUpperCase";

export type IEntity = "individual" | "company";

interface IProps
  extends Partial<FormControlTypeMap<Record<string, any>, "div">> {
  /**Варианты Entity, которые будут доступны для выбора внутри select'а*/
  variants: IEntity[];
  /**Значение, которое будет установлено внутри select'а*/
  value: IEntity;
  /**Функция, которая будет вызвана при выборе нового select'а*/
  onChange(event: SelectChangeEvent): void;
}
/**
 * Элемент для выбора Entity, который определяет набор полей для добавления/редактирования
 * */
export default function AddNewUserSelectEntity({
  variants,
  value,
  onChange,
  ...etc
}: IProps): JSX.Element {
  const labelId = "select-entity-label";
  const entityVariants = [...new Set<IEntity>(variants).values()];

  return (
    <FormControl fullWidth {...etc}>
      <InputLabel id={labelId}>Entity</InputLabel>
      <Select
        labelId={labelId}
        id="entity-select-id"
        value={value}
        label="Entity"
        onChange={onChange}
      >
        {entityVariants.map((entity, i) => {
          const title = useUpperCase(entity);

          return (
            <MenuItem value={entity} key={`${entity}-${i}`}>
              {title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
/**
 * Асинхронный элемент для выбора Entity, который определяет набор полей для добавления/редактирования
 * */
export const AsyncAddNewUserSelectEntity = lazy(() => import("."));
