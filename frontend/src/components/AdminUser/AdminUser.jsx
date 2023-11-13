import { Button, Form, Select, Space } from "antd";
import React from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getBase64 } from "../../utils";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const AdminUser = () => {
  const queryClient = useQueryClient();
  const [rowSelected, setRowSelected] = useState("");
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalDeleteMany, setIsOpenModalDeleteMany] = useState(false);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    avatar: "",
  });

  // lấy tất cả user từ db
  const getAllUsers = async () => {
    const res = await UserService.getAllUsers(user?.access_token);
    return { data: res?.data, key: "users" };
  };

  const { data: users, isPending: isPendingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  // table
  const dataTable =
    users?.data?.length > 0 &&
    users?.data?.map((user) => {
      return { ...user, key: user._id };
    });

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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const renderAction = () => {
    return (
      <div>
        <ButtonComponent
          buttonStyle={{
            background: "red",
            cursor: "pointer",
            width: "fit-content",
            border: "none",
            marginRight: "10px",
          }}
          buttonTextStyle={{
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={() => setIsOpenModalDelete(true)}
          buttonText="Xóa"
        />
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
          onClick={handleDetailsProduct}
          buttonText="Sửa"
        />
      </div>
    );
  };

  const handleDetailsProduct = () => {
    setIsOpenModalUpdate(true);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
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

  // lấy details user khi bấm nút sửa
  useEffect(() => {
    if (rowSelected && isOpenModalUpdate) {
      setIsPendingUpdate(true);
      fetchGetDetailsUser(rowSelected, user?.access_token);
    }
  }, [rowSelected, isOpenModalUpdate]);

  const fetchGetDetailsUser = async (rowSelected, access_token) => {
    const res = await UserService.getDetailsUser(rowSelected, access_token);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        role: res?.data?.role,
        address: res?.data?.address,
        avatar: res.data?.avatar,
      });
    }
    setIsPendingUpdate(false);
  };

  // form chi tiết người dùng
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  // call api thêm sửa, xóa
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    // console.log(data);
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserService.deleteManyUser(ids, token);
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isPending: isPendingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseModalUpdate();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCloseModalDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success();
      handleCloseModalDeleteMany();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDeletedMany]);

  const handleCreateUser = () => {};

  const handleUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetails },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["users"]);
        },
      }
    );
  };

  const handleCloseModalUpdate = () => {
    isOpenModalUpdate(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      role: "",
    });
    form.resetFields();
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["users"]);
        },
      }
    );
  };

  const handleCloseModalDeleteMany = () => {
    setIsOpenModalDeleteMany(false);
  };

  const handleDeleteManyUsers = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["users"]);
        },
      }
    );
  };

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
          isPending={isPendingUsers}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
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

      <ModalComponent
        title="Chi tiết người dùng"
        isOpen={isOpenModalCreate || isOpenModalUpdate}
        onCancel={() => {
          setIsOpenModalUpdate(false);
          setIsOpenModalCreate(false);
        }}
        onOk={isOpenModalCreate ? handleCreateUser : handleUpdateUser}
      >
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="on"
            form={form}
          >
            {isOpenModalCreate ? (
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Mời nhập email!" }]}
              >
                <InputComponent
                  value={stateUserDetails.email}
                  onChange={handleOnchangeDetails}
                  name="email"
                />
              </Form.Item>
            ) : (
              <Form.Item label="Email">{stateUserDetails.email}</Form.Item>
            )}

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Mời nhập mật khẩu!" }]}
            >
              <InputComponent
                value={stateUserDetails.password}
                onChange={handleOnchangeDetails}
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Vai trò"
              name="role"
              rules={[{ required: true, message: "Mời chọn vai trò!" }]}
            >
              <Select
                value={stateUserDetails.role}
                onChange={(value) =>
                  handleOnchangeDetails({ target: { name: "role", value } })
                }
                placeholder="Chọn vai trò"
              >
                <Option value="Khách hàng">Khách hàng</Option>
                <Option value="Admin">Admin</Option>
                <Option value="Nhân viên">Nhân viên</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Mời nhập tên!" }]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Mời nhập số điện thoại!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Mời nhập địa chỉ!" }]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[{ required: true, message: "Mời chọn avatar!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails?.avatar}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>

      <ModalComponent
        title="Xóa người dùng"
        open={isOpenModalDelete}
        onCancel={handleCloseModalDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có chắc muốn xóa tài khoản này không?</div>
        </Loading>
      </ModalComponent>

      <ModalComponent
        title="Xóa tất cả người dùng đã chọn"
        open={isOpenModalDeleteMany}
        onCancel={handleCloseModalDeleteMany}
        onOk={handleDeleteManyUsers}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có chắc muốn xóa tất cả tài khoản đã chọn không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
