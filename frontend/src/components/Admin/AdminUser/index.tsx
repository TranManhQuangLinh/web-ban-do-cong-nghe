import React, { useMemo} from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../../TableComponent";
import ButtonComponent from "../../ButtonComponent";
import { useState } from "react";
import {
  useGetAllUsersQuery,
} from "../../../services/user";
import CreateUpdateModal from "./Modals/CreateUpdateModal";
import { IGetAllUsersResult } from "../../../services/user/types";
import { IState } from "../types";
import { ColumnsType } from "antd/es/table/interface";
import DeleteModal from "./Modals/DeleteModal";
import DeleteManyModal from "./Modals/DeleteManyModal";

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
    let result: IGetAllUsersResult["data"] = [];
    if (users && users?.data?.length > 0) {
      result = users.data.map((user) => ({ ...user, key: user._id }));
    }
    return result;
  }, [users]);

  const columns: ColumnsType = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.length - b.email.length,
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.length - b.address.length,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      sorter: (a: any, b: any) => a.role.length - b.role.length,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone - b.phone,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: any, record: any) => {
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

        {!!state.rowSelectedKeys.length && (
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
            onChange: (record: any) => {
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
