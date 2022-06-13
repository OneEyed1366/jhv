import { Button, Grid, GridTypeMap } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FC, lazy } from "react";

interface IProps {
  onAddClick: () => void;
  [key: string]: any;
}

const columnsMap = {
  id: "id",
  firstName: "firstName",
  lastName: "lastName",
  companyName: "companyName",
  relationToTheCompany: "relationToTheCompany",
};

const columns: GridColDef[] = [
  { field: columnsMap.id, headerName: "Client ID", width: 90 },
  {
    field: columnsMap.firstName,
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: columnsMap.lastName,
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: columnsMap.companyName,
    headerName: "Company name",
    width: 150,
    editable: true,
  },
  {
    field: columnsMap.relationToTheCompany,
    headerName: "Relation to the company",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows: Record<keyof typeof columnsMap, string | number>[] = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    companyName: "Tesla",
    relationToTheCompany: "smth",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    companyName: 42,
    relationToTheCompany: "smth",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    companyName: 45,
    relationToTheCompany: "smth",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    companyName: 16,
    relationToTheCompany: "smth",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    companyName: 23,
    relationToTheCompany: "smth",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "",
    companyName: 150,
    relationToTheCompany: "smth",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    companyName: 44,
    relationToTheCompany: "smth",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    companyName: 36,
    relationToTheCompany: "smth",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    companyName: 65,
    relationToTheCompany: "smth",
  },
];
/**
 * Кнопка для открытия модального окна (Добавление нового пользователя)
 *
 * @param props
 * @param {() => void} props.onClick Функция, которая будет вызвана при клике на кнопку
 * */
const CustomAddButton: FC<{ onClick(): void }> = ({ onClick }) => {
  return (
    <Grid item xs={12} display={"flex"} justifyContent={"center"} padding={2}>
      <Button variant="contained" onClick={onClick}>
        Add
      </Button>
    </Grid>
  );
};
/**
 * Таблица, отрисовывающая полученные с API данные о пользователях
 * и кнопку, позволяющую вручную добавить нового пользователя (только локально)
 *
 * @param props
 * @param {() => void} props.onAddClick
 * */
export default function UsersTable({ onAddClick, ...etc }: IProps) {
  return (
    <Grid item xs={12} height={400} {...etc}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: () => <CustomAddButton onClick={onAddClick} />,
        }}
      />
    </Grid>
  );
}

/**
 * Асинхронно загружаемая таблица, отрисовывающая полученные с API данные о пользователях
 * и кнопку, позволяющую вручную добавить нового пользователя (только локально)
 *
 * @param props
 * @param {() => void} props.onAddClick
 * */
export const AsyncUsersTable = lazy(() => import("."));
