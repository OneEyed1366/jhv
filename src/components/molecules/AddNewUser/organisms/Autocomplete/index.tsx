import { createFilterOptions, FilterOptionsState } from "@mui/material";
import { ChangeEvent, Fragment, lazy, useState } from "react";
import { ICompanyPosition, ICompanyRelation } from "../..";
import AddNewUserCustomAutocomplete from "../../atoms/CustomAutocomplete";
import AddNewUserNoElementDialog from "../../atoms/NoElementDialog";

type IProps = Record<string, any>;

/**Компонент, который отвечает за работа группы самописных AutoComplet'ов*/
export default function AddNewUserAutocompleteFooter({
  ...etc
}: IProps): JSX.Element {
  const [companyRelation, setCompanyRelation] =
    useState<ICompanyRelation | null>(null);
  const [companyPosition, setCompanyPosition] =
    useState<ICompanyPosition | null>(null);
  const [isInnerDialogOpened, setIsInnerDialogOpened] = useState(false);
  const [innerDialogValue, setInnerDialogValue] = useState<ICompanyRelation>({
    id: Math.floor(Math.random() * 100),
    name: "",
  });
  const [mockICompanyRelationOptions, setMockICompanyRelationOptions] =
    useState<ICompanyRelation[]>([
      { id: 1, name: "Apple" },
      { id: 2, name: "Microsoft" },
      { id: 3, name: "Google" },
    ]);
  const [mockICompanyPositionOptions, setMockICompanyPositionOptions] =
    useState<ICompanyRelation[]>([
      { id: 0, name: "Trainee" },
      { id: 1, name: "Junior" },
      { id: 2, name: "Middle" },
      { id: 3, name: "Middle+" },
      { id: 4, name: "Senior" },
    ]);

  const companyRelationFilter = createFilterOptions<ICompanyRelation>();

  const onGetOptionsLabel = (option: ICompanyRelation | string): string => {
    // e.g value selected with enter, right from the input
    if (typeof option === "string") {
      return option;
    }

    if (option.inputValue) {
      return option.inputValue;
    }

    return option.name;
  };

  const onUserPositionFilterFunction = (
    options: ICompanyPosition[],
    params: FilterOptionsState<ICompanyPosition>
  ) => {
    const filtered = companyRelationFilter(options, params);

    if (params.inputValue) {
      filtered.push({
        id: -999999,
        name: `Add "${params.inputValue}"`,
        inputValue: params.inputValue,
      });
    }

    return filtered;
  };

  const onUserCompanyFilterFunction = (
    options: ICompanyRelation[],
    params: FilterOptionsState<ICompanyRelation>
  ) => {
    const filtered = companyRelationFilter(options, params);

    if (params.inputValue) {
      filtered.push({
        id: -999999,
        name: `Add "${params.inputValue}"`,
        inputValue: params.inputValue,
      });
    }

    return filtered;
  };

  const onUserPositionChange = (event: any, newValue: any) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        setIsInnerDialogOpened(true);
        setInnerDialogValue({
          ...innerDialogValue,
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      setIsInnerDialogOpened(true);
      setInnerDialogValue({
        ...innerDialogValue,
        name: newValue.inputValue,
      });
    } else {
      setCompanyPosition(newValue);
    }
  };

  const onUserCompanyChange = (event: any, newValue: any) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        setIsInnerDialogOpened(true);
        setInnerDialogValue({
          ...innerDialogValue,
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      setIsInnerDialogOpened(true);
      setInnerDialogValue({
        ...innerDialogValue,
        name: newValue.inputValue,
      });
    } else {
      setCompanyRelation(newValue);
    }
  };

  const onInnerModalChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInnerDialogValue({
      ...innerDialogValue,
      name: event.target.value,
    });
  };

  const onInnerModalCompanySubmit = () => {
    setCompanyRelation(innerDialogValue);
    setMockICompanyRelationOptions((previous) => [
      ...previous,
      innerDialogValue,
    ]);
  };

  const onInnerModalPositionSubmit = () => {
    setCompanyPosition(innerDialogValue);
    setMockICompanyPositionOptions((previous) => [
      ...previous,
      innerDialogValue,
    ]);
  };

  const onInnerModalClose = () => {
    setIsInnerDialogOpened(false);
  };
  return (
    <Fragment>
      <AddNewUserCustomAutocomplete<ICompanyRelation | null>
        title="Relation to the Company"
        onChange={onUserCompanyChange}
        onFilter={onUserCompanyFilterFunction}
        onGetLabel={onGetOptionsLabel}
        options={mockICompanyRelationOptions}
        value={companyRelation}
      >
        <AddNewUserNoElementDialog
          title="Введите название новой компании"
          value={innerDialogValue.name}
          isOpened={isInnerDialogOpened}
          onClose={onInnerModalClose}
          onSubmit={onInnerModalCompanySubmit}
          onChange={onInnerModalChange}
        />
      </AddNewUserCustomAutocomplete>
      <AddNewUserCustomAutocomplete<ICompanyPosition | null>
        title="Position in the Company"
        onChange={onUserPositionChange}
        onFilter={onUserPositionFilterFunction}
        onGetLabel={onGetOptionsLabel}
        options={mockICompanyPositionOptions}
        value={companyPosition}
      >
        <AddNewUserNoElementDialog
          title="Введите название новой позиции внутри компании"
          value={innerDialogValue.name}
          isOpened={isInnerDialogOpened}
          onClose={onInnerModalClose}
          onSubmit={onInnerModalPositionSubmit}
          onChange={onInnerModalChange}
        />
      </AddNewUserCustomAutocomplete>
    </Fragment>
  );
}
/**Компонент, который отвечает за работа группы самописных AutoComplet'ов*/
export const AsyncAddNewUserAutocompleteFooter = lazy(() => import("."));
