import {
  FormControl,
  FormControlTypeMap,
  Input,
  InputLabel,
} from "@mui/material";
import { lazy } from "react";

interface IProps
  extends Partial<FormControlTypeMap<Record<string, any>, "div">> {
  title: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  inputType?: string;
}
/**
 * Элемент для ввода данныз пользователем
 *
 * @param {IProps} props
 * @param {() => void} props.onChange Функция, которая будет вызвана при вводе данных в поле
 * @param {string} props.inputType Необязательный тип input'а
 * */
export default function AddNewUserInput({
  onChange,
  title,
  inputType = "text",
  ...etc
}: IProps): JSX.Element {
  const inputId = "entity-input-label-id";

  return (
    <FormControl fullWidth {...etc}>
      <InputLabel htmlFor={inputId}>{title}</InputLabel>
      <Input id={inputId} onChange={onChange} type={inputType} />
    </FormControl>
  );
}
/**
 * Асинхронный элемент для ввода данныз пользователем
 *
 * @param {IProps} props
 * @param {() => void} props.onChange Функция, которая будет вызвана при вводе данных в поле
 * */
export const AsyncAddNewUserInput = lazy(() => import("."));
