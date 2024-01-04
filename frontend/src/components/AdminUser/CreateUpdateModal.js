import { useEffect, useState } from "react";
import {
  useCreateUserMutation,
  useGetDetailsUserQuery,
  useUpdateUserMutation,
} from "../../services/userApi";
import { getBase64 } from "../../utils";
import * as message from "../../components/Message/Message";

const { Form, Select, Button } = require("antd");
const { default: Loading } = require("../LoadingComponent/Loading");
const { default: ModalComponent } = require("../ModalComponent/ModalComponent");
const { default: InputComponent } = require("../InputComponent/InputComponent");
const { WrapperUploadFile } = require("./style");

const CreateUpdateModal = ({
  rowSelected,
  isOpenModalCreate,
  setIsOpenModalCreate,
  isOpenModalUpdate,
  setIsOpenModalUpdate,
}) => {
  const [form] = Form.useForm();
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
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const {
    data: userDetails,
    isFetching,
    refetch: refetchGetDetailsUser,
  } = useGetDetailsUserQuery(rowSelected, { skip: !rowSelected });

  const [createUser, createResult] = useCreateUserMutation();
  const [updateUser, updateResult] = useUpdateUserMutation();

  // console.log('createResult', createResult);

  useEffect(() => {
    if (rowSelected && isOpenModalUpdate) {
      setIsLoadingDetails(true);
      refetchGetDetailsUser();

      setIsLoadingDetails(false);
    }
  }, [rowSelected, isOpenModalUpdate]);

  useEffect(() => {
    form.setFieldsValue(stateUser);
  }, [form, stateUser]);

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

  useEffect(() => {
    if (createResult.isSuccess && createResult.data?.status === "OK") {
      message.success();
      handleCloseModalCreate();
    } else {
      if (createResult.data?.message) {
        message.error(createResult.data?.message);
      }
    }
  }, [createResult]);

  useEffect(() => {
    // console.log('updateResult', updateResult);
    if (updateResult.isSuccess && updateResult.data?.status === "OK") {
      message.success();
      handleCloseModalUpdate();
    } else {
      if (updateResult.data?.message) {
        message.error(updateResult.data?.message);
      }
    }
  }, [updateResult]);

  const handleOnchangeDetails = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };

  const handleCreateUser = () => {
    // console.log("create");
    createUser(stateUser);
  };

  const handleUpdateUser = () => {
    // console.log('stateUser', stateUser);
    const {email, ...rest} = stateUser
    updateUser({id: rowSelected, data: rest});
  };

  const handleCloseModalCreate = () => {
    setIsOpenModalCreate(false);
    form.resetFields();
  };

  const handleCloseModalUpdate = () => {
    setIsOpenModalUpdate(false);
    form.resetFields();
  };

  return (
    <ModalComponent
      title={isOpenModalCreate ? "Tạo mới người dùng" : "Sửa người dùng"}
      isOpen={isOpenModalCreate || isOpenModalUpdate}
      onCancel={() => {
        setIsOpenModalUpdate(false);
        setIsOpenModalCreate(false);
      }}
      onOk={() => form.submit()}
    >
      <Loading
        isPending={
          isLoadingDetails ||
          isFetching ||
          createResult?.isLoading ||
          updateResult?.isLoading
        }
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="on"
          form={form}
          onFinish={isOpenModalCreate ? handleCreateUser : handleUpdateUser}
        >
          {isOpenModalCreate ? (
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Mời nhập email!" }]}
            >
              <InputComponent
                value={stateUser.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>
          ) : (
            <Form.Item label="Email">{stateUser.email}</Form.Item>
          )}

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Mời nhập mật khẩu!" }]}
          >
            <InputComponent
              value={stateUser.password}
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
              value={stateUser.role}
              onChange={(value) =>
                handleOnchangeDetails({ target: { name: "role", value } })
              }
              placeholder="Chọn vai trò"
            >
              <Select.Option value="Khách hàng">Khách hàng</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Nhân viên">Nhân viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tên" name="name">
            <InputComponent
              value={stateUser.name}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <InputComponent
              value={stateUser.dateOfBirth}
              onChange={handleOnchangeDetails}
              name="dateOfBirth"
            />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <InputComponent
              value={stateUser.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <InputComponent
              value={stateUser.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar">
            <WrapperUploadFile
              onChange={handleOnchangeAvatarDetails}
              maxCount={1}
            >
              {stateUser?.avatar && (
                <img
                  src={stateUser?.avatar}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 10px",
                  }}
                  alt="avatar"
                />
              )}
              <Button>Chọn ảnh</Button>
            </WrapperUploadFile>
          </Form.Item>
        </Form>
      </Loading>
    </ModalComponent>
  );
};

export default CreateUpdateModal;
