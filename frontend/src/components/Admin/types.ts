export interface IState {
  rowSelected: string;
  rowSelectedKeys: Array<string>;
  isOpenModalCreateUpdate: boolean;
  isOpenModalDelete: boolean;
  isOpenModalDeleteMany: boolean;
}

export interface IParams {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
}