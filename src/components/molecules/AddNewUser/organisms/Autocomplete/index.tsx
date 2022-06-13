import { gql, useQuery } from "@apollo/client";
import { createFilterOptions, FilterOptionsState } from "@mui/material";
import { ChangeEvent, Fragment, lazy, useEffect, useState } from "react";
import { ICompanyPosition, ICompanyRelation } from "../..";
import AddNewUserCustomAutocomplete from "../../atoms/CustomAutocomplete";
import AddNewUserNoElementDialog from "../../atoms/NoElementDialog";

type IProps = Record<string, any>;

/**Компонент, который отвечает за работа группы самописных AutoComplet'ов*/
export default function AddNewUserAutocompleteFooter({
  ...etc
}: IProps): JSX.Element {
  const [localRelationsData, setLocalRelationsData] = useState<
    ICompanyRelation[]
  >([]);
  const [localPositionsData, setLocalPositionsData] = useState<
    ICompanyPosition[]
  >([]);
  const [companyRelation, setCompanyRelation] =
    useState<ICompanyRelation | null>(null);
  const [companyPosition, setCompanyPosition] =
    useState<ICompanyPosition | null>(null);
  const [isRelationsDialogOpened, setIsRelationsDialogOpened] = useState(false);
  const [isPositionsDialogOpened, setIsPositioinsDialogOpened] =
    useState(false);
  const [innerDialogValue, setInnerDialogValue] = useState<ICompanyRelation>({
    id: Math.floor(Math.random() * 100),
    name: "",
  });

  const companyRelationGql = gql`
    query {
      applicantIndividualCompanyRelations {
        data {
          id
          name
        }
      }
    }
  `;

  const companyPositionGql = gql`
    query {
      applicantIndividualCompanyPositions {
        data {
          id
          name
        }
      }
    }
  `;

  const {
    loading: relationsLoading,
    error: relationsError,
    data: relationsData,
  } = useQuery(companyRelationGql);
  const {
    loading: positionsLoading,
    error: positionsError,
    data: positionsData,
  } = useQuery(companyPositionGql);

  const companyRelationFilter = createFilterOptions<ICompanyRelation>();
  const companyPositionFilter = createFilterOptions<ICompanyPosition>();

  const onUserRelationFilterFunction = (
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

  const onUserPositionFilterFunction = (
    options: ICompanyPosition[],
    params: FilterOptionsState<ICompanyPosition>
  ) => {
    const filtered = companyPositionFilter(options, params);

    if (params.inputValue) {
      filtered.push({
        id: -999999,
        name: `Add "${params.inputValue}"`,
        inputValue: params.inputValue,
      });
    }

    return filtered;
  };

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

  const onUserPositionChange = (event: any, newValue: any) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        setIsPositioinsDialogOpened(true);
        setInnerDialogValue({
          ...innerDialogValue,
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      setIsPositioinsDialogOpened(true);
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
        setIsRelationsDialogOpened(true);
        setInnerDialogValue({
          ...innerDialogValue,
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      setIsRelationsDialogOpened(true);
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
    setLocalRelationsData((previous) => [...previous, innerDialogValue]);
  };

  const onInnerModalPositionSubmit = () => {
    setCompanyPosition(innerDialogValue);
    setLocalPositionsData((previous) => [...previous, innerDialogValue]);
  };

  const onDialogRelationsClose = () => {
    setIsRelationsDialogOpened(false);
  };

  const onDialogPositionsClose = () => {
    setIsPositioinsDialogOpened(false);
  };

  useEffect(() => {
    if (positionsData) {
      setLocalPositionsData(
        positionsData.applicantIndividualCompanyPositions.data
      );
    }

    if (relationsData) {
      setLocalRelationsData(
        relationsData.applicantIndividualCompanyRelations.data
      );
    }
  }, [positionsData, relationsData]);

  if (positionsLoading || relationsLoading) {
    return <h1>Loading...</h1>;
  }

  if (positionsError || relationsError) {
    return <h1>Error! {positionsError?.message || relationsError?.message}</h1>;
  }

  return (
    <Fragment>
      <AddNewUserCustomAutocomplete<ICompanyRelation | null>
        title="Relation to the Company"
        onChange={onUserCompanyChange}
        onFilter={onUserRelationFilterFunction}
        onGetLabel={onGetOptionsLabel}
        options={localRelationsData}
        value={companyRelation}
      >
        <AddNewUserNoElementDialog
          title="Введите название новой компании"
          value={innerDialogValue.name}
          isOpened={isRelationsDialogOpened}
          onClose={onDialogRelationsClose}
          onSubmit={onInnerModalCompanySubmit}
          onChange={onInnerModalChange}
        />
      </AddNewUserCustomAutocomplete>
      <AddNewUserCustomAutocomplete<ICompanyPosition | null>
        title="Position in the Company"
        onChange={onUserPositionChange}
        onFilter={onUserPositionFilterFunction}
        onGetLabel={onGetOptionsLabel}
        options={localPositionsData}
        value={companyPosition}
      >
        <AddNewUserNoElementDialog
          title="Введите название новой позиции внутри компании"
          value={innerDialogValue.name}
          isOpened={isPositionsDialogOpened}
          onClose={onDialogPositionsClose}
          onSubmit={onInnerModalPositionSubmit}
          onChange={onInnerModalChange}
        />
      </AddNewUserCustomAutocomplete>
    </Fragment>
  );
}
/**Компонент, который отвечает за работа группы самописных AutoComplet'ов*/
export const AsyncAddNewUserAutocompleteFooter = lazy(() => import("."));
