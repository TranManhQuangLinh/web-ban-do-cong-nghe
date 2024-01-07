export interface IState {
  rowSelected: string;
  rowSelectedKeys: Array<string>;
  isOpenModalCreateUpdate: boolean;
  isOpenModalDelete: boolean;
  isOpenModalDeleteMany: boolean;
}

export interface IModalProps {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  useGetDetailsQuery: any;
  useCreateMutation: any;
  useUpdateMutation: any;
}