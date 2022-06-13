import { lazy, useMemo, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, SelectChangeEvent, Stack } from "@mui/material";
import AddNewUserSelectEntity, { IEntity } from "./atoms/SelectEntity";
import { AsyncAddNewUserCompanyEntity } from "./templates/Company";
import { AsyncAddNewUserEntity } from "./templates/User";

interface IProps {
  /**True - модальное окно открыто, false - закрыто*/
  isOpened: boolean;
  /**Функция, которая будет вызвана при закрытии модального окна*/
  onClose(): void;
}
/**Модель, описывающая полученные с API данные (Relation to the company)*/
export interface ICompanyRelation {
  id: number;
  name: string;
  inputValue?: string;
}
/**Модель, описывающая полученные с API данные (Position in the company)*/
export type ICompanyPosition = ICompanyRelation;
/**
 * Элемент для добавления нового пользователя в таблицу
 * */
export default function AddNewUser({ onClose, isOpened }: IProps) {
  const [entity, setEntity] = useState<IEntity>("individual");

  const onSelectEntity = (event: SelectChangeEvent<IEntity>) => {
    setEntity(event.target.value as IEntity);
  };

  const handleClose = () => {
    onClose();
  };

  const onExit = () => {
    onClose();
  };

  const onSave = () => {
    onClose();
  };

  const computedTemplate = useMemo(() => {
    if (entity === "individual") {
      return <AsyncAddNewUserEntity />;
    }

    return <AsyncAddNewUserCompanyEntity />;
  }, [entity]);

  return (
    <Dialog onClose={handleClose} open={isOpened} fullWidth>
      <DialogTitle>Add new user</DialogTitle>
      <Stack padding={2} gap={2}>
        <AddNewUserSelectEntity
          variants={["individual", "company"]}
          value={entity}
          onChange={onSelectEntity}
        />
        {computedTemplate}
      </Stack>
      <DialogActions>
        <Button onClick={onExit}>Cancel</Button>
        <Button onClick={onSave}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
/**Асинхронный элемент для добавления нового пользователя в таблицу*/
export const AsyncAddNewUser = lazy(() => import("."));
