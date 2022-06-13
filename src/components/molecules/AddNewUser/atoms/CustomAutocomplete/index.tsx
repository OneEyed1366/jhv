import {
  Autocomplete,
  FilterOptionsState,
  FormControl,
  FormControlTypeMap,
  TextField,
} from "@mui/material";
import { lazy, ReactNode } from "react";

interface IProps<T>
  extends Partial<FormControlTypeMap<Record<string, unknown>, "div">> {
  /**Значение, которое будет в поле ввода*/
  value: T;
  /**Заголовок Autocomplete'а*/
  title: string;
  /**Функция, которая будет вызвана при вводе данных в поле*/
  onChange(event: React.SyntheticEvent<Element, Event>, value: unknown): void;
  /**Функция фильтрации массива элементов*/
  onFilter(options: T[], params: FilterOptionsState<T>): T[];
  /**Функция получения заголовка при отрисовке массива options*/
  onGetLabel(option: T | string): string;
  /**Варианты, которые можно выбрать при вводе данных в CustomAutocomplete*/
  options: T[];
  /**Компонент, который будет отрисован при отсутсвии в поиске необходимого объекта*/
  children: ReactNode;
  /**
   * Необязательный ключ, который будет использован при отрисовке элементов списка
   * ```
   * renderOption={(props, option) => (
   *   <li {...props}>{(option[liKey] as string) || "Undefined"}</li>
   * )}
   * ```
   * @default name
   * */
  liKey?: string;
}
/**
 * Самописный Autocomplete с возможностью добавления нового пользователя при добавлении
 * */
export default function AddNewUserCustomAutocomplete<
  T = Record<string, unknown>
>({
  title,
  onChange,
  onFilter,
  onGetLabel,
  options,
  children,
  value,
  liKey = "name",
  ...etc
}: IProps<T>): JSX.Element {
  return (
    <FormControl fullWidth {...etc}>
      <Autocomplete
        onChange={onChange}
        filterOptions={onFilter}
        value={value}
        id="free-solo-dialog-demo"
        options={options}
        getOptionLabel={onGetLabel}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option: any) => (
          <li {...props}>{option[liKey] || "Undefined"}</li>
        )}
        freeSolo
        renderInput={(params) => <TextField {...params} label={title} />}
      />
      {children}
    </FormControl>
  );
}
/**
 * Асинхронный самописный Autocomplete с возможностью добавления нового пользователя при добавлении
 * */
export const AsyncAddNewUserCustomAutocomplete = lazy(() => import("."));
