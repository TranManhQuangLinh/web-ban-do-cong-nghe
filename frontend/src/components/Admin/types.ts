import { ICategoryDataListResult} from "../../services/category/types";

export interface IState {
  rowSelected: string;
  rowSelectedKeys?: Array<string>;
  isOpenModalCreateUpdate?: boolean;
  isOpenModalDelete?: boolean;
  isOpenModalDeleteMany?: boolean;
}

export interface IModalProps {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  categories?: ICategoryDataListResult,
}