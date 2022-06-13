import { Fragment, lazy, useState } from "react";
import AddNewUserInput from "../../atoms/Input";

type IProps = Record<string, unknown>;
/**
 * Шаблон модального окна добавления нового пользователя (User with company entity)
 * */
export default function AddNewUserEntity({ ...etc }: IProps): JSX.Element {
  const [clientId, setClientId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  return (
    <Fragment>
      <AddNewUserInput
        title="Client ID"
        onChange={(event) => setClientId(event.target.value)}
        inputType="number"
      />
      <AddNewUserInput
        title="First name"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <AddNewUserInput
        title="Last name"
        onChange={(event) => setLastName(event.target.value)}
      />
    </Fragment>
  );
}
/**Асинхронный щаблон модального окна добавления нового пользователя (User with Company entity)*/
export const AsyncAddNewUserEntity = lazy(() => import("."));
