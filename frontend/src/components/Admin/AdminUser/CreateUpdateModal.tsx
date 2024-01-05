import * as React from "react";
// Rest of your code

import { useEffect, useState } from "react";
import {
  useCreateUserMutation,
  useGetDetailsUserQuery,
  useUpdateUserMutation,
} from "../../../services/user";
import { convertDateToString, getBase64 } from "../../../utils";
import * as message from "../../Message/Message";
import { IParams } from "../types";
import Loading from "../../LoadingComponent";
import ModalComponent from "../../ModalComponent";
import InputComponent from "../../InputComponent";
import { Form, Select, Button } from "antd";
import { WrapperUploadFile } from "./style";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";

const CreateUpdateModal = (props: IParams) => {
  const [form] = Form.useForm();

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  // console.log(props);
  // console.log(!!props.state.rowSelected);
  console.log('form.getFieldValue("avatar")', form.getFieldValue("avatar"));

  const {
    data: userDetails,
    isFetching,
    refetch: refetchGetDetailsUser,
  } = useGetDetailsUserQuery(props.state.rowSelected, {
    skip: !props.state.rowSelected,
  });

  // console.log('userDetails', userDetails);

  const [createUser, createResult] = useCreateUserMutation();
  const [updateUser, updateResult] = useUpdateUserMutation();

  // console.log('createResult', createResult);

  useEffect(() => {
    form.setFieldsValue(userDetails?.data);
  });

  useEffect(() => {
    if (createResult.isSuccess && createResult.data?.status === "OK") {
      message.success();
      props.setState({
        rowSelected: "",
        rowSelectedKeys: [],
        isOpenModalCreateUpdate: false,
        isOpenModalDelete: false,
        isOpenModalDeleteMany: false,
      });
      handleCloseModal();
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
      props.setState({
        rowSelected: "",
        rowSelectedKeys: [],
        isOpenModalCreateUpdate: false,
        isOpenModalDelete: false,
        isOpenModalDeleteMany: false,
      });
      handleCloseModal();
    } else {
      if (updateResult.data?.message) {
        message.error(updateResult.data?.message);
      }
    }
  }, [updateResult]);

  const handleFinish = (values: any) => {
    console.log(values);
    // return
    if (!props.state.rowSelected) {
      createUser(values);
    } else {
      const { email, ...rest } = values;
      updateUser({ id: props.state.rowSelected, data: rest });
    }
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;
    form.setFieldsValue({ [name]: value });
  };

  const handleOnchangeAvatarDetails: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    // console.log('info', info);

    if (info.file.status === "uploading") {
      // setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        // setLoading(false);
        form.setFieldsValue({ avatar: info.file.preview });
      });
    }
    // console.log('form.getFieldValue("avatar")', form.getFieldValue("avatar"));
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleCloseModal = () => {
    // console.log("close modal");

    props.setState({ ...props.state, isOpenModalCreateUpdate: false });
    form.resetFields();
  };

  return (
    <ModalComponent
      title={!props.state.rowSelected ? "Tạo mới người dùng" : "Sửa người dùng"}
      isOpen={props.state.isOpenModalCreateUpdate}
      onCancel={handleCloseModal}
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
          onFinish={handleFinish}
        >
          {!props.state.rowSelected ? (
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Mời nhập email!" }]}
            >
              <InputComponent onChange={(e) => handleValueChange(e, "email")} />
            </Form.Item>
          ) : (
            <Form.Item label="Email">{userDetails?.data?.email}</Form.Item>
          )}

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Mời nhập mật khẩu!" }]}
          >
            <InputComponent
              onChange={(e) => handleValueChange(e, "password")}
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Mời chọn vai trò!" }]}
          >
            <Select
              placeholder="Chọn vai trò"
              onChange={(e) => handleValueChange(e, "role")}
            >
              <Select.Option value="Khách hàng">Khách hàng</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Nhân viên">Nhân viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tên" name="name">
            <InputComponent onChange={(e) => handleValueChange(e, "name")} />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <InputComponent
              onChange={(e) => handleValueChange(e, "dateOfBirth")}
            />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <InputComponent onChange={(e) => handleValueChange(e, "phone")} />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <InputComponent onChange={(e) => handleValueChange(e, "address")} />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar">
            <WrapperUploadFile
              maxCount={1}
              onChange={handleOnchangeAvatarDetails}
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              {form.getFieldValue("avatar") && (
                <img
                  src={form.getFieldValue("avatar")}
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
