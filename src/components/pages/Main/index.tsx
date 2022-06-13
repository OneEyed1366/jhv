import { Grid, GridTypeMap } from "@mui/material";
import { lazy, useState } from "react";
import UsersTable from "../../atoms/UsersTable";
import { AsyncAddNewUser } from "../../molecules/AddNewUser";

interface IProps extends Partial<GridTypeMap<Record<string, any>, "div">> {
  [key: string]: any;
}
/**
 * Главная страница приложения
 * */
export default function MainPage({ ...etc }: IProps): JSX.Element {
  const [isAddNewUserOpened, setIsAddNewUserOpened] = useState(false);

  const onUsersTableClick = () => {
    setIsAddNewUserOpened(true);
  };

  const onAddNewUserClose = () => {
    setIsAddNewUserOpened(false);
  };

  return (
    <Grid container spacing={2} {...etc}>
      <UsersTable onAddClick={onUsersTableClick} />
      <AsyncAddNewUser
        isOpened={isAddNewUserOpened}
        onClose={onAddNewUserClose}
      />
    </Grid>
  );
}
/**
 * Асинхронная главная страница приложения
 * */
export const AsyncMainPage = lazy(() => import("."));
