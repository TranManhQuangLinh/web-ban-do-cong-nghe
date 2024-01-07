import { Button, Space } from "antd";
import React, { useMemo, useRef } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../../TableComponent";
import InputComponent from "../../InputComponent";
import ButtonComponent from "../../ButtonComponent";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useCreateUserMutation, useGetAllUsersQuery, useGetDetailsUserQuery, useUpdateUserMutation } from "../../../services/user";
import CreateUpdateModal from "../Modals/CreateUpdateModal";
import DeleteModal from "../Modals/DeleteModal";
import DeleteManyModal from "../Modals/DeleteManyModal";
import { GetAllUsersResult } from "../../../services/user/types";
import { IState } from "../types";

const AdminUser = () => {
  const [state, setState] = useState<IState>({
    rowSelected: "",
    rowSelectedKeys: [],
    isOpenModalCreateUpdate: false,
    isOpenModalDelete: false,
    isOpenModalDeleteMany: false,
  });

  const searchInput = useRef(null);

  // console.log("rowSelected:", rowSelected);
  // console.log("userDetails:", userDetails);
  // console.log("stateUser:", stateUser);

  // lấy tất cả user từ db
  const {
    data: users,
    isLoading: isPendingUsers,
    isFetching,
  } = useGetAllUsersQuery();
  // console.log('users', users);

  // table
  const dataTable = useMemo(() => {
    let result: GetAllUsersResult["data"] = [];
    if (users && users?.data?.length > 0) {
      result = users.data.map((user) => ({ ...user, key: user._id }));
    }
    return result;
  }, [users]);

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  // search dropdown
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    // onFilterDropdownOpenChange: (visible: any) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      sorter: (a: any, b: any) => a.role.length - b.role.length,
      ...getColumnSearchProps("role"),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
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
          isPending={isPendingUsers || isFetching}
          data={dataTable}
          rowSelection={{
            type: "checkbox",
            onChange: (record: any) => {
              setState({ ...state, rowSelectedKeys: record });
            },
          }}
        />
      </div>

      <CreateUpdateModal state={state} setState={setState} useGetDetailsQuery={useGetDetailsUserQuery} useCreateMutation={useCreateUserMutation} useUpdateMutation={useUpdateUserMutation} />

      {/* <DeleteModal state={state} setState={setState} />

      <DeleteManyModal state={state} setState={setState} /> */}
    </div>
  );
};

export default AdminUser;
