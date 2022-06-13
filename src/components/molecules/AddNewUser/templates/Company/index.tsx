import { Fragment, lazy, useState } from "react";
import AddNewUserInput from "../../atoms/Input";

type IProps = Record<string, unknown>;
/**
 * Шаблон модального окна добавления нового пользователя (Company entity)
 * */
export default function AddNewUserCompanyEntity({
  ...etc
}: IProps): JSX.Element {
  const [clientId, setClientId] = useState<string>("");
  const [companyName, setCompanyName] = useState("");

  return (
    <Fragment>
      <AddNewUserInput
        title="Client ID"
        onChange={(event) => setClientId(event.target.value)}
        inputType="number"
      />
      <AddNewUserInput
        title="Company name"
        onChange={(event) => setCompanyName(event.target.value)}
      />
    </Fragment>
  );
}
/**Асинхронный щаблон модального окна добавления нового пользователя (Company entity)*/
export const AsyncAddNewUserCompanyEntity = lazy(() => import("."));
