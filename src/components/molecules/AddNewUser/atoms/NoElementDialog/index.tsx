import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, ChangeEventHandler, FormEventHandler, lazy } from "react";

interface IProps extends Partial<Omit<DialogProps, "onChange">> {
  /**Значение, которое будет отрисовано внутри textarea*/
  value: string;
  /**Заголовок, который будет отрисован у модального окна*/
  title: string;
  /**Определяет, будет ли отрисован компонент*/
  isOpened: boolean;
  /**Функция, которая будет вызвана при закрытии*/
  onClose(): void;
  /**Функция, которая будет вызвана при вводе в textarea*/
  onChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  /**Функция, которая будет вызвана при клике на Submit*/
  onSubmit(): void;
}
/**
 * Компонент, который будет отрисован при отсутсвии элемента в поиске (CustomAutocomplete)
 * */
export default function AddNewUserNoElementDialog({
  value,
  isOpened,
  onClose,
  onChange,
  onSubmit,
  title,
  ...etc
}: IProps): JSX.Element {
  const onClickSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit();
    onClose();
  };
  /**@todo Добавить логику выхода из модального окна БЕЗ СОХРАНЕНИЯ*/
  const onCancelClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={isOpened} onClose={onClose} {...etc}>
      <form onSubmit={onClickSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            // autoFocus
            margin="dense"
            id="name"
            onChange={onChange}
            label="title"
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelClick}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
/**Асинхронный компонент, который будет отрисован при отсутсвии элемента в поиске (CustomAutocomplete)*/
export const AsyncAddNewUserNoElementDialog = lazy(() => import("."));
