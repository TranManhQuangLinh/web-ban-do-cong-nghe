import React, { useMemo} from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../../TableComponent";
import ButtonComponent from "../../ButtonComponent";
import { useState } from "react";
import {
  useGetAllUsersQuery,
} from "../../../services/user";
import CreateUpdateModal from "./Modals/CreateUpdateModal";
import { IUserDataListResult } from "../../../services/user/types";
import { IState } from "../types";
import { ColumnsType } from "antd/es/table/interface";
import DeleteModal from "./Modals/DeleteModal";
import DeleteManyModal from "./Modals/DeleteManyModal";
import { IUser } from "../../../types";

const AdminUser = () => {
  const [state, setState] = useState<IState>({
    rowSelected: "",
    rowSelectedKeys: [],
    isOpenModalCreateUpdate: false,
    isOpenModalDelete: false,
    isOpenModalDeleteMany: false,
  });

  // console.log("rowSelected:", rowSelected);
  // console.log("userDetails:", userDetails);
  // console.log("stateUser:", stateUser);

  // lấy tất cả user từ db
  const {
    data: users,
    isLoading: isPending,
    isFetching,
  } = useGetAllUsersQuery();
  // console.log('users', users);

  // table
  const dataTable = useMemo(() => {
    let result: IUserDataListResult["data"] = [];
    if (users?.data && users?.data?.length > 0) {
      result = users?.data.map((user) => ({ ...user, key: user._id }));
    }
    return result;
  }, [users]);

  const columns: ColumnsType = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: (a: IUser, b: IUser) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: string, record: IUser) => {
        // console.log('record', record);
        
        return (
          <div>
            <ButtonComponent
              buttonStyle={{
                background: "orange",
                cursor: "pointer",
                width: "fit-content",
                border: "none",
              }}
              buttonTextStyle={{
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() => {
                setState({
                  ...state,
                  rowSelected: record._id,
                  isOpenModalCreateUpdate: true,
                });
              }}
              buttonText="Sửa"
            />
            <ButtonComponent
              buttonStyle={{
                background: "red",
                cursor: "pointer",
                width: "fit-content",
                border: "none",
                marginLeft: "10px",
              }}
              buttonTextStyle={{
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() =>
                setState({
                  ...state,
                  rowSelected: record._id,
                  isOpenModalDelete: true,
                })
              }
              buttonText="Xóa"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>

      <div style={{ marginTop: "20px" }}>
        <ButtonComponent
          type="primary"
          buttonStyle={{
            marginBottom: "10px",
            cursor: "pointer",
            width: "fit-content",
            border: "none",
          }}
          buttonTextStyle={{
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={() => {
            setState({ ...state, isOpenModalCreateUpdate: true });
          }}
          buttonText="Tạo"
        />

        {state.rowSelectedKeys && !!state.rowSelectedKeys.length && (
          <ButtonComponent
            type="primary"
            buttonStyle={{
              background: "red",
              marginLeft: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              width: "fit-content",
              border: "none",
            }}
            buttonTextStyle={{
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              setState({ ...state, isOpenModalDeleteMany: true });
            }}
            buttonText="Xóa tất cả"
          />
        )}
        <TableComponent
          columns={columns}
          isPending={isPending || isFetching}
          dataSource={dataTable}
          rowSelection={{
            type: "checkbox",
            onChange: (record: Array<string>) => {
              setState({ ...state, rowSelectedKeys: record });
            },
          }}
        />
      </div>

      <CreateUpdateModal
        state={state}
        setState={setState}
      />

      <DeleteModal state={state} setState={setState} />

      <DeleteManyModal state={state} setState={setState} />
    </div>
  );
};

export default AdminUser;
