import { Button, Form, Space } from "antd";
import React, { useRef } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import {
  useGetAllUsersQuery,
  useGetDetailsUserQuery,
} from "../../services/userApi";
import CreateUpdateModal from "./CreateUpdateModal";
import DeleteModal from "./DeleteModal";
import DeleteManyModal from "./DeleteManyModal";

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalDeleteMany, setIsOpenModalDeleteMany] = useState(false);
  const searchInput = useRef();

  const [stateUser, setStateUser] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const { data: userDetails } = useGetDetailsUserQuery(rowSelected, {
    skip: !rowSelected,
  });

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

  // reset state khi bấm nút tạo
  useEffect(() => {
    if (isOpenModalCreate) {
      setStateUser({
        email: "",
        password: "",
        role: "",
        name: "",
        dateOfBirth: "",
        phone: "",
        address: "",
        avatar: "",
      });
    }
  }, [isOpenModalCreate]);

  useEffect(() => {
    if (userDetails?.data) {
      setStateUser({
        email: userDetails?.data?.email,
        password: userDetails?.data?.password,
        role: userDetails?.data?.role,
        name: userDetails?.data?.name,
        dateOfBirth: userDetails?.data?.dateOfBirth,
        phone: userDetails?.data?.phone,
        address: userDetails?.data?.address,
        avatar: userDetails.data?.avatar,
      });
    }
  }, [userDetails]);

  // table
  const dataTable =
    users?.data?.length > 0 &&
    users?.data?.map((user) => {
      return { ...user, key: user._id };
    });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  // search dropdown
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const renderAction = () => {
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
            setIsOpenModalUpdate(true);
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
          onClick={() => setIsOpenModalDelete(true)}
          buttonText="Xóa"
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
      ...getColumnSearchProps("role"),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  // form chi tiết người dùng
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUser);
  }, [form, stateUser]);

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
            setIsOpenModalCreate(true);
          }}
          buttonText="Tạo"
        />

        {!!rowSelectedKeys.length && (
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
              setIsOpenModalDeleteMany(true);
            }}
            buttonText="Xóa tất cả"
          />
        )}
        <TableComponent
          columns={columns}
          isPending={isPendingUsers || isFetching}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                // console.log("Clicked row ID:", record._id);
                setRowSelected(record._id);
              },
            };
          }}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              setRowSelectedKeys(selectedRowKeys);
            },
          }}
        />
      </div>

      <CreateUpdateModal
        rowSelected={rowSelected}
        isOpenModalCreate={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        isOpenModalUpdate={isOpenModalUpdate}
        setIsOpenModalUpdate={setIsOpenModalUpdate}
      />

      <DeleteModal
        rowSelected={rowSelected}
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
      />

      <DeleteManyModal
        rowSelectedKeys={rowSelectedKeys}
        isOpenModalDeleteMany={isOpenModalDeleteMany}
        setIsOpenModalDeleteMany={setIsOpenModalDeleteMany}
      />
    </div>
  );
};

export default AdminUser;
